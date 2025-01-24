import { uuid } from "@/@Shared/@Utils/Uuid";
import { Criterion } from "../../types/Criterion";
import { Product } from "../../types/Product";
import { ProductCriterionValue } from "../../types/ProductCriterionValue";

export function createEmptyProductCriterionValue(
  { id: productId }: Product,
  { id: criterionId }: Criterion
): ProductCriterionValue {
  return {
    id: uuid(),
    productId,
    criterionId,
    value: null,
    criterionRankPts: null,
  };
}

export function findProductWithCriterion(
  product: Product,
  criterion: Criterion,
  productsWithCriteria: ProductCriterionValue[]
): ProductCriterionValue | null {
  return (
    productsWithCriteria.find(
      ({ productId, criterionId }) =>
        product.id === productId && criterion.id === criterionId
    ) ?? null
  );
}
