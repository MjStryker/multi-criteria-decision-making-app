import { capitalize, isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { Criterion } from "@/types/Criterion";
import { getCriterionWeightRelativeToMax } from "@/utils/criteria/criteria";
import { Box, Flex, HStack, Progress, Td, Text } from "@chakra-ui/react";
import EditCriterionButton from "./EditCriterionButton";

const cellWidth = "240px";

type CriterionNameUnitCellProps = {
  criterion: Criterion;
  rowIdx: number;
  maxWeight: number;
};

const CriterionNameUnitCell = ({
  criterion,
  rowIdx,
  maxWeight,
}: CriterionNameUnitCellProps) => {
  const hasName = isValidNotEmptyString(criterion.name);

  const defaultName = `Critère ${rowIdx + 1}`;

  return (
    <Td
      position="relative"
      pl={2}
      pr={1}
      w={cellWidth}
      minW={cellWidth}
      maxW={cellWidth}
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
          {isValidNotEmptyString(criterion.unit) ? (
            <Text fontSize="0.75rem" color="gray.500" ml={1}>
              ({criterion.unit})
            </Text>
          ) : null}
        </Flex>

        {/*
         * -- Edit
         */}
        <EditCriterionButton criterion={criterion} />
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
