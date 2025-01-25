import atomWithLocalStorage from "@/Infrastructure/AtomWithLocalStorage";
import { Criterion } from "@/types/Criterion";
import { useAtomValue } from "jotai";

export const CriterionListAtom = atomWithLocalStorage<Criterion[]>(
  "criterionList",
  []
);

export default function UseGetCriterionListQuery() {
  const criterionList = useAtomValue(CriterionListAtom);
  return criterionList;
}
