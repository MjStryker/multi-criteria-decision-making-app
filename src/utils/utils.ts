import { TCriteria } from "../types/criteria";
import { TProduct } from "../types/product";
import { TProductWithCriteria } from "../types/productWithCriteria";
import { nanoid } from "nanoid";

export const createEmptyCriteria = (): TCriteria => ({
  id: nanoid(),
  name: undefined,
  weight: 1,
  unit: undefined,
  higherTheBetter: undefined,
});

export const createEmptyProduct = (): TProduct => ({
  id: nanoid(),
  name: undefined,
  reference: undefined,
});

export const createEmptyProductCriteriaValue = (
  { id: productId }: TProduct,
  { id: criteriaId }: TCriteria
): TProductWithCriteria => ({
  id: nanoid(),
  productId,
  criteriaId,
  value: undefined,
});
