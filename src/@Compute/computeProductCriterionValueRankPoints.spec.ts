import { describe, expect, it } from "vitest";

import { Uuid } from "@/@Shared/@Utils/Uuid";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { computeProductCriterionValueRankPts } from "./computeProductCriterionValueRankPoints";

function criterionForTest(
  values: Pick<CriterionDto, "uuid" | "beneficial" | "weight">
): CriterionDto {
  return {
    uuid: values.uuid,
    beneficial: values.beneficial,
    weight: values.weight,
    name: "",
    normalizedWeight: null,
    unit: null,
    defaultRowIdx: -1
  };
}

function productCriterionValueForTest(
  values: Pick<
    ProductCriterionValueDto,
    "criterionUuid" | "value" | "productUuid"
  >
): ProductCriterionValueDto {
  return {
    uuid: Uuid.newRandom(),
    criterionUuid: values.criterionUuid,
    value: values.value,
    productUuid: values.productUuid,
    criterionRankPts: 0
  };
}

describe("computeProductCriterionValueRankPts", () => {
  it("one criterion with a weight of 1", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 0
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 2
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    expect(result.length).toBe(3);
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(2);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(3);
  });

  it("one criterion with a weight above 1", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 3 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 2
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 3
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    expect(result.length).toBe(3);
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(1 * 3);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(2 * 3);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(3 * 3);
  });

  it("one criterion with a null value", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: null
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 2
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 3
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    expect(result.length).toBe(3);
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(0);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(2);
  });

  it("one criterion non beneficial with a weight of 1", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: false, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 2
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 3
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    expect(result.length).toBe(3);
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(3);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(2);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(1);
  });

  it("one criterion beneficial and one non beneficial with negative and positive values", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 2 }),
      criterionForTest({ uuid: "criterion-2", beneficial: false, weight: 2 })
    ];

    const productCriterionValues = [
      // criterion-1
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 0
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 4
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: -1
      }),
      // criterion-2
      productCriterionValueForTest({
        criterionUuid: "criterion-2",
        productUuid: "product-1",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-2",
        productUuid: "product-2",
        value: 2
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-2",
        productUuid: "product-3",
        value: -3
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    expect(result.length).toBe(6);
    // criterion-1
    expect(
      result.find(
        v => v.productUuid === "product-1" && v.criterionUuid === "criterion-1"
      )?.criterionRankPts
    ).toBe(4);
    expect(
      result.find(
        v => v.productUuid === "product-2" && v.criterionUuid === "criterion-1"
      )?.criterionRankPts
    ).toBe(6);
    expect(
      result.find(
        v => v.productUuid === "product-3" && v.criterionUuid === "criterion-1"
      )?.criterionRankPts
    ).toBe(2);
    // criterion-2
    expect(
      result.find(
        v => v.productUuid === "product-1" && v.criterionUuid === "criterion-2"
      )?.criterionRankPts
    ).toBe(4);
    expect(
      result.find(
        v => v.productUuid === "product-2" && v.criterionUuid === "criterion-2"
      )?.criterionRankPts
    ).toBe(2);
    expect(
      result.find(
        v => v.productUuid === "product-3" && v.criterionUuid === "criterion-2"
      )?.criterionRankPts
    ).toBe(6);
  });

  it("should preserve original order of product criterion values", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 3
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 2
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    // Order should be preserved (product-3, product-1, product-2)
    expect(result[0].productUuid).toBe("product-3");
    expect(result[1].productUuid).toBe("product-1");
    expect(result[2].productUuid).toBe("product-2");
  });

  it("should handle all same values for beneficial criterion", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 5
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 5
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 5
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    // All tied at position 1, should all get 1 * weight = 1 point
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(1);
  });

  it("should handle all same values for non-beneficial criterion", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: false, weight: 2 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 10
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 10
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 10
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    // All tied at position 1, should all get 1 * weight = 2 points
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(2);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(2);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(2);
  });

  it("should handle ties in beneficial criterion", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 5
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 5
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 10
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    // product-1 and product-2: value 5, position 1 → 1 point
    // product-3: value 10, position 2 → 2 points (better, higher value)
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(2);
  });

  it("should handle ties in non-beneficial criterion", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: false, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 10
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 10
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-3",
        value: 5
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    // Non-beneficial: lower is better, so we sort DESC (highest first)
    // product-1 and product-2: value 10 (tied for worst), position 1 → 1 point each
    // product-3: value 5 (best), position 2 → 2 points
    expect(
      result.find(v => v.productUuid === "product-1")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-2")?.criterionRankPts
    ).toBe(1);
    expect(
      result.find(v => v.productUuid === "product-3")?.criterionRankPts
    ).toBe(2);
  });

  it("should not mutate input arrays", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 1 })
    ];

    const productCriterionValues = [
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 2
      })
    ];

    const criteriaCopy = structuredClone(criteria);
    const valuesCopy = structuredClone(productCriterionValues);

    computeProductCriterionValueRankPts(criteria, productCriterionValues);

    expect(criteria).toEqual(criteriaCopy);
    expect(productCriterionValues).toEqual(valuesCopy);
  });

  it("should handle multiple criteria with different weights", () => {
    const criteria = [
      criterionForTest({ uuid: "criterion-1", beneficial: true, weight: 2 }),
      criterionForTest({ uuid: "criterion-2", beneficial: true, weight: 3 })
    ];

    const productCriterionValues = [
      // criterion-1
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-1",
        value: 1
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-1",
        productUuid: "product-2",
        value: 2
      }),
      // criterion-2
      productCriterionValueForTest({
        criterionUuid: "criterion-2",
        productUuid: "product-1",
        value: 5
      }),
      productCriterionValueForTest({
        criterionUuid: "criterion-2",
        productUuid: "product-2",
        value: 10
      })
    ];

    const result = computeProductCriterionValueRankPts(
      criteria,
      productCriterionValues
    );

    // criterion-1: product-1 (value 1, pos 1) = 1*2 = 2, product-2 (value 2, pos 2) = 2*2 = 4
    // criterion-2: product-1 (value 5, pos 1) = 1*3 = 3, product-2 (value 10, pos 2) = 2*3 = 6
    expect(
      result.find(
        v => v.productUuid === "product-1" && v.criterionUuid === "criterion-1"
      )?.criterionRankPts
    ).toBe(2);
    expect(
      result.find(
        v => v.productUuid === "product-2" && v.criterionUuid === "criterion-1"
      )?.criterionRankPts
    ).toBe(4);
    expect(
      result.find(
        v => v.productUuid === "product-1" && v.criterionUuid === "criterion-2"
      )?.criterionRankPts
    ).toBe(3);
    expect(
      result.find(
        v => v.productUuid === "product-2" && v.criterionUuid === "criterion-2"
      )?.criterionRankPts
    ).toBe(6);
  });
});
