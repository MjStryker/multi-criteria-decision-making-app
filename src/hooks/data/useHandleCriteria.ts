import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { calculateCriteriaNormalizedWeights } from "../../utils/criteria/criteria";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import useHandleProductsWithCriteria from "./useHandleProductsWithCriteria";

const useHandleCriteria = (
  setCriteria: React.Dispatch<React.SetStateAction<TCriterion[]>>,
  products: TProduct[],
  addProductWithCriterion: ReturnType<
    typeof useHandleProductsWithCriteria
  >["addProductWithCriteria"]
) => {
  const updateCriteriaNormalizedWeights = () => {
    setCriteria((prev) => calculateCriteriaNormalizedWeights(prev));
  };

  const addCriterion = (criteria: TCriterion) => {
    setCriteria((prev) => [...prev, criteria]);
    products.forEach((product) => {
      addProductWithCriterion(
        createEmptyProductCriterionValue(product, criteria)
      );
    });
    updateCriteriaNormalizedWeights();
  };

  const updateCriterion = (criterion: TCriterion) => {
    setCriteria((prev) => {
      const newCriteriaIdx = prev.findIndex((p) => criterion.id === p.id);
      prev[newCriteriaIdx] = criterion;
      return [...prev];
    });
    updateCriteriaNormalizedWeights();
  };

  const removeCriterion = ({ id }: TCriterion) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
    updateCriteriaNormalizedWeights();
  };

  return {
    addCriterion,
    updateCriterion,
    removeCriterion,
  };
};

export default useHandleCriteria;
