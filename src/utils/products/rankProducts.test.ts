import { describe, expect, it } from "vitest";

import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { sumCriteriaNormalizedWeight } from "../criteria/criteria";
import { rankProducts } from "./rankProducts";

const c1: CriterionDto = {
  uuid: "id-c1",
  name: "c1",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
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

const c4: CriterionDto = {
  uuid: "id-c4",
  name: "c4",
  unit: null,
  weight: 1,
  normalizedWeight: 0.25,
  beneficial: true,
  defaultRowIdx: 3
};

const criteria: CriterionDto[] = [c1, c2, c3, c4];

const p1: ProductDto = {
  uuid: "id-p1",
  name: "p1",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 2
};

const p2: ProductDto = {
  uuid: "id-p2",
  name: "p2",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 1
};

const p3: ProductDto = {
  uuid: "id-p3",
  name: "p3",
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx: 3
};

const productList: ProductDto[] = [p1, p2, p3];

const productCriterionValueList: ProductCriterionValueDto[] = [
  /**
   * Criterion - 1
   */
  {
    uuid: "id-c1-p1",
    criterionUuid: "id-c1",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c1-p2",
    criterionUuid: "id-c1",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c1-p3",
    criterionUuid: "id-c1",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null
  },

  /**
   * Criterion - 2
   */
  {
    uuid: "id-c2-p1",
    criterionUuid: "id-c2",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c2-p2",
    criterionUuid: "id-c2",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c2-p3",
    criterionUuid: "id-c2",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null
  },

  /**
   * Criterion - 3
   */
  {
    uuid: "id-c3-p1",
    criterionUuid: "id-c3",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c3-p2",
    criterionUuid: "id-c3",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c3-p3",
    criterionUuid: "id-c3",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null
  },

  /**
   * Criterion - 4
   */
  {
    uuid: "id-c4-p1",
    criterionUuid: "id-c4",
    productUuid: "id-p1",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c4-p2",
    criterionUuid: "id-c4",
    productUuid: "id-p2",
    value: 100,
    criterionRankPts: null
  },
  {
    uuid: "id-c4-p3",
    criterionUuid: "id-c4",
    productUuid: "id-p3",
    value: 100,
    criterionRankPts: null
  }
];

type TProductValue = number | null;

function getTestValues(
  values: [
    criterionData: Partial<CriterionDto>,
    productValues: TProductValue[]
  ][]
): {
  criteriaToUse: CriterionDto[];
  productsWithCriteriaToUse: ProductCriterionValueDto[];
} {
  expect(values.length).toBe(criteria.length);

  values.forEach(val => {
    expect(val[1].length).toBe(productList.length); // productValues
  });

  const criteriaToUse = [...criteria].map((criterion, idx) => ({
    ...criterion,
    ...values[idx][0]
  }));

  const productValues = values.flatMap(val => val[1]);

  const productsWithCriteriaToUse = [...productCriterionValueList].map(
    (elt, idx) => ({
      ...elt,
      value: productValues[idx]
    })
  );

  return {
    criteriaToUse,
    productsWithCriteriaToUse
  };
}

function getProductFromName(productName: string, list = productList) {
  return list?.find(({ name }) => name === productName);
}

describe("rankProducts(...)", () => {
  describe("Validate Test Suite data set", () => {
    it("Ensure criteria total normalized weight is 1", () => {
      expect(sumCriteriaNormalizedWeight(criteria)).toBe(1);
    });

    it("Ensure products have no ranks", () => {
      productList.forEach(({ rank }) => {
        expect(rank).toBeNull();
      });
    });
  });

  it("test 1", () => {
    const { criteriaToUse, productsWithCriteriaToUse } = getTestValues([
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]],
      [{}, [100, 100, 100]]
    ]);

    const { rankedProducts } = rankProducts(
      productList,
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
      [{}, [100, 100, 100]]
    ]);

    const { rankedProducts } = rankProducts(
      productList,
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
      [{}, [100, 100, 100]]
    ]);

    const { rankedProducts } = rankProducts(
      productList,
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
      [{}, [100, 100, 100]]
    ]);

    const { rankedProducts } = rankProducts(
      productList,
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
      [{}, [100, 100, 100]]
    ]);

    const { rankedProducts } = rankProducts(
      productList,
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
      [{}, [100, 100, null]]
    ]);

    const { rankedProducts } = rankProducts(
      productList,
      criteriaToUse,
      productsWithCriteriaToUse
    );

    expect(getProductFromName("p1", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p2", rankedProducts)?.rank).toEqual(1);
    expect(getProductFromName("p3", rankedProducts)?.rank).toEqual(2);
  });
});
