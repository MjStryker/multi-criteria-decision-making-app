import {
  capitalize,
  isValidNonEmptyString,
} from "../../../../../utils/strings";
import { useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriterion } from "../../../../../types/criteria";
import { deepEqual } from "../../../../../utils/objects";
import { getCriterionWeightRelativeToMax } from "../../../../../utils/criteria/criteria";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionNameUnitCellProps = {
  criterion: TCriterion;
  rowIdx: number;
  maxWeight: number;
  updateCriterion: Function;
  removeCriterion: Function;
};

const CriterionNameUnitCell = (props: CriterionNameUnitCellProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const cellId = `criterion-name-unit-${props.criterion.id}`;

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputUnitRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState(false);

  const defaultCriterionName = isValidNonEmptyString(props.criterion.name)
    ? props.criterion.name
    : null;

  const defaultCriterionUnit = isValidNonEmptyString(props.criterion.unit)
    ? props.criterion.unit
    : null;

  const [criterionNewName, setCriterionNewName] = useState<string | null>(
    defaultCriterionName
  );
  const [criterionNewUnit, setCriterionNewUnit] = useState<string | null>(
    defaultCriterionUnit
  );

  const criterionNameChanged = !deepEqual(
    criterionNewName,
    defaultCriterionName
  );
  const criterionUnitChanged = !deepEqual(
    criterionNewUnit,
    defaultCriterionUnit
  );

  const handleClickOnCell = () => {
    if (!editMode) {
      console.log(`[ Cell ] Selected cell ${cellId}`);
      setEditMode(true);
      setCriterionNewName(defaultCriterionName);
      setCriterionNewUnit(defaultCriterionUnit);
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

  const closeEditMode = () => {
    setEditMode(false);
  };

  const applyChanges = () => {
    criterionNameChanged && applyNameChanges();
    criterionUnitChanged && applyUnitChanges();
  };

  const applyNameChanges = () => {
    if (criterionNameChanged) {
      console.log("[ Cell ] Update name:", {
        old: defaultCriterionName,
        new: criterionNewName,
      });

      props.updateCriterion({
        ...props.criterion,
        name: criterionNewName,
      });
    }
  };

  const applyUnitChanges = () => {
    if (criterionUnitChanged) {
      console.log("[ Cell ] Update unit:", {
        old: defaultCriterionName,
        new: criterionNewName,
      });

      props.updateCriterion({
        ...props.criterion,
        unit: criterionNewUnit,
      });
    }
  };

  return (
    <td
      ref={cellRef}
      onClick={handleClickOnCell}
      style={{
        ...DATA_TABLE_STYLES.TD.CRITERION,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              marginRight: editMode ? 0 : 8,
              padding: 8,
              fontSize: "12px",
              color: "#5a5a5a",
              backgroundColor: "rgba(0, 0, 0, 0.02",
            }}
          >
            {props.criterion.defaultRowIdx}
          </div>

          <div
            style={{
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              height: "100%",
              zIndex: 2,
            }}
          >
            {editMode ? (
              <>
                {/*
                 * CRITERION - NAME
                 */}
                <input
                  ref={inputNameRef}
                  type="text"
                  value={
                    isValidNonEmptyString(criterionNewName)
                      ? criterionNewName
                      : ""
                  }
                  onChange={(e) =>
                    setCriterionNewName(
                      isValidNonEmptyString(e.target.value)
                        ? e.target.value
                        : null
                    )
                  }
                  onKeyUp={(e) => {
                    switch (e.key) {
                      case "Enter":
                        inputNameRef.current?.blur();
                        break;
                      case "Escape":
                        if (criterionNameChanged) {
                          console.log("[ Cell ] Abort changes:", {
                            current: defaultCriterionName,
                            abort: criterionNewName,
                          });
                          setCriterionNewName(defaultCriterionName);
                        }
                        inputNameRef.current?.blur();
                        break;
                    }
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    padding: "7px 6px",
                    maxWidth: 180,
                  }}
                />
                {/*
                 * CRITERION - UNIT
                 */}
                <input
                  ref={inputUnitRef}
                  type="text"
                  value={
                    isValidNonEmptyString(criterionNewUnit)
                      ? criterionNewUnit
                      : ""
                  }
                  onChange={(e) =>
                    setCriterionNewUnit(
                      isValidNonEmptyString(e.target.value)
                        ? e.target.value
                        : null
                    )
                  }
                  onKeyUp={(e) => {
                    switch (e.key) {
                      case "Enter":
                        inputUnitRef.current?.blur();
                        break;
                      case "Escape":
                        if (criterionUnitChanged) {
                          console.log("[ Cell ] Abort changes:", {
                            current: defaultCriterionUnit,
                            abort: criterionNewUnit,
                          });
                          setCriterionNewUnit(defaultCriterionUnit);
                        }
                        inputUnitRef.current?.blur();
                        break;
                    }
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    maxWidth: 60,
                    padding: "7px 6px",
                  }}
                />
              </>
            ) : (
              <div style={{ marginRight: 8 }}>
                {props.criterion.name
                  ? capitalize(props.criterion.name)
                  : `Critère ${props.rowIdx + 1}`}{" "}
                {props.criterion.unit && `(${props.criterion.unit})`}
              </div>
            )}
          </div>
        </div>

        {!editMode && (
          <button
            onClick={() => props.removeCriterion(props.criterion)}
            style={{ zIndex: 2 }}
          >
            -
          </button>
        )}
      </div>

      {!editMode && (
        <div
          className="CriterionWeightBarWrapper"
          style={{
            position: "absolute",
            left: 0,
            bottom: -5,
            width: "100%",
            boxSizing: "border-box",
            zIndex: 1,
          }}
        >
          <progress
            className="CriterionWeightBar"
            max="100"
            value={getCriterionWeightRelativeToMax(
              props.criterion.weight,
              props.maxWeight
            )}
            style={{ width: "100%", height: 7 }}
          />
        </div>
      )}
    </td>
  );
};

export default CriterionNameUnitCell;
