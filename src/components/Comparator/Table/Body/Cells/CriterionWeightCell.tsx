import { deepEqual, isDefined } from "../../../../../utils/objects";
import { useLayoutEffect, useRef, useState } from "react";

import { CRITERIA } from "../../../../../constants/criterias";
import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { clampCriteriaWeightValue } from "../../../../../utils/criterias/criterias";
import { isValidNumber } from "../../../../../utils/numbers";
import { parseStringAsNumber } from "../../../../../utils/strings";
import useClickOutside from "../../../../../hooks/useClickOutside";
import useHandleCriterias from "../../../../../hooks/data/useHandleCriterias";

type CriterionWeightCellProps = {
  criterion: TCriteria;
  weightTotal: number | null;
  updateCriteria: ReturnType<typeof useHandleCriterias>["updateCriteria"];
};

const CriterionWeightCell = (props: CriterionWeightCellProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cellId = `criterion-weight-${props.criterion.id}`;

  const [editMode, setEditMode] = useState(false);

  const defaultValue = props.criterion.weight ?? null;

  const [criterionNewWeight, setCriterionNewWeight] = useState(defaultValue);

  const weightChanged = !deepEqual(criterionNewWeight, defaultValue);

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
      setCriterionNewWeight(defaultValue);
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
    if (weightChanged) {
      console.log("[ Cell ] Update value:", {
        criterion: props.criterion,
        old: { weight: defaultValue },
        new: { weight: criterionNewWeight },
      });

      props.updateCriteria({
        ...props.criterion,
        weight: isDefined(criterionNewWeight)
          ? clampCriteriaWeightValue(criterionNewWeight)
          : undefined,
      });
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
      style={DATA_TABLE_STYLES.TD.CRITERIA_WEIGHT}
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
            value={isValidNumber(criterionNewWeight) ? criterionNewWeight : ""}
            onChange={(e) =>
              setCriterionNewWeight(parseStringAsNumber(e.target.value))
            }
            onKeyUp={(e) => {
              switch (e.key) {
                case "Enter":
                  applyChanges();
                  closeEditMode();
                  break;
                case "Escape":
                  if (weightChanged) {
                    console.log("[ Cell ] Abort changes:", {
                      criterion: props.criterion,
                      current: { weight: defaultValue },
                      abort: { weight: criterionNewWeight },
                    });
                    setCriterionNewWeight(defaultValue);
                  }
                  closeEditMode();
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
              {isValidNumber(props.criterion.weight)
                ? props.criterion.weight
                : "-"}
            </div>
            <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
              {isValidNumber(props.criterion.weight) &&
              isValidNumber(props.weightTotal)
                ? `(${(props.criterion.weight / props.weightTotal).toFixed(3)})`
                : null}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default CriterionWeightCell;
