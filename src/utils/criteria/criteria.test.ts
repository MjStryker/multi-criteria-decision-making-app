import { describe, expect, it } from "vitest";

import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import {
  calculateCriteriaNormalizedWeights,
  compareCriteriaByDefaultRowIdxFn,
  getCriteriaMaxWeight,
  getCriterionWeightRelativeToMax,
  sumCriteriaNormalizedWeight,
  sumCriteriaWeight
} from "./criteria";

const c1: CriterionDto = {
  uuid: "id-c1",
  name: "c1",
  unit: null,
  weight: 2,
  normalizedWeight: 0.5,
  beneficial: false,
  defaultRowIdx: 2
};

const c2: CriterionDto = {
  uuid: "id-c2",
  name: "c2",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 1
};

const c3: CriterionDto = {
  uuid: "id-c3",
  name: "c3",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 3
};

const criteria: CriterionDto[] = [c1, c2, c3];

const ASC = SortByEnum.ASC;
const DESC = SortByEnum.DESC;

const criteriaSortedByDefaultRowIdx = {
  ASC: [c2, c1, c3] as CriterionDto[],
  DESC: [c3, c1, c2] as CriterionDto[]
};

describe("compareCriteriaByDefaultRowIdxFn(...)", () => {
  describe("ASC", () => {
    it("Already sorted criteria array", () => {
      expect(
        [...criteriaSortedByDefaultRowIdx.ASC].sort(
          compareCriteriaByDefaultRowIdxFn(ASC)
        )
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.ASC);
    });

    it("Unsorted criteria array", () => {
      expect(
        [c1, c2, c3].sort(compareCriteriaByDefaultRowIdxFn(ASC))
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.ASC);
    });
  });

  describe("DESC", () => {
    it("Already sorted criteria array", () => {
      expect(
        [...criteriaSortedByDefaultRowIdx.DESC].sort(
          compareCriteriaByDefaultRowIdxFn(DESC)
        )
      ).toStrictEqual(criteriaSortedByDefaultRowIdx.DESC);
    });

    it("Unsorted criteria array", () => {
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

describe("sumCriteriaNormalizedWeight(...)", () => {
  it("Check return value", () => {
    expect(sumCriteriaNormalizedWeight(criteria)).toEqual(1);
  });
});

describe("calculateCriteriaNormalizedWeight(...)", () => {
  const criteriaWithNormalizedWeights =
    calculateCriteriaNormalizedWeights(criteria);

  it("Expect correct values", () => {
    expect(criteriaWithNormalizedWeights).toStrictEqual([
      { ...c1, normalizedWeight: 0.5 },
      { ...c2, normalizedWeight: 0.25 },
      { ...c3, normalizedWeight: 0.25 }
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
      criteria.map(criterion =>
        getCriterionWeightRelativeToMax(criterion.weight, maxWeight)
      )
    ).toEqual([
      100, // ** c1.weight = 2 (100%)
      50, //  ** c2.weight = 1 ( 50%)
      50 //  ** c3.weight = 1 ( 50%)
    ]);
  });
});
