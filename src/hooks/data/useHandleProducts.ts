import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import useHandleProductsWithCriterias from "./useHandleProductsWithCriterias";
import { useState } from "react";

const useHandleProducts = (
  initialProducts: TProduct[],
  criterias: TCriteria[],
  addProductWithCriteria: ReturnType<
    typeof useHandleProductsWithCriterias
  >["addProductWithCriteria"]
) => {
  const [products, setProducts] = useState(initialProducts);

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

  return { products, addProduct, updateProduct, removeProduct };
};

export default useHandleProducts;
