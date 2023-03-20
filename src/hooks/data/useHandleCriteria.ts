import {
  calculateCriteriaNormalizedWeights,
  updateCriteriaDefaultRowIdx,
} from "../../utils/criteria/criteria";
import { useHandleProductsWithCriteriaFunctions } from "./useHandleProductsWithCriteria";

import { useCallback } from "react";
import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";

export type useHandleCriteriaFunctions = ReturnType<typeof useHandleCriteria>;

const useHandleCriteria = (
  setCriteria: React.Dispatch<React.SetStateAction<TCriterion[]>>,
  products: TProduct[],
  addProductWithCriterion: useHandleProductsWithCriteriaFunctions["addProductWithCriterion"],
  removeAllValuesAssociatedToCriterionId: useHandleProductsWithCriteriaFunctions["removeAllValuesAssociatedToCriterionId"]
) => {
  const updateCriteriaNormalizedWeights = useCallback(
    () => {
      setCriteria((prev) => calculateCriteriaNormalizedWeights(prev));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addCriterion = useCallback(
    (criterion: TCriterion) => {
      setCriteria((prev) => [...prev, criterion]);
      products.forEach((product) => {
        addProductWithCriterion(
          createEmptyProductCriterionValue(product, criterion)
        );
      });

      updateCriteriaNormalizedWeights();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products]
  );

  const updateCriterion = useCallback(
    (criterion: TCriterion) => {
      setCriteria((prev) => {
        const newCriteriaIdx = prev.findIndex((p) => criterion.id === p.id);
        prev[newCriteriaIdx] = criterion;

        return updateCriteriaDefaultRowIdx(prev);
      });

      updateCriteriaNormalizedWeights();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeCriterion = useCallback(
    ({ id }: TCriterion) => {
      setCriteria((prev) =>
        updateCriteriaDefaultRowIdx(prev.filter((c) => c.id !== id))
      );

      updateCriteriaNormalizedWeights();

      removeAllValuesAssociatedToCriterionId(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    addCriterion,
    updateCriterion,
    removeCriterion,
  };
};

export default useHandleCriteria;
