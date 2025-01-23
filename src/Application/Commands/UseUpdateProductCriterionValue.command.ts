import { useCallback } from "react";
import UseSetProductCriterionValueListCommand from "./UseSetProductCriterionValueList.command";

export default function UseUpdateProductCriterionValueCommand() {
  const setProductCriterionValueList = UseSetProductCriterionValueListCommand();

  const updateProductCriterionValue = useCallback(
    (productId: string, criterionId: string, newValue: number | null) => {
      setProductCriterionValueList((prev) => {
        const currentValue = prev.find(
          (item) =>
            item.productId === productId && item.criterionId === criterionId
        );

        if (!currentValue) {
          return prev;
        }

        currentValue.value = newValue;

        return [...prev];
      });
    },
    [setProductCriterionValueList]
  );

  return updateProductCriterionValue;
}
