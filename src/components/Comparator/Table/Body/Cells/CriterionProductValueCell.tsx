import { useLayoutEffect, useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { TProduct } from "../../../../../types/products";
import { TProductWithCriteria } from "../../../../../types/productsWithCriterias";
import { deepEqual } from "../../../../../utils/objects";
import { isValidNumber } from "../../../../../utils/numbers";
import { minWidth } from "../../../../../styles/tables/tableCell";
import { parseStringAsNumber } from "../../../../../utils/strings";
import useClickOutside from "../../../../../hooks/useClickOutside";
import useHandleProductsWithCriterias from "../../../../../hooks/data/useHandleProductsWithCriterias";

type CriterionProductValueCellProps = {
  criterion: TCriteria;
  product: TProduct;
  criteriaProductValue: TProductWithCriteria | null;
  setProductCriteriaValue: ReturnType<
    typeof useHandleProductsWithCriterias
  >["setProductCriteriaValue"];
};

const CriterionProductValueCell = (props: CriterionProductValueCellProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cellId = `value-${props.criteriaProductValue?.id}`;

  const [editMode, setEditMode] = useState(false);

  const defaultValue = props.criteriaProductValue?.value ?? null;

  const [criterionProductNewValue, setCriterionProductNewValue] =
    useState(defaultValue);

  const valueChanged = !deepEqual(criterionProductNewValue, defaultValue);

  /**
   * Forces focus on input when entering edit mode state
   */
  useLayoutEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const handleClickOnCell = () => {
    if (!editMode) {
      console.log(`[ Cell ] Selected cell ${cellId}`);
      setEditMode(true);
      setCriterionProductNewValue(defaultValue);
    }
  };

  const handleClickOutsideCell = () => {
    if (editMode) {
      console.log(`[ Cell ] Clicked away from cell ${cellId}`);
      applyChanges();
      closeEditMode();
    }
  };

  useClickOutside(cellRef, handleClickOutsideCell);

  const applyChanges = () => {
    if (valueChanged) {
      console.log("[ Cell ] Update value:", {
        old: { value: defaultValue },
        new: { value: criterionProductNewValue },
      });

      props.setProductCriteriaValue(
        props.product,
        props.criterion,
        criterionProductNewValue
      );
    }
  };

  const closeEditMode = () => {
    inputRef.current?.blur();
    setEditMode(false);
  };

  return (
    <td
      ref={cellRef}
      onClick={handleClickOnCell}
      style={DATA_TABLE_STYLES.TD.CELL_VALUE}
    >
      <div
        style={{
          margin: -8,
          padding: editMode ? 0 : 8,
          width: "100%",
        }}
      >
        {editMode ? (
          <input
            ref={inputRef}
            type="number"
            value={
              isValidNumber(criterionProductNewValue)
                ? criterionProductNewValue
                : ""
            }
            onChange={(e) =>
              setCriterionProductNewValue(parseStringAsNumber(e.target.value))
            }
            onKeyUp={(e) => {
              switch (e.key) {
                case "Enter":
                  applyChanges();
                  closeEditMode();
                  break;
                case "Escape":
                  if (valueChanged) {
                    console.log("[ Cell ] Abort changes:", {
                      current: defaultValue,
                      abort: criterionProductNewValue,
                    });
                    setCriterionProductNewValue(defaultValue);
                  }
                  closeEditMode();
                  break;
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
            <div>
              {isValidNumber(props.criteriaProductValue?.value)
                ? props.criteriaProductValue?.value
                : "-"}
            </div>
            {isValidNumber(props.criteriaProductValue?.weightedValue) ? (
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
