import { Criterion } from "@/types/Criterion";
import { useCallback } from "react";
import UseSetCriterionListCommand from "./UseSetCriterionList.command";

export default function UseAddCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const addCriterion = useCallback(
    (criterion: Criterion) => {
      setCriterionListCommand((criterions) => [...criterions, criterion]);
    },
    [setCriterionListCommand]
  );

  return addCriterion;
}
