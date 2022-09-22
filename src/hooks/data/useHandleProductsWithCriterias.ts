import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import { getProductsWithCriteriasNormalizedWeightedValues } from "../../utils/products/products";
import { useEffect } from "react";

const useHandleProductsWithCriterias = (
  productsWithCriterias: TProductWithCriteria[],
  setProductsWithCriterias: React.Dispatch<
    React.SetStateAction<TProductWithCriteria[]>
  >,
  products: TProduct[],
  criterias: TCriteria[]
) => {
  const { productsWithCriteriasNormalizedWeightedValues } =
    getProductsWithCriteriasNormalizedWeightedValues(
      products,
      criterias,
      productsWithCriterias
    );

  useEffect(() => {
    setProductsWithCriterias(productsWithCriteriasNormalizedWeightedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsWithCriteriasNormalizedWeightedValues]);

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
    addProductWithCriteria,
    setProductCriteriaValue,
    removeProductWithCriteria,
  };
};

export default useHandleProductsWithCriterias;
