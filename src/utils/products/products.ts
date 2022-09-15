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
  resArrayIdx: undefined,
  defaultColumnIdx,
});

export const compareProductsByDefaultColumnIdxFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByResArrayIdxFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.resArrayIdx, b.resArrayIdx);

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
