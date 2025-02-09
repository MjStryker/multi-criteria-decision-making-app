export type ProductCriterionValueDto = {
  uuid: string;
  productUuid: string;
  criterionUuid: string;
  value: number | null;
  criterionRankPts: number;
};
