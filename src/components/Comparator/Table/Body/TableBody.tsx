import {
  getCriteriaMaxWeight,
  sumCriteriaWeight,
} from "../../../../utils/criteria/criteria";

import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { TProductWithCriterion } from "../../../../types/productsWithCriteria";
import TableBodyRow from "./TableBodyRow";
import useHandleCriteria from "../../../../hooks/data/useHandleCriteria";
import useHandleProductsWithCriteria from "../../../../hooks/data/useHandleProductsWithCriteria";

type TableBodyProps = {
  criteria: TCriterion[];
  products: TProduct[];
  productsWithCriteria: TProductWithCriterion[];
  updateCriterion: ReturnType<typeof useHandleCriteria>["updateCriterion"];
  removeCriterion: ReturnType<typeof useHandleCriteria>["removeCriterion"];
  setProductCriteriaValue: ReturnType<
    typeof useHandleProductsWithCriteria
  >["setProductCriteriaValue"];
};

const TableBody = (props: TableBodyProps) => {
  const weightTotal = sumCriteriaWeight(props.criteria);

  const maxWeight = getCriteriaMaxWeight(props.criteria, weightTotal);

  return (
    <tbody>
      {props.criteria.map((criterion, rowIdx) => (
        <TableBodyRow
          key={criterion.id}
          criterion={criterion}
          products={props.products}
          productsWithCriteria={props.productsWithCriteria}
          rowIdx={rowIdx}
          weightTotal={weightTotal}
          maxWeight={maxWeight}
          updateCriterion={props.updateCriterion}
          removeCriterion={props.removeCriterion}
          setProductCriteriaValue={props.setProductCriteriaValue}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
