import { deepEqual, isDefined } from "../../../../../utils/objects";
import { useLayoutEffect, useRef, useState } from "react";

import { CRITERION } from "../../../../../constants/criteria";
import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriterion } from "../../../../../types/criteria";
import { clampCriterionWeightValue } from "../../../../../utils/criteria/criteria";
import { isValidNumber } from "../../../../../utils/numbers";
import { parseStringAsNumber } from "../../../../../utils/strings";
import useClickOutside from "../../../../../hooks/useClickOutside";
import useHandleCriteria from "../../../../../hooks/data/useHandleCriteria";

type CriterionWeightCellProps = {
  criterion: TCriterion;
  weightTotal: number | null;
  updateCriterion: ReturnType<typeof useHandleCriteria>["updateCriterion"];
};

const CriterionWeightCell = (props: CriterionWeightCellProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cellId = `criterion-weight-${props.criterion.id}`;

  const [editMode, setEditMode] = useState(false);

  const currentWeightValue = props.criterion.weight ?? null;

  const [criterionNewWeight, setCriterionNewWeight] =
    useState(currentWeightValue);

  const weightChanged = !deepEqual(criterionNewWeight, currentWeightValue);

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
      setCriterionNewWeight(currentWeightValue);
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
        old: { weight: currentWeightValue },
        new: { weight: criterionNewWeight },
      });

      props.updateCriterion({
        ...props.criterion,
        weight: isDefined(criterionNewWeight)
          ? clampCriterionWeightValue(criterionNewWeight)
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
      style={DATA_TABLE_STYLES.TD.CRITERION_WEIGHT}
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
            min={CRITERION.WEIGHT.MIN}
            max={CRITERION.WEIGHT.MAX}
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
                      current: { weight: currentWeightValue },
                      abort: { weight: criterionNewWeight },
                    });
                    setCriterionNewWeight(currentWeightValue);
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
              {isValidNumber(currentWeightValue) ? currentWeightValue : "-"}
            </div>
            <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
              {isValidNumber(currentWeightValue) &&
              isValidNumber(props.weightTotal)
                ? `(${(currentWeightValue / props.weightTotal).toFixed(3)})`
                : null}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default CriterionWeightCell;
