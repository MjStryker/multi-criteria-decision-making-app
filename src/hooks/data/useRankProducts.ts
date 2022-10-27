import { useCallback, useEffect, useState } from "react";

import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { deepEqual } from "../../utils/objects";
import { rankProducts } from "../../utils/products/rankProducts";

const useRankProducts = (
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
) => {
  const [rankedProducts, setRankedProducts] = useState<TProduct[]>([]);

  const rankProductsCallback = useCallback(
    () => rankProducts(products, criteria, productsWithCriteria),
    [criteria, products, productsWithCriteria]
  );

  useEffect(() => {
    if (deepEqual(products, rankedProducts)) {
      console.log("Equals..");
      return;
    }

    const newRankedProducts = rankProductsCallback();

    if (!deepEqual(rankedProducts, newRankedProducts)) {
      console.log("New ranks!");
      setRankedProducts(newRankedProducts);
    }

    return () => {
      console.log("[ useEffect ] useRankProducts -> cleanup()");
      setRankedProducts([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, criteria, productsWithCriteria]);

  return { rankedProducts };
};

export default useRankProducts;
