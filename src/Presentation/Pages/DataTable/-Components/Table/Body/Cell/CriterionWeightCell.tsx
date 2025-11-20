import {
  Editable,
  EditableInput,
  EditablePreview,
  Input
} from "@chakra-ui/react";
import { type PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useState } from "react";

import { isValidNumber } from "@/@Shared/@Utils/Number";
import { isDefined } from "@/@Shared/@Utils/Object";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { clampCriterionWeightValue } from "@/utils/criteria/criteria";
import { Cell, CRITERION_WEIGHT_CELL_WIDTH } from "../../Cell";

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
};

export default function CriterionWeightCell({ criterionAtom }: Props) {
  const [criterion, setCriterion] = useAtom(criterionAtom);

  const [weight, setWeight] = useState<number | null>(criterion.weight || null);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setWeight(criterion.weight ?? null);
  }, [criterion.weight]);

  /**
   * * Handle Inputs change / validation
   */
  const onChange = (nextValue: string) => {
    const newWeight = parseFloat(nextValue);

    setWeight(
      isDefined(newWeight) ? clampCriterionWeightValue(newWeight) : null
    );
  };

  const onSubmit = () => {
    const newWeight = isValidNumber(weight)
      ? clampCriterionWeightValue(weight)
      : 0;
    setCriterion(prev => ({ ...prev, weight: newWeight }));
  };

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
          color={criterion.beneficial === false ? "orange.600" : "blue.600"}
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
