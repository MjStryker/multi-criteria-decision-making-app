import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { nanoid } from "nanoid";

export const createEmptyProductCriteriaValue = (
  { id: productId }: TProduct,
  { id: criteriaId }: TCriteria
): TProductWithCriteria => ({
  id: nanoid(),
  productId,
  criteriaId,
  value: undefined,
  normalizedValue: undefined,
  weightedValue: undefined,
});
