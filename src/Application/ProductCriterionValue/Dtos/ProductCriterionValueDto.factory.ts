import { Uuid } from '@/@Shared/@Utils/Uuid';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export class ProductCriterionValueDtoFactory {
  public static newEmpty(productUuid: string, criterionUuid: string): ProductCriterionValueDto {
    return {
      uuid: Uuid.newRandom(),
      productUuid,
      criterionUuid,
      value: null,
      criterionRankPts: null
    };
  }
}
