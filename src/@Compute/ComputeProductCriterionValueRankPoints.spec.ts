import { describe, expect, it } from "vitest";

import { Uuid } from "@/@Shared/@Utils/Uuid";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { computeProductCriterionValueRankPts } from "./ComputeProductCriterionValueRankPoints";

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
});
