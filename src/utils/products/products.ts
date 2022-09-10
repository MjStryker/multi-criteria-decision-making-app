import { TProduct } from "../../types/products";
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
