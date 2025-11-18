import { Tbody } from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

import {
  CriterionListAtom,
  CriterionListSplitAtom
} from "@/Application/Atoms/CriterionList.atom";
import TableBodyRow from "./TableBodyRow";

const TableBody = () => {
  const [criterionListAtoms] = useAtom(CriterionListSplitAtom);
  const criterionList = useAtomValue(CriterionListAtom);

  const criterionMaxWeight = useMemo(
    () =>
      criterionList.reduce((acc, curr) => Math.max(acc, curr.weight || 0), 0),
    [criterionList]
  );

  return (
    <Tbody>
      {criterionListAtoms.map((criterionAtom, rowIdx) => (
        <TableBodyRow
          key={`${criterionAtom}`}
          rowIdx={rowIdx}
          criterionAtom={criterionAtom}
          criterionMaxWeight={criterionMaxWeight}
        />
      ))}
    </Tbody>
  );
};

export default TableBody;
