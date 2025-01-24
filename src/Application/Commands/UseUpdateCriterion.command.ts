import { Criterion } from "@/types/Criterion";
import { useCallback } from "react";
import UseSetCriterionListCommand from "./UseSetCriterionList.command";

export default function UseUpdateCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const updateCriterionCommand = useCallback(
    (criterion: Criterion) => {
      setCriterionListCommand((prev) => {
        const index = prev.findIndex((c) => c.id === criterion.id);
        if (index === -1) {
          return prev;
        }

        const newCriterionList = [...prev];
        newCriterionList[index] = criterion;

        return newCriterionList;
      });
    },
    [setCriterionListCommand]
  );

  return updateCriterionCommand;
}
