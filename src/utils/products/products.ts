import { TProduct } from "../../types/products";
import { TSortBy } from "../../types/arrays";
import { compareFn } from "../arrays";
import { nanoid } from "nanoid";

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
    id: nanoid(),
    name: undefined,
    reference: undefined,
    rank: undefined,
    defaultColumnIdx,
  };
}
