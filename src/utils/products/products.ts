import { SortByEnum } from "../../@Config/Array";
import { Product } from "../../types/Product";
import { compareFn } from "../Array";
import { uuid } from "../Uuid";

export const compareProductsByDefaultColumnIdxFn =
  (sortBy = SortByEnum.ASC) =>
  (a: Product, b: Product): number =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByRankFn =
  (sortBy = SortByEnum.ASC) =>
  (a: Product, b: Product): number =>
    compareFn(sortBy)(a.rank, b.rank);

export function createEmptyProduct(defaultColumnIdx: number): Product {
  return {
    id: uuid(),
    name: null,
    reference: null,
    rank: null,
    rankPts: null,
    defaultColumnIdx,
  };
}

export function updateProductsDefaultColumnIdx(products: Product[]) {
  return products.map((p, idx) => ({ ...p, defaultColumnIdx: idx }));
}
