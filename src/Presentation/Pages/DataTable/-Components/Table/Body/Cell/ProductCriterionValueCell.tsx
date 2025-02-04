import { EDITABLE_MIN_WIDTH } from '@/@Config/Table';
import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import UseUpdateProductCriterionValueCommand from '@/Application/ProductCriterionValue/Commands/UseUpdateProductCriterionValue.command';

import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { Editable, EditableInput, EditablePreview, HStack, Input, Td, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  productCriterionValue: ProductCriterionValueDto;
};

export default function ProductCriterionValueCell({ productCriterionValue }: Props) {
  const setProductCriterionValue = UseUpdateProductCriterionValueCommand();

  const [value, setValue] = useState<number | null>(productCriterionValue?.value ?? null);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setValue(productCriterionValue?.value ?? null);
  }, [productCriterionValue]);

  /**
   * * Handle Input change / validation
   */
  const onChange = (stringValue: string) => {
    setValue(isValidNotEmptyString(stringValue) ? Number(stringValue) : null);
  };

  const onSubmit = () => {
    setProductCriterionValue({ ...productCriterionValue, value });
  };

  return (
    <Td position="relative" isNumeric px={2} border="1px" borderColor="gray.100">
      <Text position="absolute" top={0} left={0}>
        {productCriterionValue.criterionRankPts}
      </Text>

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
      </HStack>
    </Td>
  );
}
