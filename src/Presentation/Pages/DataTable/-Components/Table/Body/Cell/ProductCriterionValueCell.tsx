import { DEBUG } from '@/@Config/Global';
import { EDITABLE_MIN_WIDTH } from '@/@Config/Table';
import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import UseUpdateProductCriterionValueCommand from '@/Application/Commands/UseUpdateProductCriterionValue.command';

import { CriterionDto } from '@/Application/Dtos/Criterion.dto';
import { ProductDto } from '@/Application/Dtos/Product.dto';
import { ProductCriterionValueDto } from '@/Application/Dtos/ProductCriteriaValue.dto';
import { Editable, EditableInput, EditablePreview, HStack, Input, Td, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DebugValue from '../../DebugValue';

type Props = {
  criterion: CriterionDto;
  product: ProductDto;
  criterionProductValue: ProductCriterionValueDto | null;
};

export default function ProductCriterionValueCell({ criterion, product, criterionProductValue }: Props) {
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
    setProductCriterionValue(product.uuid, criterion.uuid, value);
  };

  return (
    <Td isNumeric p={0} border="1px" borderColor="gray.100">
      <HStack gap={1} h="50px" justifyContent="flex-end">
        <Editable flex={1} h="full" value={value?.toString()} onChange={onChange} onSubmit={onSubmit}>
          <EditablePreview
            py="18px"
            px={3}
            w="full"
            minW={EDITABLE_MIN_WIDTH}
            h="full"
            rounded="none"
            _hover={{
              bg: useColorModeValue('gray.50', 'gray.700')
            }}
          />

          <Input
            as={EditableInput}
            type="number"
            // borderRadius="base"
            size="sm"
            h="full"
            px="11px"
          />
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
