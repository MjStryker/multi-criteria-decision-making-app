import { Criterion } from "../../types/Criterion";
import { Product } from "../../types/Product";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import { updateProductsDefaultColumnIdx } from "../../utils/products/products";
import { useCallback } from "react";
import { useHandleProductsWithCriteriaFunctions } from "./useHandleProductsWithCriteria";

export type useHandleProductsFunctions = ReturnType<typeof useHandleProducts>;

const useHandleProducts = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  criteria: Criterion[],
  addProductWithCriteria: useHandleProductsWithCriteriaFunctions["addProductWithCriterion"],
  removeAllValuesAssociatedToProductId: useHandleProductsWithCriteriaFunctions["removeAllValuesAssociatedToProductId"]
) => {
  const addProduct = useCallback(
    (product: Product) => {
      setProducts((prev) => [...prev, product]);
      criteria.forEach((criterion) => {
        addProductWithCriteria(
          createEmptyProductCriterionValue(product, criterion)
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [criteria]
  );

  const updateProduct = useCallback(
    (product: Product) => {
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
    ({ id }: Product) => {
      setProducts((prev) =>
        updateProductsDefaultColumnIdx(prev.filter((p) => p.id !== id))
      );

      removeAllValuesAssociatedToProductId(id);
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
