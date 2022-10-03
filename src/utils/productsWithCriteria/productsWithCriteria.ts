import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { isDefined } from "../objects";
import { nanoid } from "nanoid";
import { sumCriteriaWeight } from "../criteria/criteria";

export const createEmptyProductCriterionValue = (
  { id: productId }: TProduct,
  { id: criterionId }: TCriterion
): TProductWithCriterion => ({
  id: nanoid(),
  productId,
  criterionId,
  value: undefined,
  normalizedValue: undefined,
  weightedValue: undefined,
});

export const findProductCriterionValue = (
  product: TProduct,
  criterion: TCriterion,
  productsWithCriterias: TProductWithCriterion[]
) =>
  productsWithCriterias.find(
    ({ productId, criterionId }) =>
      product.id === productId && criterion.id === criterionId
  );

export const getProductsCriteriaNormalizedWeightedValues = (
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
) => {
  const productsWithCriteriaNormalizedWeightedValues = productsWithCriteria;

  const weightTotal = sumCriteriaWeight(criteria);

  products.forEach((product) => {
    let criteriaValuesTotal = 0;

    const criteriaWithValues = criteria.map((criterion) => {
      const value =
        findProductCriterionValue(product, criterion, productsWithCriteria)
          ?.value ?? undefined;

      criteriaValuesTotal += value ?? 0;

      return { criterion, value };
    });

    criteriaWithValues.forEach(({ criterion, value }) => {
      const criterionWeightNormalized = criterion.weight
        ? criterion.weight / weightTotal
        : undefined;

      const normalizedValue = value ? value / criteriaValuesTotal : undefined;
      const weightedValue =
        normalizedValue && criterionWeightNormalized
          ? normalizedValue * criterionWeightNormalized
          : undefined;

      const e = findProductCriterionValue(
        product,
        criterion,
        productsWithCriteriaNormalizedWeightedValues
      );

      if (isDefined(e)) {
        e.normalizedValue = normalizedValue;
        e.weightedValue = weightedValue;
      }
    });
  });

  return {
    productsWithCriteriaNormalizedWeightedValues,
  };
};
