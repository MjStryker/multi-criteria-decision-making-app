import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { findProductWithCriterion } from "./productsWithCriteria";

export const productsWithCriteria: TProductWithCriterion[] = [
  /**
   * Criterion - 1
   */
  {
    id: "id-c1-p1",
    criterionId: "id-c1",
    productId: "id-p1",
    value: 100,
    criterionRankPts: undefined,
  },
  {
    id: "id-c1-p2",
    criterionId: "id-c1",
    productId: "id-p2",
    value: 100,
    criterionRankPts: undefined,
  },
  {
    id: "id-c1-p3",
    criterionId: "id-c1",
    productId: "id-p3",
    value: 100,
    criterionRankPts: undefined,
  },

  /**
   * Criterion - 2
   */
  {
    id: "id-c2-p1",
    criterionId: "id-c2",
    productId: "id-p1",
    value: 100,
    criterionRankPts: undefined,
  },
  {
    id: "id-c2-p2",
    criterionId: "id-c2",
    productId: "id-p2",
    value: 100,
    criterionRankPts: undefined,
  },
  {
    id: "id-c2-p3",
    criterionId: "id-c2",
    productId: "id-p3",
    value: 100,
    criterionRankPts: undefined,
  },

  /**
   * Criterion - 3
   */
  {
    id: "id-c3-p1",
    criterionId: "id-c3",
    productId: "id-p1",
    value: 100,
    criterionRankPts: undefined,
  },
  {
    id: "id-c3-p2",
    criterionId: "id-c3",
    productId: "id-p2",
    value: 100,
    criterionRankPts: undefined,
  },
  {
    id: "id-c3-p3",
    criterionId: "id-c3",
    productId: "id-p3",
    value: 100,
    criterionRankPts: undefined,
  },
];

export const c2: TCriterion = {
  id: "id-c2",
  name: "c2",
  unit: undefined,
  weight: 1,
  normalizedWeight: 1,
  beneficial: true,
  defaultRowIdx: 1,
};

export const p3: TProduct = {
  id: "id-p3",
  name: "p3",
  reference: undefined,
  rank: undefined,
  rankPts: undefined,
  defaultColumnIdx: 3,
};

describe("findProductCriterionValue(...)", () => {
  it("Return matched item", () => {
    const matchingResult: TProductWithCriterion = {
      id: "id-c2-p3",
      criterionId: "id-c2",
      productId: "id-p3",
      value: 100,
      criterionRankPts: undefined,
    };

    expect(
      findProductWithCriterion(p3, c2, productsWithCriteria)
    ).toStrictEqual(matchingResult);
  });

  it("Product does not exist", () => {
    const pUnmatched: TProduct = {
      id: "id-pUnmatched",
      name: "pUnmatched",
      reference: undefined,
      rank: undefined,
      rankPts: undefined,
      defaultColumnIdx: -1,
    };

    expect(
      findProductWithCriterion(pUnmatched, c2, productsWithCriteria)
    ).toBeUndefined();
  });

  it("Criterion does not exist", () => {
    const cUnmatched: TCriterion = {
      id: "id-Unmatched",
      name: "Unmatched",
      unit: undefined,
      weight: -1,
      normalizedWeight: -1,
      beneficial: true,
      defaultRowIdx: -1,
    };

    expect(
      findProductWithCriterion(p3, cUnmatched, productsWithCriteria)
    ).toBeUndefined();
  });
});
