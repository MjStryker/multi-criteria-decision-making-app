import { useCallback } from "react";
import UseSetProductCriterionValueListCommand from "./UseSetProductCriterionValueList.command";

export default function UseUpdateProductCriterionValueCommand() {
  const setProductCriterionValueList = UseSetProductCriterionValueListCommand();

  const updateProductCriterionValue = useCallback(
    (productId: string, criterionId: string, newValue: number | null) => {
      setProductCriterionValueList((prev) => {
        const index = prev.findIndex(
          (item) =>
            item.productId === productId && item.criterionId === criterionId
        );

        if (index === -1) {
          return prev;
        }

        const newProductCriterionValueList = [...prev];
        newProductCriterionValueList[index] = {
          ...newProductCriterionValueList[index],
          value: newValue,
        };

        return newProductCriterionValueList;
      });
    },
    [setProductCriterionValueList]
  );

  return updateProductCriterionValue;
}
