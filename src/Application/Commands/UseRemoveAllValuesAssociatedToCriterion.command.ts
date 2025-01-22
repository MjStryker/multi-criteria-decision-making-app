import { useCallback } from "react";
import UseSetProductCriterionValueListCommand from "./UseSetProductCriterionValueList.command";

export default function UseRemoveAllValuesAssociatedToCriterionCommand() {
  const setProductCriterionValueCommand =
    UseSetProductCriterionValueListCommand();

  const removeAllValuesAssociatedToCriterionId = useCallback(
    (criterionId: string) => {
      setProductCriterionValueCommand((values) =>
        values.filter((value) => value.criterionId !== criterionId)
      );
    },
    [setProductCriterionValueCommand]
  );

  return removeAllValuesAssociatedToCriterionId;
}
