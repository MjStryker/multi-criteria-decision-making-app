import { useSetAtom } from "jotai";
import { useCallback } from "react";

import { computeProductCriterionValueRankPts } from "@/@Compute/computeProductCriterionValueRankPoints";
import { computeProductRanks } from "@/@Compute/computeProductRanks";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

export function useComputeRanks() {
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  const setProductList = useSetAtom(ProductListAtom);

  /**
   * Compute rank points for each product on each criterion
   * This assigns a rank point value based on how products compare on individual criteria
   */
  const computeCriterionRanks = useCallback(
    (
      criteria: CriterionDto[],
      productCriterionValues: ProductCriterionValueDto[]
    ) => {
      const updatedValues = computeProductCriterionValueRankPts(
        criteria,
        productCriterionValues
      );
      setProductCriterionValueList(updatedValues);
      return updatedValues;
    },
    [setProductCriterionValueList]
  );

  /**
   * Compute overall product ranks based on total rank points across all criteria
   * Products with lower total rank points get better (lower) ranks
   */
  const computeOverallRanks = useCallback(
    (
      products: ProductDto[],
      productCriterionValues: ProductCriterionValueDto[]
    ) => {
      const rankedProducts = computeProductRanks(
        products,
        productCriterionValues
      );
      setProductList(rankedProducts);
      return rankedProducts;
    },
    [setProductList]
  );

  /**
   * Compute all ranks (criterion ranks and overall product ranks)
   */
  const computeAllRanks = useCallback(
    (
      criteria: CriterionDto[],
      products: ProductDto[],
      productCriterionValues: ProductCriterionValueDto[]
    ) => {
      // First compute rank points for each criterion
      const updatedValues = computeCriterionRanks(
        criteria,
        productCriterionValues
      );

      // Then compute overall product ranks
      const rankedProducts = computeOverallRanks(products, updatedValues);

      return {
        productCriterionValues: updatedValues,
        products: rankedProducts
      };
    },
    [computeCriterionRanks, computeOverallRanks]
  );

  return {
    computeCriterionRanks,
    computeOverallRanks,
    computeAllRanks
  };
}
