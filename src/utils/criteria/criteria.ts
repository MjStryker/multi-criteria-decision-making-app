import { CRITERION } from "@/@Config/Criteria";
import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";
import { compareFn } from "@/@Shared/@Utils/Array";
import { clamp, isValidNumber } from "@/@Shared/@Utils/Number";
import { areDefined } from "@/@Shared/@Utils/Object";
import { CriterionDto } from "@/Application/Dtos/Criterion.dto";

export const compareCriteriaByDefaultRowIdxFn =
  (sortBy = SortByEnum.ASC) =>
  (a: CriterionDto, b: CriterionDto) =>
    compareFn(sortBy)(a.defaultRowIdx, b.defaultRowIdx);

export const compareCriteriaByWeightFn =
  (sortBy = SortByEnum.DESC) =>
  (a: CriterionDto, b: CriterionDto) =>
    compareFn(sortBy)(a.weight, b.weight);

export function clampCriterionWeightValue(value: number): number {
  return clamp(value, CRITERION.WEIGHT.MIN, CRITERION.WEIGHT.MAX);
}

export function sumCriteriaWeight(criteria: CriterionDto[]): number {
  return criteria.reduce(
    (total, criterion) => total + (criterion.weight ?? 0),
    0
  );
}

export function sumCriteriaNormalizedWeight(criteria: CriterionDto[]): number {
  return criteria.reduce(
    (total, criterion) => total + (criterion.normalizedWeight ?? 0),
    0
  );
}

export function calculateCriteriaNormalizedWeights(
  criteria: CriterionDto[]
): CriterionDto[] {
  const weightTotal = sumCriteriaWeight(criteria);

  return criteria.map((c) => ({
    ...c,
    normalizedWeight: isValidNumber(weightTotal)
      ? (c.weight! / weightTotal) * 100
      : null,
  }));
}

export function getCriteriaMaxWeight(criteria: CriterionDto[]) {
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

export function updateCriteriaDefaultRowIdx(criteria: CriterionDto[]) {
  return criteria.map((c, idx) => ({
    ...c,
    defaultRowIdx: idx,
  }));
}
