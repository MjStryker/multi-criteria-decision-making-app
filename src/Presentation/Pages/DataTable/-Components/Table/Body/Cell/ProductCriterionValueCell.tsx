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
import { type PrimitiveAtom, useAtomValue } from "jotai";

import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { useProductCriterionValue } from "@/Application/Hooks/useProductCriterionValue";
import { Cell } from "../../Cell";

type Props = {
  productCriterionValueAtom: PrimitiveAtom<ProductCriterionValueDto>;
};

export default function ProductCriterionValueCell({
  productCriterionValueAtom
}: Props) {
  const debugMode = useAtomValue(AppSettingsAtoms.debugMode);

  const { value, rankPoints, onChange, onSubmit } = useProductCriterionValue({
    productCriterionValueAtom
  });

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
          {rankPoints} pts
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
