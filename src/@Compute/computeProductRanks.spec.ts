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
});
