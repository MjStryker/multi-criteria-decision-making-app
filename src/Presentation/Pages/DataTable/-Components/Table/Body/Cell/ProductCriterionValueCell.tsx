import {
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  Input,
  Text
} from "@chakra-ui/react";
import { IconMinus } from "@tabler/icons-react";
import {
  getDefaultStore,
  type PrimitiveAtom,
  useAtom,
  useAtomValue
} from "jotai";
import { useState } from "react";

import { computeProductCriterionValueRankPts } from "@/@Compute/ComputeProductCriterionValueRankPoints";
import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
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

  const debugMode = useAtomValue(AppSettingsAtoms.debugMode);
  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);

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
    const store = getDefaultStore();

    // Update value
    setProductCriterionValue({ ...productCriterionValue, value });

    if (autoRecompute) {
      // Recompute criterion rank points
      const criterion = store
        .get(CriterionListAtom)
        .find(c => c.uuid === productCriterionValue.criterionUuid);
      if (criterion) {
        const updatedRankPts = computeProductCriterionValueRankPts(
          [criterion],
          store.get(ProductCriterionValueListAtom)
        );
        store.set(ProductCriterionValueListAtom, updatedRankPts);
      }
    }
  };

  return (
    <Cell isNumeric position="relative">
      {debugMode ? (
        <Text
          position="absolute"
          top={0}
          left={0}
          fontSize="xs"
          color="gray.500"
        >
          {productCriterionValue.criterionRankPts}
        </Text>
      ) : null}

      {value === null ? (
        <Center
          position="absolute"
          top={0}
          bottom={0}
          right={2}
          pointerEvents="none"
        >
          <Icon as={IconMinus} boxSize={4} color="blackAlpha.300" />
        </Center>
      ) : null}

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
          borderRadius="sm"
          transition="none"
          _hover={{
            background: "gray.100"
          }}
          // {...(value === null && {
          //   bg: "gray.100"
          // })}
        />

        <Input
          as={EditableInput}
          type="number"
          borderRadius="sm"
          size="sm"
          px={2}
          w="full"
          h="full"
          bg="gray.50"
        />
      </Editable>
    </Cell>
  );
}
