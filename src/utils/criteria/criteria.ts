import { clamp, isValidNumber } from "../numbers";

import { CRITERION } from "../../constants/criteria";
import { TCriterion } from "../../types/criteria";
import { TSortBy } from "../../types/arrays";
import { areDefined } from "../objects";
import { compareFn } from "../arrays";
import { nanoid } from "nanoid";

export const compareCriterionByDefaultRowIdxFn =
  (sortBy: TSortBy) => (a: TCriterion, b: TCriterion) =>
    compareFn(sortBy)(a.defaultRowIdx, b.defaultRowIdx);

export function createEmptyCriterion(defaultRowIdx: number): TCriterion {
  return {
    id: nanoid(),
    name: undefined,
    weight: 1,
    normalizedWeight: undefined,
    unit: undefined,
    beneficial: true,
    defaultRowIdx,
  };
}

export function clampCriterionWeightValue(value: number): number {
  return clamp(value, CRITERION.WEIGHT.MIN, CRITERION.WEIGHT.MAX);
}

export function sumCriteriaWeight(criteria: TCriterion[]): number {
  return criteria.reduce(
    (total, criterion) => total + (criterion.weight ?? 0),
    0
  );
}

export function calculateCriteriaNormalizedWeight(
  criteria: TCriterion[],
  weightTotal: number
): TCriterion[] {
  return criteria.map((criterion) => ({
    ...criterion,
    normalizedWeight: isValidNumber(criterion.weight)
      ? criterion.weight / weightTotal
      : undefined,
  }));
}

export function getCriteriaMaxWeight(criteria: TCriterion[]) {
  return Math.max(...criteria.map(({ weight }) => weight || 0));
}

export function getCriterionWeightRelativeToMax(
  criterionWeight: number | undefined,
  maxWeight: number
): number {
  return areDefined([criterionWeight, maxWeight])
    ? (criterionWeight! / maxWeight!) * 100
    : 0;
}
