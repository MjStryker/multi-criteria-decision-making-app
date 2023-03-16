import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import { updateProductsDefaultColumnIdx } from "../../utils/products/products";
import { useCallback } from "react";
import useHandleProductsWithCriteria from "./useHandleProductsWithCriteria";

export type useHandleProductsFunctions = ReturnType<typeof useHandleProducts>;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateProduct = useCallback(
    (product: TProduct) => {
      setProducts((prev) => {
        const newProductIdx = prev.findIndex((p) => product.id === p.id);
        prev[newProductIdx] = product;

        return updateProductsDefaultColumnIdx(prev);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeProduct = useCallback(
    ({ id }: TProduct) => {
      setProducts((prev) =>
        updateProductsDefaultColumnIdx(prev.filter((p) => p.id !== id))
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    addProduct,
    updateProduct,
    removeProduct,
  };
};

export default useHandleProducts;
