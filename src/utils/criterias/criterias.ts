import { CRITERIA } from "../../constants/criterias";
import { TCriteria } from "../../types/criterias";
import { clamp } from "../numbers";
import { nanoid } from "nanoid";

export const createEmptyCriteria = (): TCriteria => ({
  id: nanoid(),
  name: undefined,
  weight: 1,
  unit: undefined,
  higherTheBetter: undefined,
});

export const clampCriteriaWeightValue = (value: number) =>
  clamp(value, CRITERIA.WEIGHT.MIN, CRITERIA.WEIGHT.MAX);
