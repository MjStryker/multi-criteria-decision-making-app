import { describe, expect, it } from "vitest";

import type { ProductDto } from "@/Application/Dtos/Product.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { computeProductRanks } from "./computeProductRanks";

const createProduct = (
  uuid: string,
  name: string,
  defaultColumnIdx: number
): ProductDto => ({
  uuid,
  name,
  reference: null,
  rank: null,
  rankPts: null,
  defaultColumnIdx
});

const createProductCriterionValue = (
  uuid: string,
  productUuid: string,
  criterionUuid: string,
  criterionRankPts: number
): ProductCriterionValueDto => ({
  uuid,
  productUuid,
  criterionUuid,
  value: null,
  criterionRankPts
});

describe("computeProductRanks", () => {
  it("should assign rank 1 to product with highest total rank points", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1),
      createProduct("p3", "Product 3", 2)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 3),
      createProductCriterionValue("v2", "p2", "c1", 1),
      createProductCriterionValue("v3", "p3", "c1", 2)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    // Higher rank points = better rank
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(1); // 3 points = rank 1
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(3); // 1 point = rank 3
    expect(result.find(p => p.uuid === "p3")?.rank).toBe(2); // 2 points = rank 2
  });

  it("should calculate total rank points from multiple criteria", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 2),
      createProductCriterionValue("v2", "p1", "c2", 3),
      createProductCriterionValue("v3", "p2", "c1", 1),
      createProductCriterionValue("v4", "p2", "c2", 1)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result.find(p => p.uuid === "p1")?.rankPts).toBe(5);
    expect(result.find(p => p.uuid === "p2")?.rankPts).toBe(2);
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(1); // 5 points = rank 1
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(2); // 2 points = rank 2
  });

  it("should assign same rank to products with same total rank points", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1),
      createProduct("p3", "Product 3", 2)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 5),
      createProductCriterionValue("v2", "p2", "c1", 5),
      createProductCriterionValue("v3", "p3", "c1", 10)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    // p3 has 10 points = rank 1
    // p1 and p2 both have 5 points = rank 2 (tie)
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(2);
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(2);
    expect(result.find(p => p.uuid === "p3")?.rank).toBe(1);
  });

  it("should handle products with zero rank points", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 0),
      createProductCriterionValue("v2", "p2", "c1", 5)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result.find(p => p.uuid === "p1")?.rankPts).toBe(0);
    expect(result.find(p => p.uuid === "p2")?.rankPts).toBe(5);
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(2); // 0 points = worst
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(1); // 5 points = best
  });

  it("should handle null criterion rank points", () => {
    const products = [createProduct("p1", "Product 1", 0)];

    const productCriterionValues = [
      {
        uuid: "v1",
        productUuid: "p1",
        criterionUuid: "c1",
        value: null,
        criterionRankPts: null
      }
    ];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result.find(p => p.uuid === "p1")?.rankPts).toBe(0);
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(1);
  });

  it("should handle empty product list", () => {
    const products: ProductDto[] = [];
    const productCriterionValues: ProductCriterionValueDto[] = [];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result).toEqual([]);
  });

  it("should not mutate input arrays", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 2),
      createProductCriterionValue("v2", "p2", "c1", 1)
    ];

    const productsCopy = structuredClone(products);
    const valuesCopy = structuredClone(productCriterionValues);

    computeProductRanks(products, productCriterionValues);

    expect(products).toEqual(productsCopy);
    expect(productCriterionValues).toEqual(valuesCopy);
  });

  it("should handle complex scenario with ties and multiple criteria", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1),
      createProduct("p3", "Product 3", 2),
      createProduct("p4", "Product 4", 3)
    ];

    const productCriterionValues = [
      // p1: 2 + 3 = 5
      createProductCriterionValue("v1", "p1", "c1", 2),
      createProductCriterionValue("v2", "p1", "c2", 3),
      // p2: 1 + 1 = 2
      createProductCriterionValue("v3", "p2", "c1", 1),
      createProductCriterionValue("v4", "p2", "c2", 1),
      // p3: 2 + 3 = 5 (tie with p1)
      createProductCriterionValue("v5", "p3", "c1", 2),
      createProductCriterionValue("v6", "p3", "c2", 3),
      // p4: 4 + 4 = 8
      createProductCriterionValue("v7", "p4", "c1", 4),
      createProductCriterionValue("v8", "p4", "c2", 4)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result.find(p => p.uuid === "p1")?.rankPts).toBe(5);
    expect(result.find(p => p.uuid === "p2")?.rankPts).toBe(2);
    expect(result.find(p => p.uuid === "p3")?.rankPts).toBe(5);
    expect(result.find(p => p.uuid === "p4")?.rankPts).toBe(8);

    // Rankings: p4=8pts(rank1), p1=5pts(rank2), p3=5pts(rank2), p2=2pts(rank3)
    // Note: Rank 3, not 4, because we don't skip after a tie
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(3);
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(2);
    expect(result.find(p => p.uuid === "p3")?.rank).toBe(2);
    expect(result.find(p => p.uuid === "p4")?.rank).toBe(1);
  });

  it("should preserve original product order", () => {
    const products = [
      createProduct("p3", "Product 3", 2),
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 10),
      createProductCriterionValue("v2", "p2", "c1", 5),
      createProductCriterionValue("v3", "p3", "c1", 1)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    // Original order should be preserved (p3, p1, p2)
    expect(result[0].uuid).toBe("p3");
    expect(result[1].uuid).toBe("p1");
    expect(result[2].uuid).toBe("p2");

    // But ranks should be correct based on points
    expect(result[0].rank).toBe(3); // p3: 1 point
    expect(result[1].rank).toBe(1); // p1: 10 points
    expect(result[2].rank).toBe(2); // p2: 5 points
  });

  it("should handle all products with same total points", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1),
      createProduct("p3", "Product 3", 2)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 5),
      createProductCriterionValue("v2", "p2", "c1", 5),
      createProductCriterionValue("v3", "p3", "c1", 5)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    // All should have rank 1 (tied for first)
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(1);
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(1);
    expect(result.find(p => p.uuid === "p3")?.rank).toBe(1);
  });

  it("should correctly rank with mixed null and non-null criterion points", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 2),
      {
        uuid: "v2",
        productUuid: "p1",
        criterionUuid: "c2",
        value: null,
        criterionRankPts: null
      },
      createProductCriterionValue("v3", "p2", "c1", 1),
      createProductCriterionValue("v4", "p2", "c2", 1)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    // p1: 2 + 0 (null) = 2
    // p2: 1 + 1 = 2
    expect(result.find(p => p.uuid === "p1")?.rankPts).toBe(2);
    expect(result.find(p => p.uuid === "p2")?.rankPts).toBe(2);
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(1);
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(1);
  });

  it("should handle product with no criterion values", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 5)
      // p2 has no criterion values
    ];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result.find(p => p.uuid === "p1")?.rankPts).toBe(5);
    expect(result.find(p => p.uuid === "p2")?.rankPts).toBe(0);
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(1);
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(2);
  });

  it("should handle single product", () => {
    const products = [createProduct("p1", "Product 1", 0)];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", 10)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    expect(result).toHaveLength(1);
    expect(result[0].rankPts).toBe(10);
    expect(result[0].rank).toBe(1);
  });

  it("should handle large number of products", () => {
    const products = Array.from({ length: 100 }, (_, i) =>
      createProduct(`p${i}`, `Product ${i}`, i)
    );

    const productCriterionValues = Array.from({ length: 100 }, (_, i) =>
      createProductCriterionValue(`v${i}`, `p${i}`, "c1", i + 1)
    );

    const result = computeProductRanks(products, productCriterionValues);

    expect(result).toHaveLength(100);
    // Highest points (100) should get rank 1
    expect(result.find(p => p.uuid === "p99")?.rank).toBe(1);
    expect(result.find(p => p.uuid === "p99")?.rankPts).toBe(100);
    // Lowest points (1) should get rank 100
    expect(result.find(p => p.uuid === "p0")?.rank).toBe(100);
    expect(result.find(p => p.uuid === "p0")?.rankPts).toBe(1);
  });

  it("should handle negative rank points", () => {
    const products = [
      createProduct("p1", "Product 1", 0),
      createProduct("p2", "Product 2", 1),
      createProduct("p3", "Product 3", 2)
    ];

    const productCriterionValues = [
      createProductCriterionValue("v1", "p1", "c1", -5),
      createProductCriterionValue("v2", "p2", "c1", 0),
      createProductCriterionValue("v3", "p3", "c1", 5)
    ];

    const result = computeProductRanks(products, productCriterionValues);

    // Higher points = better rank, even with negatives
    expect(result.find(p => p.uuid === "p3")?.rank).toBe(1); // 5 points
    expect(result.find(p => p.uuid === "p2")?.rank).toBe(2); // 0 points
    expect(result.find(p => p.uuid === "p1")?.rank).toBe(3); // -5 points
  });
});
