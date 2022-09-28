import CriterionBeneficialCell from "./Cells/CriterionBeneficialCell";
import CriterionNameUnitCell from "./Cells/CriterionNameUnitCell";
import CriterionWeightCell from "./Cells/CriterionWeightCell";
import { DATA_TABLE_STYLES } from "../../DataTable.styles";
import { TCriteria } from "../../../../types/criterias";
import { TProduct } from "../../../../types/products";
import { createEmptyProductCriteriaValue } from "../../../../utils/productsWithCriterias/productsWithCriterias";
import { isDefined } from "../../../../utils/objects";
import { minWidth } from "../../../../styles/tables/tableCell";
import productsWithCriterias from "../../../../data/cordlessVacuumCleaner/productsWithCriterias";

type TableBodyRowProps = {
  criterion: TCriteria;
  products: TProduct[];
  rowIdx: number;
  weightTotal: number;
  maxWeight: number | null;
  updateCriteria: Function;
  removeCriteria: Function;
  setProductCriteriaValue: Function;
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
      {props.products.map((p, productColumnIdx) => {
        const v =
          productsWithCriterias.find(
            ({ criteriaId, productId }) =>
              criteriaId === props.criterion.id && productId === p.id
          ) ?? createEmptyProductCriteriaValue(p, props.criterion);

        const isCellInEditMode = v.id === cellId;

        const value =
          isDefined(v.value) && !isNaN(v.value) ? Number(v.value) : null;

        return (
          <td key={v.id} style={DATA_TABLE_STYLES.TD.CELL_VALUE}>
            <div
              ref={isCellInEditMode ? inputRef : undefined}
              onClick={() => {
                if (isCellInEditMode) {
                  return;
                }
                console.log(`[ Cell ] Selected ${v.id}`);
                setCellId(v.id);
                setCellValue(v.value ?? null);
              }}
              onBlur={() => {
                props.setProductCriteriaValue(
                  p,
                  props.criterion,
                  Number(cellValue)
                );
                setCellId(null);
                setCellValue(null);
              }}
              style={{
                margin: -8,
                padding: isCellInEditMode ? 0 : 8,
              }}
            >
              {isCellInEditMode ? (
                <input
                  type="number"
                  value={
                    isDefined(cellValue) &&
                    typeof cellValue === "number" &&
                    !isNaN(cellValue)
                      ? cellValue
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    const newValue =
                      value && value.length > 0 ? Number(value) : null;

                    setCellValue(newValue);
                    props.setProductCriteriaValue(p, props.criterion, newValue);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      props.setProductCriteriaValue(
                        p,
                        props.criterion,
                        Number(cellValue)
                      );
                      setCellId(null);
                      setCellValue(null);
                    }
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    width: minWidth,
                    padding: "7px 6px",
                  }}
                />
              ) : (
                <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO_CONTAINER}>
                  <div>{value ?? "-"}</div>
                  {isDefined(v.weightedValue) ? (
                    <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
                      ({v.weightedValue?.toFixed(3) ?? "-"})
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
};

export default TableBodyRow;
