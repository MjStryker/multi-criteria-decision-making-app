import { useCallback } from "react";
import UseSetProductCriterionValueListCommand from "./UseSetProductCriterionValueList.command";

export default function UseRemoveAllValuesAssociatedToProductCommand() {
  const setProductCriterionValueCommand =
    UseSetProductCriterionValueListCommand();

  const removeAllValuesAssociatedToProductId = useCallback(
    (productId: string) => {
      setProductCriterionValueCommand((values) =>
        values.filter((value) => value.productId !== productId)
      );
    },
    [setProductCriterionValueCommand]
  );

  return removeAllValuesAssociatedToProductId;
}
