import {
  Editable,
  EditableInput,
  EditablePreview,
  Input
} from "@chakra-ui/react";
import type { PrimitiveAtom } from "jotai";

import { isValidNumber } from "@/@Shared/@Utils/Number";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { useCriterionWeight } from "@/Application/Hooks/useCriterionWeight";
import { Cell, CRITERION_WEIGHT_CELL_WIDTH } from "../../Cell";

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
};

export default function CriterionWeightCell({ criterionAtom }: Props) {
  const { weight, beneficial, onChange, onSubmit } = useCriterionWeight({
    criterionAtom
  });

  return (
    <Cell
      isNumeric
      w={CRITERION_WEIGHT_CELL_WIDTH}
      minW={CRITERION_WEIGHT_CELL_WIDTH}
      maxW={CRITERION_WEIGHT_CELL_WIDTH}
    >
      <Editable
        flex={1}
        h="full"
        value={isValidNumber(weight) ? weight.toString() : "-"}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <EditablePreview
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={2}
          px={2}
          w="full"
          h="full"
          fontSize="md"
          fontWeight="semibold"
          borderRadius="sm"
          transition="none"
          color={beneficial === false ? "orange.600" : "blue.600"}
          _hover={{
            background: "gray.100"
          }}
        />

        <Input
          as={EditableInput}
          type="number"
          borderRadius="sm"
          size="sm"
          w="full"
          h="full"
          textAlign="center"
          px={2}
        />
      </Editable>
    </Cell>
  );
}
