import CriterionBeneficialCell from "./Cells/CriterionBeneficialCell";
import CriterionNameUnitCell from "./Cells/CriterionNameUnitCell";
import CriterionProductValueCell from "./Cells/CriterionProductValueCell";
import CriterionWeightCell from "./Cells/CriterionWeightCell";
import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { TProductWithCriterion } from "../../../../types/productsWithCriteria";
import { createEmptyProductCriterionValue } from "../../../../utils/productsWithCriteria/productsWithCriteria";
import useHandleCriteria from "../../../../hooks/data/useHandleCriteria";
import useHandleProductsWithCriteria from "../../../../hooks/data/useHandleProductsWithCriteria";

type TableBodyRowProps = {
  criterion: TCriterion;
  products: TProduct[];
  productsWithCriteria: TProductWithCriterion[];
  rowIdx: number;
  weightTotal: number;
  maxWeight: number | null;
  updateCriterion: ReturnType<typeof useHandleCriteria>["updateCriterion"];
  removeCriterion: ReturnType<typeof useHandleCriteria>["removeCriterion"];
  setProductCriteriaValue: ReturnType<
    typeof useHandleProductsWithCriteria
  >["setProductCriteriaValue"];
};

const TableBodyRow = (props: TableBodyRowProps) => {
  return (
    <tr key={props.criterion.id}>
      {/*
       * CRITERION - NAME / UNIT
       */}
      <CriterionNameUnitCell
        criterion={props.criterion}
        rowIdx={props.rowIdx}
        weightTotal={props.weightTotal}
        maxWeight={props.maxWeight}
        updateCriterion={props.updateCriterion}
        removeCriterion={props.removeCriterion}
      />

      {/*
       * CRITERION - BENEFICIAL
       */}
      <CriterionBeneficialCell
        criterion={props.criterion}
        updateCriterion={props.updateCriterion}
      />

      {/*
       * CRITERION - WEIGHT
       */}
      <CriterionWeightCell
        criterion={props.criterion}
        weightTotal={props.weightTotal}
        updateCriterion={props.updateCriterion}
      />

      {/*
       * PRODUCTS - CRITERION VALUES
       */}
      {props.products.map((product, productColumnIdx) => {
        const criteriaProductValue =
          props.productsWithCriteria.find(
            ({ criterionId: criteriaId, productId }) =>
              criteriaId === props.criterion.id && productId === product.id
          ) ?? createEmptyProductCriterionValue(product, props.criterion);

        return (
          <CriterionProductValueCell
            key={criteriaProductValue.id}
            criterion={props.criterion}
            product={product}
            criteriaProductValue={criteriaProductValue}
            setProductCriteriaValue={props.setProductCriteriaValue}
          />
        );
      })}
    </tr>
  );
};

export default TableBodyRow;
