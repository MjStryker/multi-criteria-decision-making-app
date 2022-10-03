import {
  createEmptyProductCriterionValue,
  getProductsCriteriaNormalizedWeightedValues,
} from "../../utils/productsWithCriteria/productsWithCriteria";

import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { useEffect } from "react";

const useHandleProductsWithCriteria = (
  productsWithCriterias: TProductWithCriterion[],
  setProductsWithCriterias: React.Dispatch<
    React.SetStateAction<TProductWithCriterion[]>
  >,
  products: TProduct[],
  criteria: TCriterion[]
) => {
  const { productsWithCriteriaNormalizedWeightedValues } =
    getProductsCriteriaNormalizedWeightedValues(
      products,
      criteria,
      productsWithCriterias
    );

  useEffect(() => {
    setProductsWithCriterias(productsWithCriteriaNormalizedWeightedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsWithCriteriaNormalizedWeightedValues]);

  const addProductWithCriteria = (
    productWithCriteria: TProductWithCriterion
  ) => {
    setProductsWithCriterias((prev) => [...prev, productWithCriteria]);
  };

  const setProductCriteriaValue = (
    product: TProduct,
    criteria: TCriterion,
    value: number | null
  ) => {
    const res = [...productsWithCriterias];
    const productWithCriteria =
      res.find(
        (e) => e.productId === product.id && e.criterionId === criteria.id
      ) ?? createEmptyProductCriterionValue(product, criteria);

    productWithCriteria.value = value ?? undefined;

    setProductsWithCriterias(res);
  };

  const removeProductWithCriteria = (product: TProduct, criteria: TCriterion) =>
    setProductsWithCriterias((prev) =>
      prev.filter(
        ({ productId, criterionId: criteriaId }) =>
          product.id !== productId && criteria.id !== criteriaId
      )
    );

  return {
    addProductWithCriteria,
    setProductCriteriaValue,
    removeProductWithCriteria,
  };
};

export default useHandleProductsWithCriteria;
