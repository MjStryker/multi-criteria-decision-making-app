import { TProduct } from "../../types/products";
import { TSortBy } from "../../types/arrays";
import { compareFn } from "../arrays";
import { uuid } from "../uuid";

export const compareProductsByDefaultColumnIdxFn =
  (sortBy: TSortBy) =>
  (a: TProduct, b: TProduct): number =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByRankFn =
  (sortBy: TSortBy) =>
  (a: TProduct, b: TProduct): number =>
    compareFn(sortBy)(a.rank, b.rank);

export function createEmptyProduct(defaultColumnIdx: number): TProduct {
  return {
    id: uuid(),
    name: undefined,
    reference: undefined,
    rank: undefined,
    defaultColumnIdx,
  };
}

export function updateProductsDefaultColumnIdx(products: TProduct[]) {
  return products.map((p, idx) => ({ ...p, defaultColumnIdx: idx }));
}
