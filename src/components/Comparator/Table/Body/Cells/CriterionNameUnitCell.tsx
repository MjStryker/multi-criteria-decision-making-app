import { Box, HStack, Progress, Td, Text } from "@chakra-ui/react";
import {
  capitalize,
  isValidNonEmptyString,
} from "../../../../../utils/strings";

import { TCriterion } from "../../../../../types/criteria";
import { getCriterionWeightRelativeToMax } from "../../../../../utils/criteria/criteria";
import { useHandleCriteriaFunctions } from "../../../../../hooks/data/useHandleCriteria";
import { useState } from "react";

type CriterionNameUnitCellProps = {
  criterion: TCriterion;
  rowIdx: number;
  maxWeight: number;
  updateCriterion: useHandleCriteriaFunctions["updateCriterion"];
  removeCriterion: useHandleCriteriaFunctions["removeCriterion"];
};

const CriterionNameUnitCell = ({
  criterion,
  rowIdx,
  maxWeight,
  updateCriterion,
  removeCriterion,
}: CriterionNameUnitCellProps) => {
  const defaultCriterionName = isValidNonEmptyString(criterion.name)
    ? criterion.name
    : null;

  const defaultCriterionUnit = isValidNonEmptyString(criterion.unit)
    ? criterion.unit
    : null;

  const [criterionName, setCriterionName] = useState<string | null>(
    defaultCriterionName
  );
  const [criterionUnit, setCriterionUnit] = useState<string | null>(
    defaultCriterionUnit
  );

  return (
    <Td position="relative">
      <HStack>
        <Text>{criterion.name}</Text>
        {isValidNonEmptyString(criterion.unit) ? `(${criterion.unit})` : null}
      </HStack>

      {/* <Input
        type="text"
        value={isValidNonEmptyString(criterionNewName) ? criterionNewName : ""}
        onChange={(e) =>
          setCriterionNewName(
            isValidNonEmptyString(e.target.value) ? e.target.value : null
          )
        }
      /> */}

      {/* <Input
        type="text"
        value={isValidNonEmptyString(criterionNewUnit) ? criterionNewUnit : ""}
        onChange={(e) =>
          setCriterionNewUnit(
            isValidNonEmptyString(e.target.value) ? e.target.value : null
          )
        }
      /> */}

      {/* <div>
        {criterion.name ? capitalize(criterion.name) : `Critère ${rowIdx + 1}`}{" "}
        {criterion.unit && `(${criterion.unit})`}
      </div> */}

      <Box
        className="CriterionWeightBarWrapper"
        position="absolute"
        left={0}
        bottom={0}
        width="100%"
        boxSizing="border-box"
        zIndex="auto"
      >
        <Progress
          size="xs"
          value={getCriterionWeightRelativeToMax(criterion.weight, maxWeight)}
        />
      </Box>
    </Td>
  );
};

export default CriterionNameUnitCell;
