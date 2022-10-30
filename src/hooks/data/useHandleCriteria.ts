import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { calculateCriteriaNormalizedWeight } from "../../utils/criteria/criteria";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import useHandleProductsWithCriteria from "./useHandleProductsWithCriteria";

const useHandleCriteria = (
  setCriteria: React.Dispatch<React.SetStateAction<TCriterion[]>>,
  products: TProduct[],
  addProductWithCriterion: ReturnType<
    typeof useHandleProductsWithCriteria
  >["addProductWithCriteria"]
) => {
  const updateCriteriaNormalizedWeight = () => {
    setCriteria((prev) => {
      return calculateCriteriaNormalizedWeight(prev);
    });
  };

  const addCriterion = (criteria: TCriterion) => {
    setCriteria((prev) => [...prev, criteria]);
    products.forEach((product) => {
      addProductWithCriterion(
        createEmptyProductCriterionValue(product, criteria)
      );
    });
    updateCriteriaNormalizedWeight();
  };

  const updateCriterion = (criterion: TCriterion) => {
    setCriteria((prev) => {
      const newCriteriaIdx = prev.findIndex((p) => criterion.id === p.id);
      prev[newCriteriaIdx] = criterion;
      return [...prev];
    });
    updateCriteriaNormalizedWeight();
  };

  const removeCriterion = ({ id }: TCriterion) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
    updateCriteriaNormalizedWeight();
  };

  return {
    addCriterion,
    updateCriterion,
    removeCriterion,
  };
};

export default useHandleCriteria;
