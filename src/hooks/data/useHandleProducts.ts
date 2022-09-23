import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import { useCallback } from "react";
import useHandleProductsWithCriterias from "./useHandleProductsWithCriterias";

const useHandleProducts = (
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>,
  criterias: TCriteria[],
  addProductWithCriteria: ReturnType<
    typeof useHandleProductsWithCriterias
  >["addProductWithCriteria"]
) => {
  const addProduct = useCallback(
    (product: TProduct) => {
      setProducts((prev) => [...prev, product]);
      criterias.forEach((criteria) => {
        addProductWithCriteria(
          createEmptyProductCriteriaValue(product, criteria)
        );
      });
    },
    [addProductWithCriteria, criterias, setProducts]
  );

  const updateProduct = useCallback(
    (product: TProduct) =>
      setProducts((prev) => {
        const newProductIdx = prev.findIndex((p) => product.id === p.id);
        prev[newProductIdx] = product;
        return [...prev];
      }),
    [setProducts]
  );

  const removeProduct = useCallback(
    ({ id }: TProduct) =>
      setProducts((prev) => prev.filter((p) => p.id !== id)),
    [setProducts]
  );

  return {
    addProduct,
    updateProduct,
    removeProduct,
  };
};

export default useHandleProducts;
