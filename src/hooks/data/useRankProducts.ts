import { useEffect, useState } from "react";

import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { getProductsNormalizedAndWeightedValues } from "../../utils/products/products";

const useRankProducts = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) => {
  const [rankedProducts, setRankedProducts] = useState(products);

  useEffect(() => {
    const productsWithNormalizedAndWeightedValues =
      getProductsNormalizedAndWeightedValues(
        products,
        criterias,
        productsWithCriterias
      );

    productsWithNormalizedAndWeightedValues.map(
      ({ product, value, normalizedValue, weightedValue }) => {}
    );

    return () => {
      console.log("[ useEffect ] useRankProducts -> cleanup()");
    };
  }, [products, criterias, productsWithCriterias]);
};

export default useRankProducts;
