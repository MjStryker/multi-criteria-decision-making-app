import {
  capitalize,
  isValidNonEmptyString,
} from "../../../../../utils/strings";
import { useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { areDefined } from "../../../../../utils/objects";
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
  const cellRef = useRef(null);

  const [cellId, setCellId] = useState<string | null>(null);

  const [criterionNewName, setCriterionNewName] = useState<string | null>(
    isValidNonEmptyString(props.criterion.name) ? props.criterion.name : null
  );
  const [criterionNewUnit, setCriterionNewUnit] = useState<string | null>(
    isValidNonEmptyString(props.criterion.unit) ? props.criterion.unit : null
  );

  useClickOutside(cellRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCriterionNewName(null);
    setCriterionNewUnit(null);
  });

  const isCriteriaNameCellInEditMode = `${props.criterion.id}-name` === cellId;

  return (
    <td
      style={{
        ...DATA_TABLE_STYLES.TD.CRITERIA,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          ref={isCriteriaNameCellInEditMode ? cellRef : undefined}
          onClick={() => {
            if (isCriteriaNameCellInEditMode) {
              return;
            }
            console.log(`[ Cell ] Selected ${props.criterion.id}-name`);
            setCellId(`${props.criterion.id}-name`);
            setCriterionNewName(props.criterion.name ?? null);
            setCriterionNewUnit(props.criterion.unit ?? null);
          }}
          onBlur={() => {
            props.updateCriteria({
              ...props.criterion,
              name: `${criterionNewName}`,
              unit: `${criterionNewUnit}`,
            });
            // setCellId(null);
            // setCellValue(null);
            // setCellSecondaryValue(null);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            margin: -8,
            padding: isCriteriaNameCellInEditMode ? 0 : 8,
            width: "100%",
          }}
        >
          {isCriteriaNameCellInEditMode ? (
            <div style={{ display: "flex" }}>
              {/*
               * CRITERIA - NAME
               */}
              <input
                type="text"
                value={criterionNewName ? `${criterionNewName}` : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = value && value.length > 0 ? value : null;

                  setCriterionNewName(newValue);
                  props.updateCriteria({
                    ...props.criterion,
                    name: `${newValue}`,
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    props.updateCriteria({
                      ...props.criterion,
                      name: `${criterionNewName}`,
                    });
                    // setCellId(null);
                    // setCellValue(null);
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
                  const newValue = value && value.length > 0 ? value : null;

                  setCriterionNewUnit(newValue);
                  props.updateCriteria({
                    ...props.criterion,
                    unit: `${newValue}`,
                  });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    props.updateCriteria({
                      ...props.criterion,
                      unit: `${criterionNewUnit}`,
                    });
                    // setCellId(null);
                    // setCellSecondaryValue(null);
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

        {!isCriteriaNameCellInEditMode && (
          <button onClick={() => props.removeCriteria(props.criterion)}>
            -
          </button>
        )}
      </div>

      {!isCriteriaNameCellInEditMode && (
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
