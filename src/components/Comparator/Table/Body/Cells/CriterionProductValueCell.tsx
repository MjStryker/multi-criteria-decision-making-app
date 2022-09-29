import { useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { TProduct } from "../../../../../types/products";
import { TProductWithCriteria } from "../../../../../types/productsWithCriterias";
import { isDefined } from "../../../../../utils/objects";
import { minWidth } from "../../../../../styles/tables/tableCell";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionProductValueCellProps = {
  criterion: TCriteria;
  product: TProduct;
  criteriaProductValue: TProductWithCriteria | null;
  setProductCriteriaValue: Function;
};

const CriterionProductValueCell = (props: CriterionProductValueCellProps) => {
  const cellRef = useRef(null);

  const [cellId, setCellId] = useState<string | null>(null);

  const [criterionProductNewValue, setCriterionProductNewValue] = useState<
    number | null
  >(props.criteriaProductValue?.value ?? null);

  useClickOutside(cellRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCriterionProductNewValue(null);
  });

  const isCellInEditMode = props.criteriaProductValue?.id === cellId;

  return (
    <td style={DATA_TABLE_STYLES.TD.CELL_VALUE}>
      <div
        ref={isCellInEditMode ? cellRef : undefined}
        onClick={() => {
          if (isCellInEditMode) {
            return;
          }
          console.log(`[ Cell ] Selected ${props.criteriaProductValue?.id}`);
          setCellId(props.criteriaProductValue?.id ?? "default");
          setCriterionProductNewValue(
            props.criteriaProductValue?.value ?? null
          );
        }}
        onBlur={() => {
          props.setProductCriteriaValue(
            props.product,
            props.criterion,
            criterionProductNewValue
          );
          setCellId(null);
          setCriterionProductNewValue(null);
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
              isDefined(criterionProductNewValue) &&
              typeof criterionProductNewValue === "number" &&
              !isNaN(criterionProductNewValue)
                ? criterionProductNewValue
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              const newValue =
                isDefined(value) && !isNaN(parseFloat(value))
                  ? parseFloat(value)
                  : null;

              setCriterionProductNewValue(newValue);
              props.setProductCriteriaValue(
                props.product,
                props.criterion,
                newValue
              );
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                props.setProductCriteriaValue(
                  props.product,
                  props.criterion,
                  criterionProductNewValue
                );
                setCellId(null);
                setCriterionProductNewValue(null);
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
            <div>{props.criteriaProductValue?.value ?? "-"}</div>
            {isDefined(props.criteriaProductValue?.weightedValue) ? (
              <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
                ({props.criteriaProductValue?.weightedValue?.toFixed(3) ?? "-"})
              </div>
            ) : null}
          </div>
        )}
      </div>
    </td>
  );
};

export default CriterionProductValueCell;
