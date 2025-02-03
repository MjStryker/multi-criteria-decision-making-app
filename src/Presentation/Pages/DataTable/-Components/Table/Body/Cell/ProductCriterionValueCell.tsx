import { DEBUG } from '@/@Config/Global';
import { EDITABLE_MIN_WIDTH } from '@/@Config/Table';
import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import UseUpdateProductCriterionValueCommand from '@/Application/ProductCriterionValue/Commands/UseUpdateProductCriterionValue.command';

import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { Editable, EditableInput, EditablePreview, HStack, Input, Td, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DebugValue from '../../DebugValue';

type Props = {
  criterion: CriterionDto;
  criterionProductValue: ProductCriterionValueDto;
};

export default function ProductCriterionValueCell({ criterion, criterionProductValue }: Props) {
  const setProductCriterionValue = UseUpdateProductCriterionValueCommand();

  const [value, setValue] = useState<number | null>(criterionProductValue?.value ?? null);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setValue(criterionProductValue?.value ?? null);
  }, [criterionProductValue]);

  /**
   * * Handle Input change / validation
   */
  const onChange = (stringValue: string) => {
    setValue(isValidNotEmptyString(stringValue) ? Number(stringValue) : null);
  };

  const onSubmit = () => {
    setProductCriterionValue({ ...criterionProductValue, value });
  };

  return (
    <Td isNumeric px={2} border="1px" borderColor="gray.100">
      <HStack spacing={1} justifyContent="flex-end">
        <Editable flex={1} value={value?.toString() ?? '-'} onChange={onChange} onSubmit={onSubmit}>
          <EditablePreview
            py={2}
            px={2}
            w="full"
            minW={EDITABLE_MIN_WIDTH}
            _hover={{
              background: useColorModeValue('gray.100', 'gray.700')
            }}
          />

          <Input as={EditableInput} type="number" borderRadius="base" size="sm" px={2} />
        </Editable>

        {DEBUG && criterionProductValue?.criterionRankPts !== null ? (
          <DebugValue
            value={`${criterionProductValue?.criterionRankPts.toFixed(0)} pts`}
            variant="outline"
            colorScheme={criterion.beneficial === false ? 'orange' : 'blue'}
          />
        ) : null}
      </HStack>
    </Td>
  );
}
