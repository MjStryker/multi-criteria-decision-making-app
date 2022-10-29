import { SORT_BY } from "../../constants/arrays";
import { TCriterion } from "../../types/criteria";
import { compareCriterionByDefaultRowIdxFn } from "./criteria";

const c1: TCriterion = {
  id: "id-c1",
  name: "c1",
  unit: undefined,
  weight: 2,
  normalizedWeight: 0.5,
  beneficial: false,
  defaultRowIdx: 2,
};

const c2: TCriterion = {
  id: "id-c2",
  name: "c2",
  unit: undefined,
  weight: 1,
  normalizedWeight: 1,
  beneficial: true,
  defaultRowIdx: 1,
};

const c3: TCriterion = {
  id: "id-c3",
  name: "c3",
  unit: undefined,
  weight: 1,
  normalizedWeight: 1,
  beneficial: true,
  defaultRowIdx: 3,
};

const criteria: TCriterion[] = [c1, c2, c3];

describe("sortCriteriaByDefaultRowIdx(...)", () => {
  it("Verify sort result", () => {
    expect(criteria.sort(compareCriterionByDefaultRowIdxFn(SORT_BY.ASC))).toBe([
      c2,
      c1,
      c3,
    ]);
  });
});
