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
  const addProductWithCriterion = useCallback(
    (productWithCriterion: TProductWithCriterion) => {
      setProductsWithCriteria((prev) => [...prev, productWithCriterion]);
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
      setProductsWithCriteria((prev) =>
        prev.filter(
          ({ productId, criterionId }) =>
            product.id !== productId && criterion.id !== criterionId
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeAllValuesAssociatedToProductId = useCallback(
    (id: TProduct["id"]) => {
      setProductsWithCriteria((prev) =>
        prev.filter(({ productId }) => id !== productId)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeAllValuesAssociatedToCriterionId = useCallback(
    (id: TCriterion["id"]) => {
      setProductsWithCriteria((prev) =>
        prev.filter(({ criterionId }) => id !== criterionId)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    addProductWithCriterion,
    setProductCriterionValue,
    removeProductWithCriteria,
    removeAllValuesAssociatedToCriterionId,
    removeAllValuesAssociatedToProductId,
  };
};

export default useHandleProductsWithCriteria;
