import { CRITERION } from "../../constants/criteria";
import { TCriterion } from "../../types/criteria";
import { TSortBy } from "../../types/arrays";
import { clamp } from "../numbers";
import { compareFn } from "../arrays";
import { nanoid } from "nanoid";

export const createEmptyCriterion = (defaultRowIdx: number): TCriterion => ({
  id: nanoid(),
  name: undefined,
  weight: 1,
  unit: undefined,
  beneficial: true,
  defaultRowIdx,
});

export const clampCriterionWeightValue = (value: number) =>
  clamp(value, CRITERION.WEIGHT.MIN, CRITERION.WEIGHT.MAX);

export const compareCriterionByDefaultRowIdxFn =
  (sortBy: TSortBy) => (a: TCriterion, b: TCriterion) =>
    compareFn(sortBy)(a.defaultRowIdx, b.defaultRowIdx);

export const sumCriteriaWeight = (criteria: TCriterion[]) =>
  criteria.reduce((total, criterion) => total + (criterion.weight ?? 0), 0);

export const getCriteriaNormalizedMaxWeight = (
  criteria: TCriterion[],
  weightTotal: number
) => {
  let max: number | null = null;

  criteria.forEach((criterion) => {
    const part = criterion.weight ? criterion.weight / weightTotal : null;
    if (!max || (max && part && part > max)) {
      max = part;
    }
  });

  return max;
};