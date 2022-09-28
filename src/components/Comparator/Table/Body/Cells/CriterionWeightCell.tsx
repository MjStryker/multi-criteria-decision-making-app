import { useRef, useState } from "react";

import { CRITERIA } from "../../../../../constants/criterias";
import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { clampCriteriaWeightValue } from "../../../../../utils/criterias/criterias";
import { isDefined } from "../../../../../utils/objects";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionWeightCellProps = {
  criterion: TCriteria;
  weightTotal: number | null;
  updateCriteria: Function;
};

const CriterionWeightCell = (props: CriterionWeightCellProps) => {
  const cellRef = useRef(null);

  const [cellId, setCellId] = useState<string | null>(null);

  const [criterionNewWeight, setCriterionNewWeight] = useState<number | null>(
    isDefined(props.criterion.weight) ? props.criterion.weight : null
  );

  useClickOutside(cellRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCriterionNewWeight(null);
  });

  const isCriteriaWeightCellInEditMode =
    `${props.criterion.id}-weight` === cellId;

  return (
    <td style={DATA_TABLE_STYLES.TD.CRITERIA_WEIGHT}>
      <div
        ref={isCriteriaWeightCellInEditMode ? cellRef : undefined}
        onClick={() => {
          if (isCriteriaWeightCellInEditMode) {
            return;
          }
          console.log(`[ Cell ] Selected ${props.criterion.id}-weight`);
          setCellId(`${props.criterion.id}-weight`);
          setCriterionNewWeight(props.criterion.weight ?? null);
        }}
        onBlur={() => {
          props.updateCriteria({
            ...props.criterion,
            weight: isDefined(criterionNewWeight)
              ? clampCriteriaWeightValue(criterionNewWeight)
              : undefined,
          });
          setCellId(null);
          setCriterionNewWeight(null);
        }}
        style={{
          margin: -8,
          padding: isCriteriaWeightCellInEditMode ? 0 : 8,
          width: "100%",
        }}
      >
        {isCriteriaWeightCellInEditMode ? (
          <input
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
                value && value.length > 0
                  ? clampCriteriaWeightValue(Number(value))
                  : null;

              setCriterionNewWeight(newValue);
              props.updateCriteria({
                ...props.criterion,
                weight: newValue ?? undefined,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                props.updateCriteria({
                  ...props.criterion,
                  weight: clampCriteriaWeightValue(Number(criterionNewWeight)),
                });
                setCellId(null);
                setCriterionNewWeight(null);
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
