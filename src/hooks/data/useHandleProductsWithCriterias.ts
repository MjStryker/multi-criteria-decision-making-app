import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import { useState } from "react";

const useHandleProductsWithCriterias = (
  initialProductsWithCriterias: TProductWithCriteria[]
) => {
  const [productsWithCriterias, setProductsWithCriterias] = useState(
    initialProductsWithCriterias
  );

  const addProductWithCriteria = (
    productWithCriteria: TProductWithCriteria
  ) => {
    setProductsWithCriterias((prev) => [...prev, productWithCriteria]);
  };

  const setProductCriteriaValue = (
    product: TProduct,
    criteria: TCriteria,
    value: number | null
  ) => {
    const productWithCriteria =
      productsWithCriterias.find(
        (e) => e.productId === product.id && e.criteriaId === criteria.id
      ) ?? createEmptyProductCriteriaValue(product, criteria);

    productWithCriteria.value = value ?? undefined;

    setProductsWithCriterias((prev) => [...prev, productWithCriteria]);
  };

  const removeProductWithCriteria = (product: TProduct, criteria: TCriteria) =>
    setProductsWithCriterias((prev) =>
      prev.filter(
        ({ productId, criteriaId }) =>
          product.id !== productId && criteria.id !== criteriaId
      )
    );

  return {
    productsWithCriterias,
    addProductWithCriteria,
    setProductCriteriaValue,
    removeProductWithCriteria,
  };
};

export default useHandleProductsWithCriterias;
