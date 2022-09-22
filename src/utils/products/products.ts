import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { TSortBy } from "../../types/arrays";
import { compareFn } from "../arrays";
import { findProductWithCriteria } from "../productsWithCriterias/productsWithCriterias";
import { isDefined } from "../objects";
import { nanoid } from "nanoid";
import { sumCriteriasWeight } from "../criterias/criterias";

export const createEmptyProduct = (defaultColumnIdx: number): TProduct => ({
  id: nanoid(),
  name: undefined,
  reference: undefined,
  rank: undefined,
  defaultColumnIdx,
});

export const compareProductsByDefaultColumnIdxFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByRankFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.rank, b.rank);

export const getProductsWithCriteriasNormalizedWeightedValues = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) => {
  const productsWithCriteriasNormalizedWeightedValues = productsWithCriterias;

  const weightTotal = sumCriteriasWeight(criterias);

  products.forEach((product) => {
    let criteriasValuesTotal = 0;

    const criteriasWithValues = criterias.map((criteria) => {
      const value =
        findProductWithCriteria(product, criteria, productsWithCriterias)
          ?.value ?? undefined;

      criteriasValuesTotal += value ?? 0;

      return { criteria, value };
    });

    criteriasWithValues.forEach(({ criteria, value }) => {
      const criteriaWeightNormalized = criteria.weight
        ? criteria.weight / weightTotal
        : undefined;

      const normalizedValue = value ? value / criteriasValuesTotal : undefined;
      const weightedValue =
        normalizedValue && criteriaWeightNormalized
          ? normalizedValue * criteriaWeightNormalized
          : undefined;

      const e = findProductWithCriteria(
        product,
        criteria,
        productsWithCriteriasNormalizedWeightedValues
      );

      if (isDefined(e)) {
        e.normalizedValue = normalizedValue;
        e.weightedValue = weightedValue;
      }
    });
  });

  return { productsWithCriteriasNormalizedWeightedValues };
};
