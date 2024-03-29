import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Input,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { DEBUG } from "../../../../../constants/global";
import { DataContext } from "../../../../../context/DataContext";
import DebugValue from "../../../global/table/DebugValue";
import { EDITABLE_MIN_WIDTH } from "../../../../../constants/table";
import { TCriterion } from "../../../../../types/criteria";
import { clampCriterionWeightValue } from "../../../../../utils/criteria/criteria";
import { isDefined } from "../../../../../utils/objects";
import { isValidNumber } from "../../../../../utils/numbers";
import { parseStringAsNumber } from "../../../../../utils/strings";

const cellWidth = "100px";

type CriterionWeightCellProps = {
  criterion: TCriterion;
};

const CriterionWeightCell = ({ criterion }: CriterionWeightCellProps) => {
  const { updateCriterion } = useContext(DataContext);

  const getValueFromProps = () => criterion.weight || null;

  const [weight, setWeight] = useState<number | null>(getValueFromProps);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setWeight(getValueFromProps);
    return () => setWeight(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criterion.weight]);

  /**
   * * Handle Inputs change / validation
   */
  const onChange = (nextValue: string) => {
    const newWeight = parseStringAsNumber(nextValue);

    setWeight(
      isDefined(newWeight) ? clampCriterionWeightValue(newWeight) : null
    );
  };

  const onSubmit = () => {
    const newWeight = isValidNumber(weight)
      ? clampCriterionWeightValue(weight)
      : undefined;

    updateCriterion({ ...criterion, weight: newWeight });
  };

  return (
    <Td
      isNumeric
      w={cellWidth}
      minW={cellWidth}
      maxW={cellWidth}
      px={2}
      border="1px"
      borderColor="gray.100"
    >
      <HStack spacing={1}>
        <Editable
          flex={1}
          value={isValidNumber(weight) ? weight.toString() : "-"}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <EditablePreview
            py={2}
            px={2}
            w="full"
            minW={EDITABLE_MIN_WIDTH}
            fontSize="md"
            fontWeight="semibold"
            textAlign="center"
            color={criterion.beneficial === false ? "orange.600" : "blue.600"}
            _hover={{
              background: useColorModeValue("gray.100", "gray.700"),
            }}
          />

          <Input
            as={EditableInput}
            type="number"
            borderRadius="base"
            size="sm"
            w="full"
            textAlign="center"
            maxW={EDITABLE_MIN_WIDTH}
            px={2}
          />
        </Editable>

        {DEBUG && isValidNumber(criterion.normalizedWeight) ? (
          <DebugValue
            value={criterion.normalizedWeight.toFixed(2)}
            variant="solid"
            colorScheme={criterion.beneficial === false ? "orange" : "blue"}
          />
        ) : null}
      </HStack>
    </Td>
  );
};

export default CriterionWeightCell;
