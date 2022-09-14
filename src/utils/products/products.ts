import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { TSortBy } from "../../types/arrays";
import { compareFn } from "../arrays";
import { nanoid } from "nanoid";

export const createEmptyProduct = (defaultCellIdx: number): TProduct => ({
  id: nanoid(),
  name: undefined,
  reference: undefined,
  resArrayIdx: undefined,
  defaultColumnIdx: defaultCellIdx,
});

export const compareProductsByDefaultIdxFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByResArrayIdxFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.resArrayIdx, b.resArrayIdx);

export const getProductValuesForEachCriteria = (
  product: TProduct,
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) =>
  criterias.map((c) => ({
    criteria: c,
    value:
      productsWithCriterias.find(
        ({ productId, criteriaId }) =>
          product.id === productId && c.id === criteriaId
      )?.value ?? 0,
  }));

export const sumProductValues = (
  product: TProduct,
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) =>
  getProductValuesForEachCriteria(
    product,
    criterias,
    productsWithCriterias
  ).reduce((total, current) => total + current.value, 0);

export const sumAllProductsCriteriasValues = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) =>
  products.map((product) => ({
    product,
    total: sumProductValues(product, criterias, productsWithCriterias),
  }));
