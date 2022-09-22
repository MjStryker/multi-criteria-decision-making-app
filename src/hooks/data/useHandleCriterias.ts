import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import useHandleProductsWithCriterias from "./useHandleProductsWithCriterias";

const useHandleCriterias = (
  setCriterias: React.Dispatch<React.SetStateAction<TCriteria[]>>,
  products: TProduct[],
  addProductWithCriteria: ReturnType<
    typeof useHandleProductsWithCriterias
  >["addProductWithCriteria"]
) => {
  const addCriteria = (criteria: TCriteria) => {
    setCriterias((prev) => [...prev, criteria]);
    products.forEach((product) => {
      addProductWithCriteria(
        createEmptyProductCriteriaValue(product, criteria)
      );
    });
  };

  const updateCriteria = (criteria: TCriteria) =>
    setCriterias((prev) => {
      const newCriteriaIdx = prev.findIndex((p) => criteria.id === p.id);
      prev[newCriteriaIdx] = criteria;
      return [...prev];
    });

  const removeCriteria = ({ id }: TCriteria) =>
    setCriterias((prev) => prev.filter((c) => c.id !== id));

  return {
    addCriteria,
    updateCriteria,
    removeCriteria,
  };
};

export default useHandleCriterias;
