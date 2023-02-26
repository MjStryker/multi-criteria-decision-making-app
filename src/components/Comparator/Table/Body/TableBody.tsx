import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { TProductWithCriterion } from "../../../../types/productsWithCriteria";
import TableBodyRow from "./TableBodyRow";
import { Tbody } from "@chakra-ui/react";
import { getCriteriaMaxWeight } from "../../../../utils/criteria/criteria";
import { useHandleCriteriaFunctions } from "../../../../hooks/data/useHandleCriteria";
import { useHandleProductsWithCriteriaFunctions } from "../../../../hooks/data/useHandleProductsWithCriteria";
import { useMemo } from "react";

type TableBodyProps = {
  criteria: TCriterion[];
  products: TProduct[];
  productsWithCriteria: TProductWithCriterion[];
  updateCriterion: useHandleCriteriaFunctions["updateCriterion"];
  removeCriterion: useHandleCriteriaFunctions["removeCriterion"];
  setProductCriterionValue: useHandleProductsWithCriteriaFunctions["setProductCriterionValue"];
};

const TableBody = ({
  criteria,
  products,
  productsWithCriteria,
  updateCriterion,
  removeCriterion,
  setProductCriterionValue,
}: TableBodyProps) => {
  const maxWeight = useMemo(() => getCriteriaMaxWeight(criteria), [criteria]);

  return (
    <Tbody>
      {criteria.map((criterion, rowIdx) => (
        <TableBodyRow
          key={criterion.id}
          criterion={criterion}
          maxWeight={maxWeight}
          products={products}
          productsWithCriteria={productsWithCriteria}
          rowIdx={rowIdx}
          updateCriterion={updateCriterion}
          removeCriterion={removeCriterion}
          setProductCriterionValue={setProductCriterionValue}
        />
      ))}
    </Tbody>
  );
};

export default TableBody;
