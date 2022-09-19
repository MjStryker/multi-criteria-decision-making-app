import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { TSortBy } from "../../types/arrays";
import { compareFn } from "../arrays";
import { isDefined } from "../objects";
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

export const compareProductsByRankFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.rank, b.rank);

const findProductWithCriteria = (
  product: TProduct,
  criteria: TCriteria,
  productsWithCriterias: TProductWithCriteria[]
) =>
  productsWithCriterias.find(
    ({ productId, criteriaId }) =>
      product.id === productId && criteria.id === criteriaId
  );

const getCriteriaWithProductsValues = (
  criteria: TCriteria,
  products: TProduct[],
  productsWithCriterias: TProductWithCriteria[]
) => ({
  criteria,
  products: products.map((product) => ({
    product,
    value: findProductWithCriteria(product, criteria, productsWithCriterias)
      ?.value,
  })),
});

const getAllCriteriasWithProductsValues = (
  criterias: TCriteria[],
  products: TProduct[],
  productsWithCriterias: TProductWithCriteria[]
) =>
  criterias.map((criteria) =>
    getCriteriaWithProductsValues(criteria, products, productsWithCriterias)
  );

// export const getProductsWithCriteriasNormalizedWeightedValues = (
//   products: TProduct[],
//   criterias: TCriteria[],
//   productsWithCriterias: TProductWithCriteria[]
// ) => {
//   const criteriasWithValues = getAllCriteriasWithProductsValues(
//     criterias,
//     products,
//     productsWithCriterias
//   );

//   return criteriasWithValues.map(({ criteria, products }) => {
//     const productsValuesTotal = products.reduce(
//       (total, product) => total + (product?.value ?? 0),
//       0
//     );

//     const productsWithNormalizedWeightedValues = products.map(
//       ({ product, value }) => {
//         const normalizedValue = value ? value / productsValuesTotal : undefined;
//         const weightedValue = normalizedValue
//           ? normalizedValue * (criteria.weight ?? 1)
//           : undefined;

//         return {
//           product,
//           value,
//           normalizedValue,
//           weightedValue,
//         };
//       }
//     );

//     return { criteria, products: productsWithNormalizedWeightedValues };
//   });
// };

export const getProductsWithCriteriasNormalizedWeightedValues = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) => {
  const criteriasWithValues = getAllCriteriasWithProductsValues(
    criterias,
    products,
    productsWithCriterias
  );

  const productsWithCriteriasNormalizedWeightedValues = productsWithCriterias;

  criteriasWithValues.forEach(({ criteria, products }) => {
    const productsValuesTotal = products.reduce(
      (total, product) => total + (product?.value ?? 0),
      0
    );

    products.forEach(({ product, value }) => {
      const normalizedValue = value ? value / productsValuesTotal : undefined;
      const weightedValue = normalizedValue
        ? normalizedValue * (criteria.weight ?? 1)
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
