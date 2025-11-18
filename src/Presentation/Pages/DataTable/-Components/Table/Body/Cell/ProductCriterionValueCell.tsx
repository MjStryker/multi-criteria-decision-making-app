import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Text
} from "@chakra-ui/react";
import { getDefaultStore, type PrimitiveAtom, useAtom } from "jotai";
import { useState } from "react";

import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { Cell } from "../../Cell";

type Props = {
  productCriterionValueAtom: PrimitiveAtom<ProductCriterionValueDto>;
};

export default function ProductCriterionValueCell({
  productCriterionValueAtom
}: Props) {
  const [productCriterionValue, setProductCriterionValue] = useAtom(
    productCriterionValueAtom
  );

  const [value, setValue] = useState<number | null>(
    productCriterionValue?.value ?? null
  );

  /**
   * * Handle Input change / validation
   */
  const onChange = (stringValue: string) => {
    setValue(prev => {
      const newVal = isValidNotEmptyString(stringValue)
        ? Number(stringValue)
        : null;
      return prev !== newVal ? newVal : prev;
    });
  };

  const onSubmit = () => {
    const _store = getDefaultStore();
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
    <Cell isNumeric position="relative">
      <Text position="absolute" top={0} left={0} fontSize="xs" color="gray.500">
        {productCriterionValue.criterionRankPts}
      </Text>

      <Editable
        flex={1}
        h="full"
        value={value?.toString()}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <EditablePreview
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          py={2}
          px={2}
          w="full"
          h="full"
          bg={value !== null ? "white" : "gray.50"}
          borderRadius="sm"
          _hover={{
            border: "1px solid",
            borderColor: "gray.300"
          }}
        />

        <Input
          as={EditableInput}
          type="number"
          borderRadius="sm"
          size="sm"
          px={2}
          w="full"
          h="full"
        />
      </Editable>
    </Cell>
  );
}
