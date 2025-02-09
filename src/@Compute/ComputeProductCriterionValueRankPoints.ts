import { SortByEnum } from '@/@Shared/@Enums/SortBy.enum';
import { compareFn } from '@/@Shared/@Utils/Array';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export function computeProductCriterionValueRankPts(
  criterionList: CriterionDto[],
  productList: ProductDto[],
  productCriterionValueList: ProductCriterionValueDto[]
): ProductCriterionValueDto[] {
  criterionList.forEach(criterion => {
    let lastValue: number | null = null;
    let lastPos = 0;

    const values = productCriterionValueList.filter(v => v.criterionUuid === criterion.uuid);

    values
      .sort((v1, v2) => compareFn(criterion.beneficial ? SortByEnum.ASC : SortByEnum.DESC)(v1.value, v2.value))
      .forEach((value, idx) => {
        //
      });
  });

  return productCriterionValueList;
}
