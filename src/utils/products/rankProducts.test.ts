import { Criterion } from "../../types/Criterion";
import { Product } from "../../types/Product";
import { ProductCriterionValue } from "../../types/ProductCriterionValue";
import { rankProducts } from "./rankProducts";
import { sumCriteriaNormalizedWeight } from "../criteria/criteria";

const c1: Criterion = {
  id: "id-c1",
  name: "c1",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 2,
};

const c2: Criterion = {
  id: "id-c2",
  name: "c2",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 1,
};

const c3: Criterion = {
  id: "id-c3",
  name: "c3",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 3,
};

const c4: Criterion = {
  id: "id-c4",
  name: "c4",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 3,
};

const criteria: Criterion[] = [c1, c2, c3, c4];

const p1: Product = {
  id: "id-p1",
  name: "p1",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 2,
};

const p2: Product = {
  id: "id-p2",
  name: "p2",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 1,
};

const p3: Product = {
  id: "id-p3",
  name: "p3",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 3,
};

const products: Product[] = [p1, p2, p3];

const productsWithCriteria: ProductCriterionValue[] = [
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

  /**
   * Criterion - 4
   */
  {
    id: "id-c4-p1",
    criterionId: "id-c4",
    productId: "id-p1",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c4-p2",
    criterionId: "id-c4",
    productId: "id-p2",
    value: 100,
    criterionRankPts: null,
  },
  {
    id: "id-c4-p3",
    criterionId: "id-c4",
    productId: "id-p3",
    value: 100,
    criterionRankPts: null,
  },
];

type TProductValue = number | null;

function getTestValues(
  values: [criterionData: Partial<Criterion>, productValues: TProductValue[]][]
): {
  criteriaToUse: Criterion[];
  productsWithCriteriaToUse: ProductCriterionValue[];
} {
  expect(values.length).toBe(criteria.length);

  values.forEach(
    (val) => expect(val[1].length).toBe(products.length) // productValues
  );

  const criteriaToUse = [...criteria].map((criterion, idx) => ({
    ...criterion,
    ...values[idx][0],
  }));

  const productValues = values.map((val) => val[1]).flat();

  const productsWithCriteriaToUse = [...productsWithCriteria].map(
    (elt, idx) => ({
      ...elt,
      value: productValues[idx],
    })
  );

  return {
    criteriaToUse,
    productsWithCriteriaToUse,
  };
}

function getProductFromName(productName: string, list = products) {
  return list?.find(({ name }) => name === productName);
}

describe("rankProducts(...)", () => {
  describe("Validate Test Suite data set", () => {
    it("Ensure criteria total normalized weight is 1", () => {
      expect(sumCriteriaNormalizedWeight(criteria)).toBe(1);
    });

    it("Ensure products have no ranks", () => {
      products.forEach(({ rank }) => {
        expect(rank).toBenull();
      });
    });
  });

  it("test 1", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
    ]);

    const { rankedProducts } = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(1);
  });

  it("test 2", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [99, 101, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
    ]);

    const { rankedProducts } = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(3);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(2);
  });

  it("test 3", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{ beneficial: false }, [99, 101, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
    ]);

    const { rankedProducts } = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(3);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(2);
  });

  it("test 4", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [100, 101, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
    ]);

    const { rankedProducts } = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(2);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(2);
  });

  it("test 5", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [-100, 100, 100]],
      [{}, [100, 100, 100]],
    ]);

    const { rankedProducts } = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(2);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(1);
  });

  it("test 6", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [100, 100, null]],
      [{}, [100, 100, null]],
      [{}, [100, 100, null]],
      [{}, [100, 100, null]],
    ]);

    const { rankedProducts } = rankProducts(
      products,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(2);
  });
});
