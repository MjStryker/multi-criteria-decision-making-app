import { useContext, useMemo } from "react";

import { DataContext } from "../../../../context/DataContext";
import TableBodyRow from "./TableBodyRow";
import { Tbody } from "@chakra-ui/react";
import { getCriteriaMaxWeight } from "../../../../utils/criteria/criteria";

const TableBody = () => {
  const { criteria } = useContext(DataContext);

  const maxWeight = useMemo(() => getCriteriaMaxWeight(criteria), [criteria]);

  return (
    <Tbody>
      {criteria.map((criterion, rowIdx) => (
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
