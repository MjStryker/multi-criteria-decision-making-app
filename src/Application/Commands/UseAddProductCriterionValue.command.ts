import { ProductCriterionValue } from "@/types/ProductCriterionValue";
import { useCallback } from "react";
import UseSetProductCriterionValueListCommand from "./UseSetProductCriterionValueList.command";

export default function UseAddProductCriterionValueCommand() {
  const setProductCriterionValueListCommand = UseSetProductCriterionValueListCommand();

  const addProductCriterionValue = useCallback(
    (productCriterionValue: ProductCriterionValue) => {
      setProductCriterionValueListCommand((productCriterionValues) => [...productCriterionValues, productCriterionValue]);
    },
    [setProductCriterionValueListCommand]
  );

  return addProductCriterionValue;
}
