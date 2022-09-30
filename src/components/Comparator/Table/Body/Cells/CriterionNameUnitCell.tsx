import { areDefined, deepEqual } from "../../../../../utils/objects";
import {
  capitalize,
  isValidNonEmptyString,
} from "../../../../../utils/strings";
import { useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionNameUnitCellProps = {
  criterion: TCriteria;
  rowIdx: number;
  weightTotal: number;
  maxWeight: number | null;
  updateCriteria: Function;
  removeCriteria: Function;
};

const CriterionNameUnitCell = (props: CriterionNameUnitCellProps) => {
  const cellRef = useRef<HTMLTableCellElement>(null);

  const cellId = `criterion-name-unit-${props.criterion.id}`;

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

  const handleClickOutsideCell = () => {
    if (editMode) {
      console.log(`[ Cell ] Clicked away from cell ${cellId}`);
      closeEditMode();
    }
  };

  useClickOutside(cellRef, handleClickOutsideCell);

  const applyNameChanges = () => {
    if (!deepEqual(criterionNewName, defaultCriterionName)) {
      console.log("[ Cell ] Update name:", {
        old: defaultCriterionName,
        new: criterionNewName,
      });

      props.updateCriteria({
        ...props.criterion,
        name: `${criterionNewName}`,
      });
    }
  };

  const applyUnitChanges = () => {
    if (!deepEqual(criterionNewUnit, defaultCriterionUnit)) {
      console.log("[ Cell ] Update unit:", {
        old: defaultCriterionName,
        new: criterionNewName,
      });

      props.updateCriteria({
        ...props.criterion,
        unit: `${criterionNewUnit}`,
      });
    }
  };

  const handleClickOnCell = () => {
    if (!editMode) {
      console.log(`[ Cell ] Selected cell ${cellId}`);
      setEditMode(true);
      setCriterionNewName(defaultCriterionName);
      setCriterionNewUnit(defaultCriterionUnit);
    }
  };

  const closeEditMode = () => {
    setEditMode(false);
    setCriterionNewName(defaultCriterionName);
    setCriterionNewUnit(defaultCriterionUnit);
  };

  return (
    <td
      ref={cellRef}
      style={{
        ...DATA_TABLE_STYLES.TD.CRITERIA,
        position: "relative",
      }}
      onClick={handleClickOnCell}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: -8,
            padding: editMode ? 0 : 8,
            width: "100%",
          }}
        >
          {editMode ? (
            <div style={{ display: "flex" }}>
              {/*
               * CRITERIA - NAME
               */}
              <input
                type="text"
                value={criterionNewName ? `${criterionNewName}` : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = isValidNonEmptyString(value) ? value : null;

                  setCriterionNewName(newValue);
                }}
                onKeyUp={(e) => {
                  switch (e.key) {
                    case "Enter":
                      applyNameChanges();
                      break;
                    case "Escape":
                      break;
                  }
                }}
                style={{
                  ...DATA_TABLE_STYLES.INPUT.TEXT,
                  padding: "7px 6px",
                }}
              />
              {/*
               * CRITERIA - UNIT
               */}
              <input
                type="text"
                value={criterionNewUnit ? `${criterionNewUnit}` : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = isValidNonEmptyString(value) ? value : null;

                  setCriterionNewUnit(newValue);
                }}
                onKeyUp={(e) => {
                  switch (e.key) {
                    case "Enter":
                      applyUnitChanges();
                      break;
                    case "Escape":
                      break;
                  }
                }}
                style={{
                  ...DATA_TABLE_STYLES.INPUT.TEXT,
                  maxWidth: 60,
                  padding: "7px 6px",
                }}
              />
            </div>
          ) : (
            <div style={{ marginRight: 8 }}>
              {props.criterion.name
                ? capitalize(props.criterion.name)
                : `Critère ${props.rowIdx + 1}`}{" "}
              {props.criterion.unit && `(${props.criterion.unit})`}
            </div>
          )}
        </div>

        {!editMode && (
          <button onClick={() => props.removeCriteria(props.criterion)}>
            -
          </button>
        )}
      </div>

      {!editMode && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -5,
            width: "100%",
            padding: "0 8px",
            boxSizing: "border-box",
          }}
        >
          <progress
            max="100"
            value={
              areDefined([props.maxWeight, props.criterion.weight])
                ? (((props.criterion.weight ?? 1) / props.weightTotal) * 100) /
                  (props.maxWeight ?? 1)
                : 0
            }
            style={{ width: "100%", height: 7 }}
          />
        </div>
      )}
    </td>
  );
};

export default CriterionNameUnitCell;
