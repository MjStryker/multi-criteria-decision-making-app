import { useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriteria } from "../../../../../types/criterias";
import { isDefined } from "../../../../../utils/objects";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionBeneficialCellProps = {
  criterion: TCriteria;
  updateCriteria: Function;
};

const CriterionBeneficialCell = (props: CriterionBeneficialCellProps) => {
  const cellRef = useRef(null);

  const [cellId, setCellId] = useState<string | null>(null);

  const [criterionNewBeneficial, setCriterionNewBeneficial] = useState<
    boolean | null
  >(isDefined(props.criterion.beneficial) ? props.criterion.beneficial : null);

  useClickOutside(cellRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCriterionNewBeneficial(null);
  });

  const isCriteriaBeneficialCellInEditMode =
    `${props.criterion.id}-beneficial` === cellId;

  return (
    <td style={DATA_TABLE_STYLES.TD.CRITERIA_BENEFICIAL}>
      <div
        ref={isCriteriaBeneficialCellInEditMode ? cellRef : undefined}
        onClick={() => {
          if (isCriteriaBeneficialCellInEditMode) {
            return;
          }
          console.log(`[ Cell ] Selected ${props.criterion.id}-beneficial`);
          setCellId(`${props.criterion.id}-beneficial`);
          setCriterionNewBeneficial(props.criterion.beneficial ?? null);
        }}
        onBlur={() => {
          props.updateCriteria({
            ...props.criterion,
            beneficial: criterionNewBeneficial === true,
          });
          setCellId(null);
          setCriterionNewBeneficial(null);
        }}
        style={{
          ...DATA_TABLE_STYLES.INPUT.TEXT,
          width: "100%",
          margin: -8,
          padding: 8,
        }}
      >
        {isCriteriaBeneficialCellInEditMode ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 4, fontSize: 14 }}>
              Bénéfique (
              {props.criterion.beneficial === true
                ? "oui"
                : props.criterion.beneficial === false
                ? "non"
                : "??"}
              )
            </div>
            <input
              type="checkbox"
              checked={props.criterion.beneficial === true}
              onChange={(e) => {
                const checked = e.target.checked;

                setCriterionNewBeneficial(checked);
                props.updateCriteria({
                  ...props.criterion,
                  beneficial: checked,
                });
              }}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            {props.criterion.beneficial === true
              ? "+"
              : props.criterion.beneficial === false
              ? "-"
              : "??"}
          </div>
        )}
      </div>
    </td>
  );
};

export default CriterionBeneficialCell;
