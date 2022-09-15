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
  beneficial: undefined,
  defaultRowIdx,
});

export const clampCriteriaWeightValue = (value: number) =>
  clamp(value, CRITERIA.WEIGHT.MIN, CRITERIA.WEIGHT.MAX);

export const compareCriteriaByDefaultRowIdxFn =
  (sortBy: TSortBy) => (a: TCriteria, b: TCriteria) =>
    compareFn(sortBy)(a.defaultRowIdx, b.defaultRowIdx);
