import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Input,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  isValidNonEmptyString,
  parseStringAsNumber,
} from "../../../../../utils/strings";
import { useEffect, useState } from "react";

import { DEBUG } from "../../../../../constants/global";
import DebugValue from "../../../global/table/DebugValue";
import { EDITABLE_MIN_WIDTH } from "../../../../../constants/table";
import { TCriterion } from "../../../../../types/criteria";
import { TProduct } from "../../../../../types/products";
import { TProductWithCriterion } from "../../../../../types/productsWithCriteria";
import { isValidNumber } from "../../../../../utils/numbers";
import { useHandleProductsWithCriteriaFunctions } from "../../../../../hooks/data/useHandleProductsWithCriteria";

type CriterionProductValueCellProps = {
  criterion: TCriterion;
  product: TProduct;
  criterionProductValue: TProductWithCriterion | null;
  setProductCriterionValue: useHandleProductsWithCriteriaFunctions["setProductCriterionValue"];
};

const CriterionProductValueCell = ({
  criterion,
  product,
  criterionProductValue,
  setProductCriterionValue,
}: CriterionProductValueCellProps) => {
  const getValueFromProps = () =>
    isValidNumber(criterionProductValue?.value)
      ? criterionProductValue?.value?.toString() || null
      : null;

  const [value, setValue] = useState<string | null>(getValueFromProps);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setValue(getValueFromProps);
    return () => setValue(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criterionProductValue]);

  /**
   * * Handle Inputs change / validation
   */
  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  const onSubmit = () => {
    const newValue = isValidNonEmptyString(value)
      ? parseStringAsNumber(value as string)
      : null;

    setProductCriterionValue(product, criterion, newValue);
  };

  return (
    <Td isNumeric px={2}>
      <HStack spacing={1} justifyContent="flex-end">
        <Editable
          flex={1}
          value={value || "-"}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <EditablePreview
            py={2}
            px={2}
            w="full"
            minW={EDITABLE_MIN_WIDTH}
            _hover={{
              background: useColorModeValue("gray.100", "gray.700"),
            }}
          />

          <Input
            as={EditableInput}
            type="number"
            borderRadius="base"
            size="sm"
            px={2}
          />
        </Editable>

        {DEBUG && isValidNumber(criterionProductValue?.criterionRankPts) ? (
          <DebugValue
            value={`${criterionProductValue?.criterionRankPts.toFixed(0)} pts`}
          />
        ) : null}
      </HStack>
    </Td>
  );
};

export default CriterionProductValueCell;
