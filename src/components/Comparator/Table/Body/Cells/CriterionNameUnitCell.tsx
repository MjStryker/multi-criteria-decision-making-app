import { Box, Flex, HStack, Progress, Td, Text } from "@chakra-ui/react";
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
  const hasName = isValidNonEmptyString(criterion.name);

  const defaultName = `Critère ${rowIdx + 1}`;

  return (
    <Td
      position="relative"
      pl={2}
      pr={1}
      minW="240px"
      maxW="240px"
      border="1px"
      borderColor="gray.100"
    >
      <HStack justifyContent="space-between">
        <Flex flex={1} alignItems="center" justifyContent="space-between">
          {/*
           * -- Name
           */}
          <Text
            whiteSpace="break-spaces"
            wordBreak="break-word"
            fontWeight="semibold"
          >
            {!hasName ? defaultName : capitalize(criterion.name)}
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
        bottom="-2.4px"
        width="100%"
        pl={2}
        pr={1}
        boxSizing="border-box"
        zIndex="auto"
      >
        <Progress
          size="xs"
          borderRadius="base"
          colorScheme={criterion.beneficial === false ? "orange" : "blue"}
          value={getCriterionWeightRelativeToMax(criterion.weight, maxWeight)}
          opacity={0.7}
          sx={{
            "& > div": {
              transition: "width .5s ease-in-out",
            },
          }}
        />
      </Box>
    </Td>
  );
};

export default CriterionNameUnitCell;
