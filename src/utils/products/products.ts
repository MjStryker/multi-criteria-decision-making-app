import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { TSortBy } from "../../types/arrays";
import { compareFn } from "../arrays";
import { nanoid } from "nanoid";

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

export const compareProductsByrankFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.rank, b.rank);

export const sumCriteriaProductsValues = (
  products: TProduct[],
  criteria: TCriteria,
  productsWithCriterias: TProductWithCriteria[]
) =>
  products.reduce((total, product) => {
    const value =
      productsWithCriterias.find(
        ({ productId, criteriaId }) =>
          product.id === productId && criteria.id === criteriaId
      )?.value ?? 0;

    return total + value;
  }, 0);

export const sumAllProductsWithCriteriasValues = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) =>
  criterias.map((criteria) => ({
    criteria,
    total: sumCriteriaProductsValues(products, criteria, productsWithCriterias),
  }));

export const sumAllProductsBeneficialAndCostWeightedValues = () => 0;

export const calculateProductsData = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) => {
  criterias.map((criteria) => {
    let productsValuesTotal = 0;

    const productsWithValue = products.map((product) => {
      const value =
        productsWithCriterias.find(
          ({ productId, criteriaId }) =>
            product.id === productId && criteria.id === criteriaId
        )?.value ?? 0;

      productsValuesTotal += value;

      return { product, value };
    });

    const productsWithNormalizedAndWeightedValues = productsWithValue.map(
      ({ product, value }) => {
        const normalizedValue = value / productsValuesTotal;
        const weightedValue = normalizedValue * (criteria.weight ?? 1);

        return { product, value, normalizedValue, weightedValue };
      }
    );

    return { criteria, productsWithNormalizedAndWeightedValues };
  });
};

const defaultProductsWithNormalizedAndWeightedValues = (product: TProduct) => ({
  product,
  value: undefined,
  normalizedValue: undefined,
  weightedValue: undefined,
});

export const getProductsWeightedNormalizedValues = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
): {
  productsWithNormalizedAndWeightedValues: ReturnType<
    typeof defaultProductsWithNormalizedAndWeightedValues
  >[];
  productsWithCriteriasInfo: TProductWithCriteria[];
} => {
  const productsWithNormalizedAndWeightedValues = products.map(
    defaultProductsWithNormalizedAndWeightedValues
  );
  const productsWithCriteriasInfo = productsWithCriterias;

  criterias.forEach((criteria) => {
    let productsValuesTotal = 0;

    productsWithNormalizedAndWeightedValues.map(({ product }) => {
      const productWithCriteriaInfo = productsWithCriteriasInfo.find(
        ({ productId, criteriaId }) =>
          product.id === productId && criteria.id === criteriaId
      );

      const value = productWithCriteriaInfo?.value ?? 0;

      productsValuesTotal += value;

      return { product, value };
    });

    productsWithNormalizedAndWeightedValues.map(({ product, value }) => {
      const productWithCriteriaInfo = productsWithCriteriasInfo.find(
        ({ productId, criteriaId }) =>
          product.id === productId && criteria.id === criteriaId
      );

      const normalizedValue = value ? value / productsValuesTotal : undefined;
      const weightedValue = normalizedValue
        ? normalizedValue * (criteria.weight ?? 1)
        : undefined;

      if (productWithCriteriaInfo) {
        productWithCriteriaInfo.normalizedValue = normalizedValue;
        productWithCriteriaInfo.weightedValue = weightedValue;
      }

      return {
        product,
        value,
        normalizedValue,
        weightedValue,
      };
    });

    return productsWithNormalizedAndWeightedValues;
  });

  return { productsWithNormalizedAndWeightedValues, productsWithCriteriasInfo };
};
