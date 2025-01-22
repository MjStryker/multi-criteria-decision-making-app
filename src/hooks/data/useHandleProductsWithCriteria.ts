import { Criterion } from "../../types/Criterion";
import { Product } from "../../types/Product";
import { ProductCriterionValue } from "../../types/ProductCriterionValue";
import { createEmptyProductCriterionValue } from "../../utils/productsWithCriteria/productsWithCriteria";
import { useCallback } from "react";

export type useHandleProductsWithCriteriaFunctions = ReturnType<
  typeof useHandleProductsWithCriteria
>;

const useHandleProductsWithCriteria = (
  productsWithCriteria: ProductCriterionValue[],
  setProductsWithCriteria: React.Dispatch<
    React.SetStateAction<ProductCriterionValue[]>
  >
) => {
  const addProductWithCriterion = useCallback(
    (productWithCriterion: ProductCriterionValue) => {
      setProductsWithCriteria((prev) => [...prev, productWithCriterion]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setProductCriterionValue = useCallback(
    (product: Product, criterion: Criterion, value: number | null) => {
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
    (product: Product, criterion: Criterion) => {
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
    (id: Product["id"]) => {
      setProductsWithCriteria((prev) =>
        prev.filter(({ productId }) => id !== productId)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeAllValuesAssociatedToCriterionId = useCallback(
    (id: Criterion["id"]) => {
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
