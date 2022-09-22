import { useEffect, useState } from "react";

import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import { deepEqual } from "../../utils/objects";
import useHandleProductsWithCriterias from "./useHandleProductsWithCriterias";
import useRankProducts from "./useRankProducts";

const useHandleProducts = (
  products: TProduct[],
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>,
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[],
  addProductWithCriteria: ReturnType<
    typeof useHandleProductsWithCriterias
  >["addProductWithCriteria"]
) => {
  const [rankedProducts, setRankedProducts] = useState(
    useRankProducts(products, criterias, productsWithCriterias).rankedProducts
  );

  // FIXME: Getting ranked products here causes a bug when editing products list
  const { rankedProducts: newRankedProducts } = useRankProducts(
    products,
    criterias,
    productsWithCriterias
  );

  useEffect(() => {
    if (!deepEqual(rankedProducts, newRankedProducts)) {
      setRankedProducts(newRankedProducts);
    }
  }, [products, rankedProducts, newRankedProducts]);

  useEffect(() => {
    setProducts(rankedProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankedProducts]);

  const addProduct = (product: TProduct) => {
    setProducts((prev) => [...prev, product]);
    criterias.forEach((criteria) => {
      addProductWithCriteria(
        createEmptyProductCriteriaValue(product, criteria)
      );
    });
  };

  const updateProduct = (product: TProduct) =>
    setProducts((prev) => {
      const newProductIdx = prev.findIndex((p) => product.id === p.id);
      prev[newProductIdx] = product;
      return [...prev];
    });

  const removeProduct = ({ id }: TProduct) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  return {
    addProduct,
    updateProduct,
    removeProduct,
  };
};

export default useHandleProducts;
