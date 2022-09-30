import { deepEqual, isDefined } from "../../../../../utils/objects";
import { useLayoutEffect, useRef, useState } from "react";

import { CRITERIA } from "../../../../../constants/criterias";
import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { clampCriteriaWeightValue } from "../../../../../utils/criterias/criterias";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionWeightCellProps = {
  criterion: TCriteria;
  weightTotal: number | null;
  updateCriteria: Function;
};

const CriterionWeightCell = (props: CriterionWeightCellProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cellId = `criterion-weight-${props.criterion.id}`;

  const [editMode, setEditMode] = useState(false);

  const defaultValue = props.criterion.weight ?? null;

  const [criterionNewWeight, setCriterionNewWeight] = useState<number | null>(
    defaultValue
  );

  /**
   * Forces focus on input when edit mode is true
   */
  useLayoutEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const handleClickOutsideCell = () => {
    if (editMode) {
      console.log(`[ Cell ] Clicked away from cell ${cellId}`);
      closeEditMode();
    }
  };

  useClickOutside(cellRef, handleClickOutsideCell);

  const applyChanges = () => {
    if (!deepEqual(criterionNewWeight, defaultValue)) {
      console.log("[ Cell ] Update criterion weight value:", {
        old: defaultValue,
        new: criterionNewWeight,
      });

      props.updateCriteria({
        ...props.criterion,
        weight: isDefined(criterionNewWeight)
          ? clampCriteriaWeightValue(criterionNewWeight)
          : undefined,
      });
    }
  };

  const handleClickOnCell = () => {
    if (!editMode) {
      console.log(`[ Cell ] Selected cell ${cellId}`);
      setEditMode(true);
      setCriterionNewWeight(defaultValue);
    }
  };

  const closeEditMode = (save = true) => {
    inputRef.current?.blur();
    if (save === true) {
      applyChanges();
    }
    setEditMode(false);
    setCriterionNewWeight(defaultValue);
  };

  return (
    <td
      ref={cellRef}
      style={DATA_TABLE_STYLES.TD.CRITERIA_WEIGHT}
      onClick={handleClickOnCell}
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
            min={CRITERIA.WEIGHT.MIN}
            max={CRITERIA.WEIGHT.MAX}
            value={
              isDefined(criterionNewWeight) &&
              typeof criterionNewWeight === "number" &&
              !isNaN(criterionNewWeight)
                ? criterionNewWeight
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              const newValue =
                isDefined(value) && !isNaN(parseFloat(value))
                  ? clampCriteriaWeightValue(Number(value))
                  : null;

              setCriterionNewWeight(newValue);
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
              width: "100%",
              padding: "7px 6px",
            }}
          />
        ) : (
          <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO_CONTAINER}>
            <div>
              {isDefined(props.criterion.weight) &&
              !isNaN(props.criterion.weight)
                ? props.criterion.weight
                : "-"}
            </div>
            <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
              {isDefined(props.criterion.weight) &&
              isDefined(props.weightTotal) &&
              !isNaN(props.criterion.weight)
                ? `(${(props.criterion.weight / props.weightTotal).toFixed(3)})`
                : ""}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default CriterionWeightCell;
