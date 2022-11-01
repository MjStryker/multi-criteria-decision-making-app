import {
  calculateCriteriaNormalizedWeight,
  sumCriteriaNormalizedWeight,
} from "../criteria/criteria";

import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { rankProducts } from "./rankProducts";

const c1: TCriterion = {
  id: "id-c1",
  name: "c1",
  unit: undefined,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 2,
};

const c2: TCriterion = {
  id: "id-c2",
  name: "c2",
  unit: undefined,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 1,
};

const c3: TCriterion = {
  id: "id-c3",
  name: "c3",
  unit: undefined,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 3,
};

const c4: TCriterion = {
  id: "id-c4",
  name: "c4",
  unit: undefined,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 3,
};

const criteria: TCriterion[] = [c1, c2, c3, c4];

const p1: TProduct = {
  id: "id-p1",
  name: "p1",
  reference: undefined,
  rank: undefined,
  defaultColumnIdx: 2,
};

const p2: TProduct = {
  id: "id-p2",
  name: "p2",
  reference: undefined,
  rank: undefined,
  defaultColumnIdx: 1,
};

const p3: TProduct = {
  id: "id-p3",
  name: "p3",
  reference: undefined,
  rank: undefined,
  defaultColumnIdx: 3,
};

const products: TProduct[] = [p1, p2, p3];

export const productsWithCriteria: TProductWithCriterion[] = [
  /**
   * Criterion - 1
   */
  {
    id: "id-c1-p1",
    criterionId: "id-c1",
    productId: "id-p1",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c1-p2",
    criterionId: "id-c1",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c1-p3",
    criterionId: "id-c1",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },

  /**
   * Criterion - 2
   */
  {
    id: "id-c2-p1",
    criterionId: "id-c2",
    productId: "id-p1",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c2-p2",
    criterionId: "id-c2",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c2-p3",
    criterionId: "id-c2",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },

  /**
   * Criterion - 3
   */
  {
    id: "id-c3-p1",
    criterionId: "id-c3",
    productId: "id-p1",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c3-p2",
    criterionId: "id-c3",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c3-p3",
    criterionId: "id-c3",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },

  /**
   * Criterion - 4
   */
  {
    id: "id-c4-p1",
    criterionId: "id-c4",
    productId: "id-p1",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c4-p2",
    criterionId: "id-c4",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
  {
    id: "id-c4-p3",
    criterionId: "id-c4",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
  },
];

function getTestValues(
  values: { criterionData: Partial<TCriterion>; productValues: number[] }[]
): {
  criteriaToUse: TCriterion[];
  productsWithCriteriaToUse: TProductWithCriterion[];
} {
  expect(values.length).toBe(criteria.length);

  values.forEach(({ productValues }) =>
    expect(productValues.length).toBe(products.length)
  );

  const criteriaToUse = calculateCriteriaNormalizedWeight(
    [...criteria].map((criterion, idx) => ({
      ...criterion,
      ...values[idx].criterionData,
    }))
  );

  expect(sumCriteriaNormalizedWeight(criteriaToUse)).toBe(1);

  const productValues = values.map(({ productValues }) => productValues).flat();

  const productsWithCriteriaToUse = [...productsWithCriteria].map(
    (elt, idx) => ({
      ...elt,
      value: productValues[idx],
    })
  );

  return { criteriaToUse, productsWithCriteriaToUse };
}

describe("rankProducts(...)", () => {
  describe("Validate Test Suite data set", () => {
    it("Ensure criteria total normalized weight is 1", () => {
      expect(sumCriteriaNormalizedWeight(criteria)).toBe(1);
    });

    it("Ensure products have no ranks", () => {
      products.forEach(({ rank }) => {
        expect(rank).toBeUndefined();
      });
    });
  });

  describe("Same weight", () => {
    const weight = 1;

    describe("Only beneficial values", () => {
      const beneficial = true;
      const criterionData = { weight, beneficial };

      it("Equal ranks", () => {
        const productValues = [100, 100, 100];

        const values = [
          { criterionData, productValues },
          { criterionData, productValues },
          { criterionData, productValues },
          { criterionData, productValues },
        ];

        const { criteriaToUse, productsWithCriteriaToUse } =
          getTestValues(values);

        const rankedProducts = rankProducts(
          products,
          criteriaToUse,
          productsWithCriteriaToUse
        );

        expect(rankedProducts).toStrictEqual([
          { ...p1, rank: 1 },
          { ...p2, rank: 1 },
          { ...p3, rank: 1 },
        ]);
      });

      it("1,2,3..", () => {
        const values = [
          { criterionData, productValues: [99, 100, 101] },
          { criterionData, productValues: [100, 100, 100] },
          { criterionData, productValues: [100, 100, 100] },
          { criterionData, productValues: [100, 100, 100] },
        ];

        const { criteriaToUse, productsWithCriteriaToUse } =
          getTestValues(values);

        const rankedProducts = rankProducts(
          products,
          criteriaToUse,
          productsWithCriteriaToUse
        );

        expect(rankedProducts).toStrictEqual([
          { ...p1, rank: 3 },
          { ...p2, rank: 2 },
          { ...p3, rank: 1 },
        ]);
      });
    });

    describe("Only non-beneficial values", () => {
      const beneficial = false;
      const criterionData = { weight, beneficial };

      it("Equal ranks", () => {
        const productValues = [100, 100, 100];

        const values = [
          { criterionData, productValues },
          { criterionData, productValues },
          { criterionData, productValues },
          { criterionData, productValues },
        ];

        const { criteriaToUse, productsWithCriteriaToUse } =
          getTestValues(values);

        const rankedProducts = rankProducts(
          products,
          criteriaToUse,
          productsWithCriteriaToUse
        );

        expect(rankedProducts).toStrictEqual([
          { ...p1, rank: 1 },
          { ...p2, rank: 1 },
          { ...p3, rank: 1 },
        ]);
      });
    });

    describe("Mixed of beneficial and non-beneficial values", () => {
      it("Equal ranks", () => {
        const productValues = [100, 100, 100];

        const values = [
          { criterionData: { weight, beneficial: false }, productValues },
          { criterionData: { weight, beneficial: true }, productValues },
          { criterionData: { weight, beneficial: true }, productValues },
          { criterionData: { weight, beneficial: true }, productValues },
        ];

        const { criteriaToUse, productsWithCriteriaToUse } =
          getTestValues(values);

        const rankedProducts = rankProducts(
          products,
          criteriaToUse,
          productsWithCriteriaToUse
        );

        expect(rankedProducts).toStrictEqual([
          { ...p1, rank: 1 },
          { ...p2, rank: 1 },
          { ...p3, rank: 1 },
        ]);
      });
    });
  });
});
