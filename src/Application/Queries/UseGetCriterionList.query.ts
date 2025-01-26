import atomWithLocalStorage from "@/Infrastructure/AtomWithLocalStorage";

import { useAtomValue } from "jotai";
import { CriterionDto } from "../Dtos/Criterion.dto";

export const CriterionListAtom = atomWithLocalStorage<CriterionDto[]>(
  "criterionList",
  []
);

export default function UseGetCriterionListQuery() {
  const criterionList = useAtomValue(CriterionListAtom);
  return criterionList;
}
