import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";
import { compareFn } from "@/@Shared/@Utils/Array";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

/**
 * Compute overall product ranks based on total rank points across all criteria.
 * Products with higher total rank points get better (lower) ranks.
 *
 * This is a pure function with no side effects.
 *
 * @param products - Array of products to rank
 * @param productCriterionValues - Array of product criterion values with rank points
 * @returns New array of products with rank and rankPts fields populated
 */
export function computeProductRanks(
  products: ProductDto[],
  productCriterionValues: ProductCriterionValueDto[]
): ProductDto[] {
  let lastRankPts: number | null = null;
  let lastPos = 0;

  // Calculate total rank points for each product
  const productsWithRankPts = products.map(product => {
    const rankPts = productCriterionValues
      .filter(pcv => pcv.productUuid === product.uuid)
      .reduce((total, pcv) => total + (pcv.criterionRankPts ?? 0), 0);

    return { ...product, rankPts };
  });

  // Sort by rank points (descending - higher points = better rank)
  // Then assign ranks (ties get the same rank)
  const rankedProducts = productsWithRankPts
    .sort((p1, p2) => compareFn(SortByEnum.DESC)(p1.rankPts, p2.rankPts))
    .map(product => {
      const pos = product.rankPts !== lastRankPts ? lastPos + 1 : lastPos;

      lastRankPts = product.rankPts;
      lastPos = pos;

      return { ...product, rank: pos };
    });

  return rankedProducts;
}
