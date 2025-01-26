export const productsWithCriteria: ProductCriterionValueDto[] = [
  /**
   * Criterion - 1
   */
  {
    uuid: "id-c1-p1",
    criterionUuid: "id-c1",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    uuid: "id-c1-p2",
    criterionUuid: "id-c1",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    uuid: "id-c1-p3",
    criterionUuid: "id-c1",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null,
  },

  /**
   * Criterion - 2
   */
  {
    uuid: "id-c2-p1",
    criterionUuid: "id-c2",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    uuid: "id-c2-p2",
    criterionUuid: "id-c2",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    uuid: "id-c2-p3",
    criterionUuid: "id-c2",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null,
  },

  /**
   * Criterion - 3
   */
  {
    uuid: "id-c3-p1",
    criterionUuid: "id-c3",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    uuid: "id-c3-p2",
    criterionUuid: "id-c3",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    uuid: "id-c3-p3",
    criterionUuid: "id-c3",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null,
  },
];

export const c2: CriterionDto = {
  uuid: "id-c2",
  name: "c2",
  unit: null,
  weight: 1,
  normalizedWeight: 1,
  beneficial: true,
  defaultRowIdx: 1,
};

export const p3: ProductDto = {
  uuid: "id-p3",
  name: "p3",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 3,
};

import { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { ProductDto } from "@/Application/Dtos/Product.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { describe, it, expect } from "vitest";
import { findProductWithCriterion } from "./productsWithCriteria";

describe("findProductCriterionValue(...)", () => {
  it("Return matched item", () => {
    const matchingResult: ProductCriterionValueDto = {
      uuid: "id-c2-p3",
      criterionUuid: "id-c2",
      productUuid: "id-p3",
      value: 100,
      criterionRankPts: null,
    };

    expect(
      findProductWithCriterion(p3, c2, productsWithCriteria)
    ).toStrictEqual(matchingResult);
  });

  it("Product does not exist", () => {
    const pUnmatched: ProductDto = {
      uuid: "id-pUnmatched",
      name: "pUnmatched",
      reference: null,
      rank: null,
      rankPts: null,
      defaultColumnIdx: -1,
    };

    expect(
      findProductWithCriterion(pUnmatched, c2, productsWithCriteria)
    ).toBeNull();
  });

  it("Criterion does not exist", () => {
    const cUnmatched: CriterionDto = {
      uuid: "id-Unmatched",
      name: "Unmatched",
      unit: null,
      weight: -1,
      normalizedWeight: -1,
      beneficial: true,
      defaultRowIdx: -1,
    };

    expect(
      findProductWithCriterion(p3, cUnmatched, productsWithCriteria)
    ).toBeNull();
  });
});
