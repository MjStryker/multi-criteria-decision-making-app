import { Uuid } from "@/@Shared/@Utils/Uuid";

export type ProductCriterionValueDto = {
  uuid: string;
  productUuid: string;
  criterionUuid: string;
  value: number | null;
  criterionRankPts: number | null;
};

export const ProductCriterionValueDto = {
  newEmpty(
    productUuid: string,
    criterionUuid: string
  ): ProductCriterionValueDto {
    return {
      uuid: Uuid.newRandom(),
      productUuid,
      criterionUuid,
      value: null,
      criterionRankPts: 0
    };
  }
};
