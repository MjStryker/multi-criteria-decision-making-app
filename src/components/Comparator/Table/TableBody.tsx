import {
  getCriteriasNormalizedMaxWeight,
  sumCriteriasWeight,
} from "../../../utils/criterias/criterias";

import { TCriteria } from "../../../types/criterias";
import { TProduct } from "../../../types/products";
import TableBodyRow from "./TableBodyRow";

type TableBodyProps = {
  criterias: TCriteria[];
  products: TProduct[];
  updateCriteria: Function;
  removeCriteria: Function;
  setProductCriteriaValue: Function;
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
