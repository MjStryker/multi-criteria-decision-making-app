import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Td,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { deepEqual, isDefined } from "../../../../../utils/objects";
import {
  isValidNonEmptyString,
  parseStringAsNumber,
} from "../../../../../utils/strings";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useHandleProductsWithCriteria, {
  useHandleProductsWithCriteriaFunctions,
} from "../../../../../hooks/data/useHandleProductsWithCriteria";

import { TCriterion } from "../../../../../types/criteria";
import { TProduct } from "../../../../../types/products";
import { TProductWithCriterion } from "../../../../../types/productsWithCriteria";
import { isValidNumber } from "../../../../../utils/numbers";
import { minWidth } from "../../../../../styles/tables/tableCell";

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
    <Td isNumeric>
      <Editable value={value || "-"} onChange={onChange} onSubmit={onSubmit}>
        <EditablePreview
          py={2}
          px={2}
          w="full"
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
    </Td>
  );
};

export default CriterionProductValueCell;
