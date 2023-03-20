import { SORT_BY } from "../../constants/arrays";
import { TProduct } from "../../types/products";
import { compareFn } from "../arrays";
import { uuid } from "../uuid";

export const compareProductsByDefaultColumnIdxFn =
  (sortBy = SORT_BY.ASC) =>
  (a: TProduct, b: TProduct): number =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByRankFn =
  (sortBy = SORT_BY.ASC) =>
  (a: TProduct, b: TProduct): number =>
    compareFn(sortBy)(a.rank, b.rank);

export function createEmptyProduct(defaultColumnIdx: number): TProduct {
  return {
    id: uuid(),
    name: undefined,
    reference: undefined,
    rank: undefined,
    rankPts: undefined,
    defaultColumnIdx,
  };
}

export function updateProductsDefaultColumnIdx(products: TProduct[]) {
  return products.map((p, idx) => ({ ...p, defaultColumnIdx: idx }));
}
