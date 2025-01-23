import { CRITERION } from "@/@Config/Criteria";
import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";
import { compareFn } from "@/@Shared/@Utils/Array";
import { clamp, isValidNumber } from "@/@Shared/@Utils/Number";
import { areDefined } from "@/@Shared/@Utils/Object";
import { uuid } from "@/@Shared/@Utils/Uuid";
import { Criterion } from "@/types/Criterion";

export const compareCriteriaByDefaultRowIdxFn =
  (sortBy = SortByEnum.ASC) =>
  (a: Criterion, b: Criterion) =>
    compareFn(sortBy)(a.defaultRowIdx, b.defaultRowIdx);

export const compareCriteriaByWeightFn =
  (sortBy = SortByEnum.DESC) =>
  (a: Criterion, b: Criterion) =>
    compareFn(sortBy)(a.weight, b.weight);

export function createEmptyCriterion(defaultRowIdx: number): Criterion {
  return {
    id: uuid(),
    name: null,
    weight: 1,
    normalizedWeight: null,
    unit: null,
    beneficial: true,
    defaultRowIdx,
  };
}

export function clampCriterionWeightValue(value: number): number {
  return clamp(value, CRITERION.WEIGHT.MIN, CRITERION.WEIGHT.MAX);
}

export function sumCriteriaWeight(criteria: Criterion[]): number {
  return criteria.reduce(
    (total, criterion) => total + (criterion.weight ?? 0),
    0
  );
}

export function sumCriteriaNormalizedWeight(criteria: Criterion[]): number {
  return criteria.reduce(
    (total, criterion) => total + (criterion.normalizedWeight ?? 0),
    0
  );
}

export function calculateCriteriaNormalizedWeights(
  criteria: Criterion[]
): Criterion[] {
  const weightTotal = sumCriteriaWeight(criteria);

  return criteria.map((criterion) => ({
    ...criterion,
    normalizedWeight: isValidNumber(criterion.weight)
      ? criterion.weight / weightTotal
      : null,
  }));
}

export function getCriteriaMaxWeight(criteria: Criterion[]) {
  return Math.max(...criteria.map(({ weight }) => weight || 0));
}

export function getCriterionWeightRelativeToMax(
  criterionWeight: number | null,
  maxWeight: number
): number {
  return areDefined([criterionWeight, maxWeight])
    ? (criterionWeight! / maxWeight!) * 100
    : 0;
}

export function updateCriteriaDefaultRowIdx(criteria: Criterion[]) {
  return criteria.map((c, idx) => ({ ...c, defaultRowIdx: idx }));
}
