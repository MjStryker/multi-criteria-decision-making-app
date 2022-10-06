import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import { useCallback } from "react";
import useHandleProductsWithCriteria from "./useHandleProductsWithCriteria";

const useHandleProducts = (
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>,
  criteria: TCriterion[],
  addProductWithCriteria: ReturnType<
    typeof useHandleProductsWithCriteria
  >["addProductWithCriteria"]
) => {
  const addProduct = useCallback(
    (product: TProduct) => {
      setProducts((prev) => [...prev, product]);
      criteria.forEach((criterion) => {
        addProductWithCriteria(
          createEmptyProductCriterionValue(product, criterion)
        );
      });
    },
    [addProductWithCriteria, criteria, setProducts]
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
