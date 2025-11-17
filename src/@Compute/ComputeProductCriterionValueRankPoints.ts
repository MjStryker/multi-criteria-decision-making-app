import { SortByEnum } from '@/@Shared/@Enums/SortBy.enum';
import { compareFn } from '@/@Shared/@Utils/Array';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export function computeProductCriterionValueRankPts(
  criterionList: CriterionDto[],
  productCriterionValueList: ProductCriterionValueDto[]
): ProductCriterionValueDto[] {
  // Create a map to store computed rank points
  const rankPtsMap = new Map<string, number>();

  criterionList.forEach(criterion => {
    let lastValue: number | null = null;
    let lastPos = 0;

    const values = productCriterionValueList.filter(v => v.criterionUuid === criterion.uuid);

    values
      .sort((v1, v2) => compareFn(criterion.beneficial ? SortByEnum.ASC : SortByEnum.DESC)(v1.value, v2.value))
      .forEach(value => {
        if (value.value === null) {
          rankPtsMap.set(value.uuid, 0);
        } else {
          if (lastValue === null || lastValue !== value.value) {
            lastValue = value.value;
            lastPos = lastPos + 1;
          }
          rankPtsMap.set(value.uuid, lastPos * criterion.weight);
        }
      });
  });

  // Return new array with updated objects
  return productCriterionValueList.map(value => ({
    ...value,
    criterionRankPts: rankPtsMap.get(value.uuid) ?? value.criterionRankPts
  }));
}
