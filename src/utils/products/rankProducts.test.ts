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
    criterionRankPts: undefined,
  },
  {
    id: "id-c1-p2",
    criterionId: "id-c1",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
  {
    id: "id-c1-p3",
    criterionId: "id-c1",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
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
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
  {
    id: "id-c2-p2",
    criterionId: "id-c2",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
  {
    id: "id-c2-p3",
    criterionId: "id-c2",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
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
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
  {
    id: "id-c3-p2",
    criterionId: "id-c3",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
  {
    id: "id-c3-p3",
    criterionId: "id-c3",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
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
    criterionRankPts: undefined,
  },
  {
    id: "id-c4-p2",
    criterionId: "id-c4",
    productId: "id-p2",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
  {
    id: "id-c4-p3",
    criterionId: "id-c4",
    productId: "id-p3",
    value: 100,
    normalizedValue: undefined,
    weightedValue: undefined,
    criterionRankPts: undefined,
  },
];

function getTestValues(
  values: [criterionData: Partial<TCriterion>, productValues: number[]][]
): {
  criteriaToUse: TCriterion[];
  productsWithCriteriaToUse: TProductWithCriterion[];
} {
  expect(values.length).toBe(criteria.length);

  values.forEach(
    (val) => expect(val[1].length).toBe(products.length) // productValues
  );

  const criteriaToUse = calculateCriteriaNormalizedWeight(
    [...criteria].map((criterion, idx) => ({
      ...criterion,
      ...values[idx][0],
    }))
  );

  expect(sumCriteriaNormalizedWeight(criteriaToUse)).toBeGreaterThanOrEqual(
    0.999
  );

  const productValues = values.map((val) => val[1]).flat();

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

  // it("test 1", () => {
  //   const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
  //     [{}, [100, 100, 100]],
  //     [{}, [100, 100, 100]],
  //     [{}, [100, 100, 100]],
  //     [{}, [100, 100, 100]],
  //   ]);

  //   expect(
  //     rankProducts(products, criteriaToUse, productsWithCriteriaToUse)
  //   ).toStrictEqual([
  //     { ...p1, rank: 1 },
  //     { ...p2, rank: 1 },
  //     { ...p3, rank: 1 },
  //   ]);
  // });

  it("test 2", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [99, 101, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
    ]);

    const rankedProducts = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(rankedProducts?.find(({ name }) => name === "p1")?.rank).toEqual(1);
    expect(rankedProducts?.find(({ name }) => name === "p2")?.rank).toEqual(1);
    expect(rankedProducts?.find(({ name }) => name === "p3")?.rank).toEqual(1);
  });

  // it("test 3", () => {
  //   const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
  //     [{ beneficial: false }, [99, 101, 100]],
  //     [{}, [100, 100, 100]],
  //     [{}, [100, 100, 100]],
  //     [{}, [100, 100, 100]],
  //   ]);

  //   expect(
  //     rankProducts(products, criteriaToUse, productsWithCriteriaToUse)
  //   ).toStrictEqual([
  //     { ...p1, rank: 1 },
  //     { ...p3, rank: 2 },
  //     { ...p2, rank: 3 },
  //   ]);
  // });
});
