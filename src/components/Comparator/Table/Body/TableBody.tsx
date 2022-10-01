import {
  getCriteriasNormalizedMaxWeight,
  sumCriteriasWeight,
} from "../../../../utils/criterias/criterias";

import { TCriteria } from "../../../../types/criterias";
import { TProduct } from "../../../../types/products";
import TableBodyRow from "./TableBodyRow";
import useHandleCriterias from "../../../../hooks/data/useHandleCriterias";
import useHandleProductsWithCriterias from "../../../../hooks/data/useHandleProductsWithCriterias";

type TableBodyProps = {
  criterias: TCriteria[];
  products: TProduct[];
  updateCriteria: ReturnType<typeof useHandleCriterias>["updateCriteria"];
  removeCriteria: ReturnType<typeof useHandleCriterias>["removeCriteria"];
  setProductCriteriaValue: ReturnType<
    typeof useHandleProductsWithCriterias
  >["setProductCriteriaValue"];
};

const TableBody = (props: TableBodyProps) => {
  const weightTotal = sumCriteriasWeight(props.criterias);

  const maxWeight = getCriteriasNormalizedMaxWeight(
    props.criterias,
    weightTotal
  );

  return (
    <tbody>
      {props.criterias.map((criterion, criteriaRowIdx) => (
        <TableBodyRow
          key={criterion.id}
          criterion={criterion}
          products={props.products}
          rowIdx={0}
          weightTotal={weightTotal}
          maxWeight={maxWeight}
          updateCriteria={props.updateCriteria}
          removeCriteria={props.removeCriteria}
          setProductCriteriaValue={props.setProductCriteriaValue}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
