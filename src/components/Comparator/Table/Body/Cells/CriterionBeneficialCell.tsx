import { deepEqual, isDefined } from "../../../../../utils/objects";
import { useRef, useState } from "react";

import { DATA_TABLE_STYLES } from "../../../DataTable.styles";
import { TCriterion } from "../../../../../types/criteria";
import useClickOutside from "../../../../../hooks/useClickOutside";

type CriterionBeneficialCellProps = {
  criterion: TCriterion;
  updateCriterion: Function;
};

const CriterionBeneficialCell = (props: CriterionBeneficialCellProps) => {
  const cellRef = useRef(null);

  const cellId = `criterion-beneficial-${props.criterion.id}`;

  const [editMode, setEditMode] = useState(false);

  const currentBeneficialValue = isDefined(props.criterion.beneficial)
    ? props.criterion.beneficial
    : null;

  const [criterionNewBeneficial, setCriterionNewBeneficial] = useState(
    currentBeneficialValue
  );

  const beneficialChanged = !deepEqual(
    criterionNewBeneficial,
    currentBeneficialValue
  );

  const handleClickOnCell = () => {
    if (!editMode) {
      console.log(`[ Cell ] Selected cell ${cellId}`);
      setEditMode(true);
      setCriterionNewBeneficial(currentBeneficialValue);
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
    if (beneficialChanged) {
      console.log("[ Cell ] Update value:", {
        criterion: props.criterion,
        old: { beneficial: currentBeneficialValue },
        new: { beneficial: criterionNewBeneficial },
      });

      props.updateCriterion({
        ...props.criterion,
        beneficial: criterionNewBeneficial === true,
      });
    }
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  return (
    <td
      ref={cellRef}
      onClick={handleClickOnCell}
      style={DATA_TABLE_STYLES.TD.CRITERION_BENEFICIAL}
    >
      <div
        style={{
          ...DATA_TABLE_STYLES.INPUT.TEXT,
          width: "100%",
          margin: -8,
          padding: 8,
        }}
      >
        {editMode ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 4, fontSize: 14 }}>
              B??n??fique (
              {criterionNewBeneficial === true
                ? "oui"
                : criterionNewBeneficial === false
                ? "non"
                : "??"}
              )
            </div>
            <input
              type="checkbox"
              checked={criterionNewBeneficial === true}
              onChange={(e) => setCriterionNewBeneficial(e.target.checked)}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            {currentBeneficialValue === true
              ? "+"
              : currentBeneficialValue === false
              ? "-"
              : "??"}
          </div>
        )}
      </div>
    </td>
  );
};

export default CriterionBeneficialCell;
