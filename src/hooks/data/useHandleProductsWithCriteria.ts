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
  setProductsWithCriteria: React.Dispatch<
    React.SetStateAction<TProductWithCriterion[]>
  >,
  products: TProduct[],
  criteria: TCriterion[]
) => {
  // TODO: Tests missing for this function
  const productsWithCriteriaNormalizedWeightedValues =
    getProductsCriteriaNormalizedWeightedValues(
      products,
      criteria,
      productsWithCriterias
    );

  useEffect(() => {
    setProductsWithCriteria(productsWithCriteriaNormalizedWeightedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsWithCriteriaNormalizedWeightedValues]);

  const addProductWithCriteria = (
    productWithCriteria: TProductWithCriterion
  ) => {
    setProductsWithCriteria((prev) => [...prev, productWithCriteria]);
  };

  const setProductCriteriaValue = (
    product: TProduct,
    criterion: TCriterion,
    value: number | null
  ) => {
    const res = [...productsWithCriterias];
    const productWithCriteria =
      res.find(
        (e) => e.productId === product.id && e.criterionId === criterion.id
      ) ?? createEmptyProductCriterionValue(product, criterion);

    productWithCriteria.value = value ?? undefined;

    setProductsWithCriteria(res);
  };

  const removeProductWithCriteria = (
    product: TProduct,
    criterion: TCriterion
  ) =>
    setProductsWithCriteria((prev) =>
      prev.filter(
        ({ productId, criterionId }) =>
          product.id !== productId && criterion.id !== criterionId
      )
    );

  return {
    addProductWithCriteria,
    setProductCriteriaValue,
    removeProductWithCriteria,
  };
};

export default useHandleProductsWithCriteria;
