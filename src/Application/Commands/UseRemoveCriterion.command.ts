import { Criterion } from "@/types/Criterion";
import { useCallback } from "react";
import UseSetCriterionListCommand from "./UseSetCriterionList.command";

export default function UseRemoveCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const removeCriterion = useCallback(
    (criterion: Criterion) => {
      setCriterionListCommand((criterions) =>
        criterions.filter((p) => p.id !== criterion.id)
      );
    },
    [setCriterionListCommand]
  );

  return removeCriterion;
}
