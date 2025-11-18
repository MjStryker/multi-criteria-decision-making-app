import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

export function findProductWithCriterion(
  product: ProductDto,
  criterion: CriterionDto,
  productCriterionValueList: ProductCriterionValueDto[]
): ProductCriterionValueDto | null {
  return (
    productCriterionValueList.find(
      v => product.uuid === v.productUuid && criterion.uuid === v.criterionUuid
    ) ?? null
  );
}
