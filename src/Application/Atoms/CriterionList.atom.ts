import { atomWithStorage, splitAtom } from "jotai/utils";

import type { CriterionDto } from "../Dtos/Criterion.dto";

export const CriterionListAtom = atomWithStorage<CriterionDto[]>(
  "data:criterionList",
  []
);
export const CriterionListSplitAtom = splitAtom(CriterionListAtom);
