import { CRITERIA } from "../../constants/criterias";
import { TCriteria } from "../../types/criterias";
import { TSortBy } from "../../types/arrays";
import { clamp } from "../numbers";
import { compareFn } from "../arrays";
import { nanoid } from "nanoid";

export const createEmptyCriteria = (defaultRowIdx: number): TCriteria => ({
  id: nanoid(),
  name: undefined,
  weight: 1,
  unit: undefined,
  beneficial: true,
  defaultRowIdx,
});

export const clampCriteriaWeightValue = (value: number) =>
  clamp(value, CRITERIA.WEIGHT.MIN, CRITERIA.WEIGHT.MAX);

export const compareCriteriaByDefaultRowIdxFn =
  (sortBy: TSortBy) => (a: TCriteria, b: TCriteria) =>
    compareFn(sortBy)(a.defaultRowIdx, b.defaultRowIdx);

export const sumCriteriasWeight = (criterias: TCriteria[]) =>
  criterias.reduce((total, criteria) => total + (criteria.weight ?? 0), 0);

export const getCriteriasNormalizedMaxWeight = (
  criterias: TCriteria[],
  weightTotal: number
) => {
  let max: number | null = null;

  criterias.forEach((c) => {
    const part = c.weight ? c.weight / weightTotal : null;
    if (!max || (max && part && part > max)) {
      max = part;
    }
  });

  return max;
};
