import {
  CRITERIA_ITEMS_REMAINING_WARNING,
  CRITERIA_MAX_ITEMS,
} from "@/@Config/Criteria";
import { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import UseGetCriterionListQuery from "../Queries/UseGetCriterionList.query";
import UseSetCriterionListCommand from "./UseSetCriterionList.command";

export default function UseAddCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const criterionList = UseGetCriterionListQuery();

  const toast = useToast();

  const nbCriteria = criterionList.length;
  const nbCriteriaRemaining = CRITERIA_MAX_ITEMS - nbCriteria;

  const addCriterion = useCallback(
    (criterion: CriterionDto) => {
      if (nbCriteriaRemaining === 0) {
        toast({
          status: "error",
          title: "Cannot add another criterion",
          description: `Maximum number of criteria reached (${CRITERIA_MAX_ITEMS}/${CRITERIA_MAX_ITEMS})`,
        });
        return;
      }

      if (nbCriteriaRemaining - 1 <= CRITERIA_ITEMS_REMAINING_WARNING) {
        const label = nbCriteriaRemaining - 1 === 1 ? "criterion" : "criteria";
        toast({
          status: "warning",
          title: `${nbCriteriaRemaining - 1} ${label} remaining`,
        });
      }

      setCriterionListCommand((criterions) => [...criterions, criterion]);
    },
    [nbCriteriaRemaining, setCriterionListCommand, toast]
  );

  return addCriterion;
}
