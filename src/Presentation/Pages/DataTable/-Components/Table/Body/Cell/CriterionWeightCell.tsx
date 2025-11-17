import { EDITABLE_MIN_WIDTH } from '@/@Config/Table';
import { isValidNumber } from '@/@Shared/@Utils/Number';
import { isDefined } from '@/@Shared/@Utils/Object';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { clampCriterionWeightValue } from '@/utils/criteria/criteria';
import { Editable, EditableInput, EditablePreview, HStack, Input, Td, useColorModeValue } from '@chakra-ui/react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const CELL_WIDTH = '100px';

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

    setWeight(isDefined(newWeight) ? clampCriterionWeightValue(newWeight) : null);
  };

  const onSubmit = () => {
    const newWeight = isValidNumber(weight) ? clampCriterionWeightValue(weight) : 0;
    setCriterion(prev => ({ ...prev, weight: newWeight  }));
  };

  return (
    <Td isNumeric w={CELL_WIDTH} minW={CELL_WIDTH} maxW={CELL_WIDTH} px={2} border="1px" borderColor="gray.100">
      <HStack spacing={1}>
        <Editable
          flex={1}
          value={isValidNumber(weight) ? weight.toString() : '-'}
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
            color={criterion.beneficial === false ? 'orange.600' : 'blue.600'}
            _hover={{
              background: useColorModeValue('gray.100', 'gray.700')
            }}
          />

          <Input
            as={EditableInput}
            type="number"
            borderRadius="base"
            size="sm"
            w="full"
            minW="full"
            textAlign="center"
            maxW={EDITABLE_MIN_WIDTH}
            px={2}
          />
        </Editable>
      </HStack>
    </Td>
  );
}
