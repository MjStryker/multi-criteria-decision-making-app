import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { isDefined } from "../objects";
import { uuid } from "../uuid";

export function createEmptyProductCriterionValue(
  { id: productId }: TProduct,
  { id: criterionId }: TCriterion
): TProductWithCriterion {
  return {
    id: uuid(),
    productId,
    criterionId,
    value: undefined,
    normalizedValue: undefined,
    weightedValue: undefined,
  };
}

export function findProductCriterionValue(
  product: TProduct,
  criterion: TCriterion,
  productsWithCriterias: TProductWithCriterion[]
): TProductWithCriterion | undefined {
  return productsWithCriterias.find(
    ({ productId, criterionId }) =>
      product.id === productId && criterion.id === criterionId
  );
}

// TODO: Tests missing for this function
export function calculateProductsCriteriaNormalizedWeightedValues(
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
): TProductWithCriterion[] {
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
      const normalizedValue =
        isDefined(value) && criteriaValuesTotal > 0
          ? value / criteriaValuesTotal
          : undefined;

      const weightedValue =
        isDefined(normalizedValue) && isDefined(criterion.normalizedWeight)
          ? normalizedValue * criterion.normalizedWeight
          : undefined;

      const e = findProductCriterionValue(
        product,
        criterion,
        productsWithCriteria
      );

      if (isDefined(e)) {
        e.normalizedValue = normalizedValue;
        e.weightedValue = weightedValue;
      }
    });
  });

  return productsWithCriteria;
}
