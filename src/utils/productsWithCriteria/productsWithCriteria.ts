import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export function findProductWithCriterion(
  product: ProductDto,
  criterion: CriterionDto,
  productCriterionValueList: ProductCriterionValueDto[]
): ProductCriterionValueDto | null {
  return (
    productCriterionValueList.find(v => product.uuid === v.productUuid && criterion.uuid === v.criterionUuid) ?? null
  );
}
