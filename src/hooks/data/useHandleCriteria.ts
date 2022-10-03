import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import useHandleProductsWithCriteria from "./useHandleProductsWithCriteria";

const useHandleCriteria = (
  setCriterion: React.Dispatch<React.SetStateAction<TCriterion[]>>,
  products: TProduct[],
  addProductWithCriterion: ReturnType<
    typeof useHandleProductsWithCriteria
  >["addProductWithCriteria"]
) => {
  const addCriterion = (criteria: TCriterion) => {
    setCriterion((prev) => [...prev, criteria]);
    products.forEach((product) => {
      addProductWithCriterion(
        createEmptyProductCriterionValue(product, criteria)
      );
    });
  };

  const updateCriterion = (criterion: TCriterion) =>
    setCriterion((prev) => {
      const newCriteriaIdx = prev.findIndex((p) => criterion.id === p.id);
      prev[newCriteriaIdx] = criterion;
      return [...prev];
    });

  const removeCriterion = ({ id }: TCriterion) =>
    setCriterion((prev) => prev.filter((c) => c.id !== id));

  return {
    addCriterion,
    updateCriterion,
    removeCriterion,
  };
};

export default useHandleCriteria;
