import { Uuid } from "@/@Shared/@Utils/Uuid";
import { ProductCriterionValueDto } from "../Dtos/ProductCriteriaValue.dto";

export class ProductCriterionValueFactory {
  public static newEmpty(
    productUuid: string,
    criterionUuid: string
  ): ProductCriterionValueDto {
    return {
      uuid: Uuid.newRandom(),
      productUuid,
      criterionUuid,
      value: null,
      criterionRankPts: null,
    };
  }
}
