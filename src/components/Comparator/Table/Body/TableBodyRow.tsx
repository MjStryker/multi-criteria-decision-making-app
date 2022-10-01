import CriterionBeneficialCell from "./Cells/CriterionBeneficialCell";
import CriterionNameUnitCell from "./Cells/CriterionNameUnitCell";
import CriterionProductValueCell from "./Cells/CriterionProductValueCell";
import CriterionWeightCell from "./Cells/CriterionWeightCell";
import { TCriteria } from "../../../../types/criterias";
import { TProduct } from "../../../../types/products";
import { createEmptyProductCriteriaValue } from "../../../../utils/productsWithCriterias/productsWithCriterias";
import productsWithCriterias from "../../../../data/cordlessVacuumCleaner/productsWithCriterias";
import useHandleCriterias from "../../../../hooks/data/useHandleCriterias";
import useHandleProductsWithCriterias from "../../../../hooks/data/useHandleProductsWithCriterias";

type TableBodyRowProps = {
  criterion: TCriteria;
  products: TProduct[];
  rowIdx: number;
  weightTotal: number;
  maxWeight: number | null;
  updateCriteria: ReturnType<typeof useHandleCriterias>["updateCriteria"];
  removeCriteria: ReturnType<typeof useHandleCriterias>["removeCriteria"];
  setProductCriteriaValue: ReturnType<
    typeof useHandleProductsWithCriterias
  >["setProductCriteriaValue"];
};

const TableBodyRow = (props: TableBodyRowProps) => {
  return (
    <tr key={props.criterion.id}>
      {/*
       * CRITERIA - NAME / UNIT
       */}
      <CriterionNameUnitCell
        criterion={props.criterion}
        rowIdx={props.rowIdx}
        weightTotal={props.weightTotal}
        maxWeight={props.maxWeight}
        updateCriteria={props.updateCriteria}
        removeCriteria={props.removeCriteria}
      />

      {/*
       * CRITERIA - BENEFICIAL
       */}
      <CriterionBeneficialCell
        criterion={props.criterion}
        updateCriteria={props.updateCriteria}
      />

      {/*
       * CRITERIA - WEIGHT
       */}
      <CriterionWeightCell
        criterion={props.criterion}
        weightTotal={props.weightTotal}
        updateCriteria={props.updateCriteria}
      />

      {/*
       * PRODUCTS - CRITERIA VALUES
       */}
      {props.products.map((product, productColumnIdx) => {
        const criteriaProductValue =
          productsWithCriterias.find(
            ({ criteriaId, productId }) =>
              criteriaId === props.criterion.id && productId === product.id
          ) ?? createEmptyProductCriteriaValue(product, props.criterion);

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
