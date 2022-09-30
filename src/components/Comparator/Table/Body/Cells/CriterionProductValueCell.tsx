import { deepEqual, isDefined } from "../../../../../utils/objects";
import { useLayoutEffect, useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { TProduct } from "../../../../../types/products";
import { TProductWithCriteria } from "../../../../../types/productsWithCriterias";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const cellId = props.criteriaProductValue?.id;

  const [editMode, setEditMode] = useState(false);

  const defaultValue = props.criteriaProductValue?.value ?? null;

  const [criterionProductNewValue, setCriterionProductNewValue] = useState<
    number | null
  >(defaultValue);

  const handleClickOutsideCell = () => {
    if (editMode) {
      console.log(`[ Cell ] Clicked away from ${cellId}`);
      closeEditMode();
    }
  };

  useClickOutside(cellRef, handleClickOutsideCell);

  /**
   * Forces focus on input when edit mode is true
   */
  useLayoutEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const applyChanges = () => {
    if (!deepEqual(criterionProductNewValue, defaultValue)) {
      console.log("[ Cell ] Update value:", {
        old: defaultValue,
        new: criterionProductNewValue,
      });

      props.setProductCriteriaValue(
        props.product,
        props.criterion,
        criterionProductNewValue
      );
    }
  };

  const handleClickOnCell = () => {
    if (!editMode) {
      console.log(`[ Cell ] Selected ${cellId}`);
      setEditMode(true);
      setCriterionProductNewValue(defaultValue);
    }
  };

  const closeEditMode = (save = true) => {
    inputRef.current?.blur();
    if (save === true) {
      applyChanges();
    }
    setEditMode(false);
    setCriterionProductNewValue(defaultValue);
  };

  return (
    <td
      ref={cellRef}
      style={DATA_TABLE_STYLES.TD.CELL_VALUE}
      onClick={handleClickOnCell}
    >
      <div
        style={{
          margin: -8,
          padding: editMode ? 0 : 8,
        }}
      >
        {editMode ? (
          <input
            ref={inputRef}
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
            }}
            onKeyUp={(e) => {
              switch (e.key) {
                case "Enter":
                  closeEditMode();
                  break;
                case "Escape":
                  closeEditMode(false);
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
