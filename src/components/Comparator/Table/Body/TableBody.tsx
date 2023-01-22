import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { TProductWithCriterion } from "../../../../types/productsWithCriteria";
import TableBodyRow from "./TableBodyRow";
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
    <tbody>
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
    </tbody>
  );
};

export default TableBody;
