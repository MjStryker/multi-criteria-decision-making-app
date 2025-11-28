import { Button, HStack, Icon, IconButton, Stack } from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";
import type { PrimitiveAtom } from "jotai";
import { type Dispatch, type SetStateAction, useEffect } from "react";

import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { useProductForm } from "@/Application/Hooks/useProductForm";
import TextInput from "../../../../../Components/Form/TextInput";

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
  setParentIsDirty: Dispatch<SetStateAction<boolean>>;
  onParentClose: VoidFunction;
};

export default function EditProductForm({
  setParentIsDirty,
  productAtom,
  onParentClose
}: Props) {
  const {
    name,
    reference,
    isDirty,
    onNameChange,
    onReferenceChange,
    onDelete,
    onSubmit
  } = useProductForm({ productAtom, onClose: onParentClose });

  /**
   * * Update parent props
   */
  useEffect(() => {
    setParentIsDirty(isDirty);
  }, [isDirty, setParentIsDirty]);

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={4}>
        <TextInput
          label="Name"
          id="product-name"
          type="text"
          value={name}
          onChange={onNameChange}
        />

        <TextInput
          label="Reference"
          id="product-reference"
          type="text"
          value={reference}
          onChange={onReferenceChange}
        />

        <HStack>
          <IconButton
            colorScheme="red"
            icon={
              <Icon boxSize="20px">
                <IconTrash />
              </Icon>
            }
            aria-label="Delete product"
            onClick={onDelete}
          />

          <Button flex={1} variant="outline" onClick={onParentClose}>
            Cancel
          </Button>

          <Button
            flex={1}
            type="submit"
            colorScheme="teal"
            isDisabled={!isDirty}
          >
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
