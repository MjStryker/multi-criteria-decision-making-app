import {
  calculateProductsCriteriaRankPts,
  rankProducts,
} from "../../utils/products/rankProducts";
import { useEffect, useMemo, useState } from "react";

import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { deepEqual } from "../../utils/objects";

const useRankProducts = (
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
) => {
  const [rankedProducts, setRankedProducts] = useState<TProduct[]>([]);

  const newProductsWithCriteriaRankPts = useMemo(
    () => calculateProductsCriteriaRankPts(criteria, productsWithCriteria),
    [criteria, productsWithCriteria]
  );

  const newRankedProducts = useMemo(
    () => rankProducts(products, newProductsWithCriteriaRankPts),
    [products, newProductsWithCriteriaRankPts]
  );

  useEffect(() => {
    if (deepEqual(products, rankedProducts)) {
      console.log("Equals..");
      return;
    }

    if (!deepEqual(rankedProducts, newRankedProducts)) {
      console.log("New ranks!");
      setRankedProducts(newRankedProducts);
    }

    return () => {
      console.log("[ useEffect ] useRankProducts -> cleanup()");
      setRankedProducts([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProductsWithCriteriaRankPts]);

  return { rankedProducts };
};

export default useRankProducts;
