export type TProductWithCriterion = {
  id: string;
  criterionId: string;
  productId: string;
  value: number | undefined;
  normalizedValue: number | undefined;
  weightedValue: number | undefined;
  criterionRankPts: number | undefined;
};
