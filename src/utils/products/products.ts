import { TProduct } from "../../types/products";
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

export const compareProductsByRankFn =
  (sortBy: TSortBy) => (a: TProduct, b: TProduct) =>
    compareFn(sortBy)(a.rank, b.rank);
