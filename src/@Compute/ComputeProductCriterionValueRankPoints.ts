import { SortByEnum } from '@/@Shared/@Enums/SortBy.enum';
import { compareFn } from '@/@Shared/@Utils/Array';
import { isDefined } from '@/@Shared/@Utils/Object';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export function computeProductCriterionValueRankPts(
  criterionList: CriterionDto[],
  productCriterionValueList: ProductCriterionValueDto[]
): ProductCriterionValueDto[] {
  const productMap = new Map<string, ProductCriterionValueDto[]>();
  productCriterionValueList.forEach(product => {
    if (!productMap.has(product.criterionUuid)) {
      productMap.set(product.criterionUuid, []);
    }
    productMap.get(product.criterionUuid)!.push(product);
  });

  criterionList.forEach(criterion => {
    const products = productMap.get(criterion.uuid) || [];
    let lastValue: number | null = null;
    let lastPos = 0;

    products
      .sort((p1, p2) => compareFn(SortByEnum[criterion.beneficial ? 'ASC' : 'DESC'])(p1.value, p2.value))
      .forEach((product, i) => {
        const isSameValueAsLast = lastValue === product.value;
        const pos = isSameValueAsLast ? lastPos : i + 1;
        const criterionRankPts = isDefined(criterion.weight) ? criterion.weight * pos : 0;

        lastValue = product.value;
        lastPos = pos;
        product.criterionRankPts = criterionRankPts;
      });
  });

  return productCriterionValueList;
}
