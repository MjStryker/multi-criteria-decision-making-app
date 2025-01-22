import { SORT_BY } from "../../@Config/Constants/Array";
import { Product } from "../../types/Product";
import { compareFn } from "../Array";
import { uuid } from "../Uuid";

export const compareProductsByDefaultColumnIdxFn =
  (sortBy = SORT_BY.ASC) =>
  (a: Product, b: Product): number =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByRankFn =
  (sortBy = SORT_BY.ASC) =>
  (a: Product, b: Product): number =>
    compareFn(sortBy)(a.rank, b.rank);

export function createEmptyProduct(defaultColumnIdx: number): Product {
  return {
    id: uuid(),
    name: undefined,
    reference: undefined,
    rank: undefined,
    rankPts: undefined,
    defaultColumnIdx,
  };
}

export function updateProductsDefaultColumnIdx(products: Product[]) {
  return products.map((p, idx) => ({ ...p, defaultColumnIdx: idx }));
}
