import { CELL_HEIGHT, CELL_WIDTH } from '@/@Config/Table';
import { isValidNotEmptyString } from '@/@Shared/@Utils/String';

import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { Editable, EditableInput, EditablePreview, Input, Td, Text } from '@chakra-ui/react';
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
    setValue(prev => {
      const newVal = isValidNotEmptyString(stringValue) ? Number(stringValue) : null;
      return prev !== newVal ? newVal : prev;
    });
  };

  const onSubmit = () => {
    const store = getDefaultStore();
    // Update value
    setProductCriterionValue({ ...productCriterionValue, value });
    // // Recompute criterion rank points
    // const criterion = store.get(CriterionListAtom).find(c => c.uuid === productCriterionValue.criterionUuid);
    // if (criterion) {
    //   const updatedRankPts = computeProductCriterionValueRankPts(
    //     [criterion],
    //     store.get(ProductCriterionValueListAtom)
    //   );
    //   store.set(ProductCriterionValueListAtom, updatedRankPts);
    // }
  };

  return (
    <Td position="relative" isNumeric p={0} 
            w={CELL_WIDTH} h={CELL_HEIGHT}  border="1px" borderColor="gray.100">
      <Text position="absolute" top={0} left={0} fontSize="xs" color="gray.500">
        {productCriterionValue.criterionRankPts}
      </Text>

        <Editable flex={1} 
            w={CELL_WIDTH}
             h="full" value={value?.toString()} onChange={onChange} onSubmit={onSubmit}>
          <EditablePreview
            display="flex"
            alignItems="center" 
            justifyContent="flex-end"
            py={2}
            px={2}
            w="full"
            h="full"
            bg={value !== null ? "white": 'gray.50'}
             borderRadius="sm"
            _hover={{
              border: '1px solid',
              borderColor: 'gray.300',
            }}
          />

          <Input as={EditableInput} type="number" borderRadius="sm" size="sm" 
           px={2} w="full" h="full" />
        </Editable>
    </Td>
  );
}
