import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";

const useHandleProductsWithCriteria = (
  productsWithCriteria: TProductWithCriterion[],
  setProductsWithCriteria: React.Dispatch<
    React.SetStateAction<TProductWithCriterion[]>
  >
) => {
  const addProductWithCriteria = (
    productWithCriteria: TProductWithCriterion
  ) => {
    setProductsWithCriteria((prev) => [...prev, productWithCriteria]);
  };

  const setProductCriterionValue = (
    product: TProduct,
    criterion: TCriterion,
    value: number | null
  ) => {
    const res = [...productsWithCriteria];
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
    setProductCriteriaValue: setProductCriterionValue,
    removeProductWithCriteria,
  };
};

export default useHandleProductsWithCriteria;
