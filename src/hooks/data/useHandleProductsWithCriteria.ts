import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import { useCallback } from "react";

export type useHandleProductsWithCriteriaFunctions = ReturnType<
  typeof useHandleProductsWithCriteria
>;

const useHandleProductsWithCriteria = (
  productsWithCriteria: TProductWithCriterion[],
  setProductsWithCriteria: React.Dispatch<
    React.SetStateAction<TProductWithCriterion[]>
  >
) => {
  const addProductWithCriteria = useCallback(
    (productWithCriteria: TProductWithCriterion) => {
      setProductsWithCriteria((prev) => [...prev, productWithCriteria]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setProductCriterionValue = useCallback(
    (product: TProduct, criterion: TCriterion, value: number | null) => {
      const res = [...productsWithCriteria];
      const productWithCriteria =
        res.find(
          (e) => e.productId === product.id && e.criterionId === criterion.id
        ) ?? createEmptyProductCriterionValue(product, criterion);

      productWithCriteria.value = value ?? undefined;

      setProductsWithCriteria(res);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productsWithCriteria]
  );

  const removeProductWithCriteria = useCallback(
    (product: TProduct, criterion: TCriterion) => {
      return setProductsWithCriteria((prev) =>
        prev.filter(
          ({ productId, criterionId }) =>
            product.id !== productId && criterion.id !== criterionId
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    addProductWithCriteria,
    setProductCriterionValue,
    removeProductWithCriteria,
  };
};

export default useHandleProductsWithCriteria;
