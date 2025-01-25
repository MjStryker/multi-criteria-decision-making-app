import UseGetCriterionListQuery from "@/Application/Queries/UseGetCriterionList.query";
import { getCriteriaMaxWeight } from "@/utils/criteria/criteria";
import { Tbody } from "@chakra-ui/react";
import { useMemo } from "react";
import TableBodyRow from "./TableBodyRow";

const TableBody = () => {
  const criterionList = UseGetCriterionListQuery();

  const maxWeight = useMemo(
    () => getCriteriaMaxWeight(criterionList),
    [criterionList]
  );

  return (
    <Tbody>
      {criterionList.map((criterion, rowIdx) => (
        <TableBodyRow
          key={criterion.id}
          rowIdx={rowIdx}
          criterion={criterion}
          maxWeight={maxWeight}
        />
      ))}
    </Tbody>
  );
};

export default TableBody;
