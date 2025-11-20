import { Box, Flex, HStack, Progress, Text } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtomValue } from "jotai";

import { capitalize, isValidNotEmptyString } from "@/@Shared/@Utils/String";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { getCriterionWeightRelativeToMax } from "@/utils/criteria/criteria";
import { CELL_HEIGHT, Cell, CRITERION_CELL_WIDTH } from "../../Cell";
import EditCriterionButton from "./EditCriterionButton";

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
  rowIdx: number;
  maxWeight: number;
};

export default function CriterionNameUnitCell({
  criterionAtom,
  rowIdx,
  maxWeight
}: Props) {
  const criterion = useAtomValue(criterionAtom);

  return (
    <Cell>
      <HStack
        position="relative"
        w={CRITERION_CELL_WIDTH}
        h={CELL_HEIGHT}
        px={2}
        justifyContent="space-between"
      >
        <Flex flex={1} alignItems="center" justifyContent="space-between">
          {/*
           * -- Name / Uuid
           */}
          <Box>
            <Text
              whiteSpace="break-spaces"
              wordBreak="break-word"
              fontWeight="semibold"
              {...(!isValidNotEmptyString(criterion.name) && {
                fontStyle: "italic",
                fontWeight: "medium",
                color: "gray.600"
              })}
            >
              {isValidNotEmptyString(criterion.name)
                ? capitalize(criterion.name)
                : capitalize(`criterion ${rowIdx + 1}`)}
            </Text>
            <Text fontSize="xs" opacity={0.5} mt={-1}>
              {criterion.defaultRowIdx} - {criterion.uuid.slice(0, 8)}
            </Text>
          </Box>

          {/*
           * -- Unit
           */}
          {isValidNotEmptyString(criterion.unit) ? (
            <Text fontSize="0.75rem" color="gray.500" ml={1}>
              ({criterion.unit})
            </Text>
          ) : null}
        </Flex>

        {/*
         * -- Edit
         */}
        <EditCriterionButton criterionAtom={criterionAtom} />

        <Box
          className="CriterionWeightBarWrapper"
          position="absolute"
          left={2}
          right={2}
          bottom={-0.5}
          boxSizing="border-box"
          zIndex="auto"
        >
          <CriterionWeightBar
            beneficial={criterion.beneficial === true}
            weight={criterion.weight || 0}
            maxWeight={maxWeight}
          />
        </Box>
      </HStack>
    </Cell>
  );
}

function CriterionWeightBar({
  beneficial,
  weight,
  maxWeight
}: {
  beneficial: boolean;
  weight: number;
  maxWeight: number;
}) {
  return (
    <Progress
      size="xs"
      borderRadius="base"
      colorScheme={beneficial === false ? "orange" : "blue"}
      value={getCriterionWeightRelativeToMax(weight, maxWeight)}
      opacity={0.7}
      sx={{
        "& > div": {
          transition: "width .5s ease-in-out"
        }
      }}
    />
  );
}
