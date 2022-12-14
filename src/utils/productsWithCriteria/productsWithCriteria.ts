import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { uuid } from "../uuid";

export function createEmptyProductCriterionValue(
  { id: productId }: TProduct,
  { id: criterionId }: TCriterion
): TProductWithCriterion {
  return {
    id: uuid(),
    productId,
    criterionId,
    value: undefined,
    criterionRankPts: undefined,
  };
}

export function findProductWithCriterion(
  product: TProduct,
  criterion: TCriterion,
  productsWithCriteria: TProductWithCriterion[]
): TProductWithCriterion | undefined {
  return productsWithCriteria.find(
    ({ productId, criterionId }) =>
      product.id === productId && criterion.id === criterionId
  );
}
