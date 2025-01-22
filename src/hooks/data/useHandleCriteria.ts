import {
  calculateCriteriaNormalizedWeights,
  compareCriteriaByWeightFn,
  updateCriteriaDefaultRowIdx,
} from "../../utils/criteria/criteria";

import { SORT_BY } from "../../@Config/Constants/Array";
import { Criterion } from "../../types/Criterion";
import { Product } from "../../types/Product";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import { deepEqual } from "../../utils/Object";
import { useCallback } from "react";
import { useHandleProductsWithCriteriaFunctions } from "./useHandleProductsWithCriteria";

export type useHandleCriteriaFunctions = ReturnType<typeof useHandleCriteria>;

const useHandleCriteria = (
  setCriteria: React.Dispatch<React.SetStateAction<Criterion[]>>,
  products: Product[],
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
    (criterion: Criterion) => {
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
    (criterion: Criterion) => {
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
    ({ id }: Criterion) => {
      setCriteria((prev) =>
        updateCriteriaDefaultRowIdx(prev.filter((c) => c.id !== id))
      );

      updateCriteriaNormalizedWeights();

      removeAllValuesAssociatedToCriterionId(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sortCriteriaByWeight = useCallback((sortBy?: SORT_BY) => {
    setCriteria((prev) => {
      const sorted = [...prev].sort(compareCriteriaByWeightFn(sortBy));

      if (deepEqual(prev, sorted)) return prev;

      return sorted.map((criterion, idx) => ({
        ...criterion,
        defaultRowIdx: idx,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    addCriterion,
    updateCriterion,
    removeCriterion,
    sortCriteriaByWeight,
  };
};

export default useHandleCriteria;
