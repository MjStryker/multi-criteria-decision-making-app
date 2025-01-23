import { Criterion } from "../../types/Criterion";
import { Product } from "../../types/Product";
import { ProductCriterionValue } from "../../types/ProductCriterionValue";
import { findProductWithCriterion } from "./productsWithCriteria";

export const productsWithCriteria: ProductCriterionValue[] = [
  /**
   * Criterion - 1
   */
  {
    id: "id-c1-p1",
    criterionId: "id-c1",
    productId: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c1-p2",
    criterionId: "id-c1",
    productId: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c1-p3",
    criterionId: "id-c1",
    productId: "id-p3",
    value: 100,
    criterionRankPts: null,
  },

  /**
   * Criterion - 2
   */
  {
    id: "id-c2-p1",
    criterionId: "id-c2",
    productId: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c2-p2",
    criterionId: "id-c2",
    productId: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c2-p3",
    criterionId: "id-c2",
    productId: "id-p3",
    value: 100,
    criterionRankPts: null,
  },

  /**
   * Criterion - 3
   */
  {
    id: "id-c3-p1",
    criterionId: "id-c3",
    productId: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c3-p2",
    criterionId: "id-c3",
    productId: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c3-p3",
    criterionId: "id-c3",
    productId: "id-p3",
    value: 100,
    criterionRankPts: null,
  },
];

export const c2: Criterion = {
  id: "id-c2",
  name: "c2",
  unit: null,
  weight: 1,
  normalizedWeight: 1,
  beneficial: true,
  defaultRowIdx: 1,
};

export const p3: Product = {
  id: "id-p3",
  name: "p3",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 3,
};

describe("findProductCriterionValue(...)", () => {
  it("Return matched item", () => {
    const matchingResult: ProductCriterionValue = {
      id: "id-c2-p3",
      criterionId: "id-c2",
      productId: "id-p3",
      value: 100,
      criterionRankPts: null,
    };

    expect(
      findProductWithCriterion(p3, c2, productsWithCriteria)
    ).toStrictEqual(matchingResult);
  });

  it("Product does not exist", () => {
    const pUnmatched: Product = {
      id: "id-pUnmatched",
      name: "pUnmatched",
      reference: null,
      rank: null,
      rankPts: null,
      defaultColumnIdx: -1,
    };

    expect(
      findProductWithCriterion(pUnmatched, c2, productsWithCriteria)
    ).toBenull();
  });

  it("Criterion does not exist", () => {
    const cUnmatched: Criterion = {
      id: "id-Unmatched",
      name: "Unmatched",
      unit: null,
      weight: -1,
      normalizedWeight: -1,
      beneficial: true,
      defaultRowIdx: -1,
    };

    expect(
      findProductWithCriterion(p3, cUnmatched, productsWithCriteria)
    ).toBenull();
  });
});
