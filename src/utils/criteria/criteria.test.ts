import {
  calculateCriteriaNormalizedWeight,
  compareCriteriaByDefaultRowIdxFn,
  getCriteriaMaxWeight,
  getCriterionWeightRelativeToMax,
  sumCriteriaWeight,
} from "./criteria";

import { SORT_BY } from "../../constants/arrays";
import { TCriterion } from "../../types/criteria";

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

const ASC = SORT_BY.ASC;
const DESC = SORT_BY.DESC;

const criteriaSortedByDefaultRowIdx = {
  ASC: [c2, c1, c3] as TCriterion[],
  DESC: [c3, c1, c2] as TCriterion[],
};

describe("compareCriteriaByDefaultRowIdxFn(...)", () => {
  describe("ASC", () => {
    it("Already sorted criterion array", () => {
      expect(
        criteriaSortedByDefaultRowIdx.ASC.sort(
          compareCriteriaByDefaultRowIdxFn(ASC)
        )
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.ASC);
    });

    it("Unsorted criterion array", () => {
      expect(
        [c1, c2, c3].sort(compareCriteriaByDefaultRowIdxFn(ASC))
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.ASC);
    });
  });

  describe("DESC", () => {
    it("Already sorted criterion array", () => {
      expect(
        criteriaSortedByDefaultRowIdx.DESC.sort(
          compareCriteriaByDefaultRowIdxFn(DESC)
        )
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.DESC);
    });

    it("Unsorted criterion array", () => {
      expect(
        [c1, c2, c3].sort(compareCriteriaByDefaultRowIdxFn(DESC))
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.DESC);
    });
  });
});

describe("sumCriteriaWeight(...)", () => {
  it("Check return value", () => {
    expect(sumCriteriaWeight(criteria)).toEqual(4);
  });
});

describe("calculateCriteriaNormalizedWeight(...)", () => {
  const criteriaWithNormalizedWeights =
    calculateCriteriaNormalizedWeight(criteria);

  it("Expect correct values", () => {
    expect(criteriaWithNormalizedWeights).toStrictEqual([
      { ...c1, normalizedWeight: 0.5 },
      { ...c2, normalizedWeight: 0.25 },
      { ...c3, normalizedWeight: 0.25 },
    ]);
  });

  it("Ensure normalized weight total is 1", () => {
    expect(
      criteriaWithNormalizedWeights.reduce(
        (total, criterion) => total + (criterion.normalizedWeight ?? 0),
        0
      )
    ).toEqual(1);
  });
});

describe("getCriteriaMaxWeight(...)", () => {
  it("Expect correct value", () => {
    expect(getCriteriaMaxWeight(criteria)).toEqual(2);
  });
});

describe("getCriterionWeightRelativeToMax(...)", () => {
  const maxWeight = getCriteriaMaxWeight(criteria);

  it("Expect correct value", () => {
    expect(
      criteria.map((criterion) =>
        getCriterionWeightRelativeToMax(criterion.weight, maxWeight)
      )
    ).toEqual([
      100, // ** c1.weight = 2 (100%)
      50, //  ** c2.weight = 1 ( 50%)
      50, //  ** c3.weight = 1 ( 50%)
    ]);
  });
});
