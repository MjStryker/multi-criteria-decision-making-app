import { Criterion } from "@/types/Criterion";
import { atom, useAtomValue } from "jotai";

// TODO: LocalStorage

export const CriterionListAtom = atom<Criterion[]>([]);

export default function UseGetCriterionListQuery() {
  const criterionList = useAtomValue(CriterionListAtom);

  // TODO: Sort list

  return criterionList;
}
