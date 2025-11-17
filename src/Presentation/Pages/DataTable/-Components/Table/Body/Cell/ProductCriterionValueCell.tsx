import { computeProductCriterionValueRankPts } from '@/@Compute/ComputeProductCriterionValueRankPoints';
import { EDITABLE_MIN_WIDTH } from '@/@Config/Table';
import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import { CriterionListAtom } from '@/Application/Criterion/Atoms/CriterionList.atom';
import { ProductCriterionValueListAtom } from '@/Application/ProductCriterionValue/Atoms/ProductCriterionValueList.atom';

import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { Editable, EditableInput, EditablePreview, HStack, Input, Td, Text, useColorModeValue } from '@chakra-ui/react';
import { getDefaultStore, PrimitiveAtom, useAtom } from 'jotai';
import { useState } from 'react';

type Props = {
  productCriterionValueAtom: PrimitiveAtom<ProductCriterionValueDto>;
};

export default function ProductCriterionValueCell({ productCriterionValueAtom }: Props) {
  const [productCriterionValue, setProductCriterionValue] = useAtom(productCriterionValueAtom);

  const [value, setValue] = useState<number | null>(productCriterionValue?.value ?? null);

  /**
   * * Handle Input change / validation
   */
  const onChange = (stringValue: string) => {
    setValue(isValidNotEmptyString(stringValue) ? Number(stringValue) : null);
  };

  const onSubmit = () => {
    const store = getDefaultStore();
    // Update value
    setProductCriterionValue({ ...productCriterionValue, value });
    // Recompute criterion rank points
    const criterion = store.get(CriterionListAtom).find(c => c.uuid === productCriterionValue.criterionUuid);
    if (criterion) {
      const updatedRankPts = computeProductCriterionValueRankPts(
        [criterion],
        store.get(ProductCriterionValueListAtom)
      );
      store.set(ProductCriterionValueListAtom, updatedRankPts);
    }
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
