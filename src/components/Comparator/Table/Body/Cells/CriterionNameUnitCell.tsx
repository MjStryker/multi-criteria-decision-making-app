import {
  Box,
  Flex,
  HStack,
  Progress,
  Td,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import {
  capitalize,
  isValidNonEmptyString,
} from "../../../../../utils/strings";

import EditCriterionButton from "./EditCriterionButton";
import { TCriterion } from "../../../../../types/criteria";
import { getCriterionWeightRelativeToMax } from "../../../../../utils/criteria/criteria";
import { useHandleCriteriaFunctions } from "../../../../../hooks/data/useHandleCriteria";

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
  return (
    <Td position="relative" pl={0} pr={2} w="260px">
      <HStack justifyContent="space-between">
        {!isValidNonEmptyString(criterion.name) ? (
          <Text>
            {criterion.name
              ? capitalize(criterion.name)
              : `Critère ${rowIdx + 1}`}{" "}
            {criterion.unit && `(${criterion.unit})`}
          </Text>
        ) : (
          <Flex alignItems="center">
            {/*
             * -- Name
             */}
            <Text whiteSpace="break-spaces" wordBreak="break-word">
              {capitalize(criterion.name)}
            </Text>

            {/*
             * -- Unit
             */}
            {isValidNonEmptyString(criterion.unit) ? (
              <Text fontSize="0.75rem" color="gray.500" ml={1}>
                ({criterion.unit})
              </Text>
            ) : null}
          </Flex>
        )}

        {/*
         * -- Edit
         */}
        <EditCriterionButton
          criterion={criterion}
          updateCriterion={updateCriterion}
          removeCriterion={removeCriterion}
        />
      </HStack>

      <Box
        className="CriterionWeightBarWrapper"
        position="absolute"
        left={0}
        bottom={0}
        pr={2}
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
