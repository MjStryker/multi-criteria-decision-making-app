import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Stack } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useEffect,
  useState
} from "react";

import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
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
  const [product, setProduct] = useAtom(productAtom);
  const setProductList = useSetAtom(ProductListAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );

  const [name, setName] = useState<string>(product.name || "");

  const [reference, setReference] = useState<string>(product.reference || "");

  const isDirty = name !== product.name || reference !== product.reference;

  /**
   * * Update parent props
   */
  useEffect(() => {
    setParentIsDirty(isDirty);
  }, [isDirty, setParentIsDirty]);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(product.name || "");
  }, [product.name]);

  useEffect(() => {
    setReference(product.reference || "");
  }, [product.reference]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const onReferenceChange = (e: FormEvent<HTMLInputElement>) =>
    setReference(e.currentTarget.value);

  /**
   * * Dialog actions
   */
  const onClose = () => {
    onParentClose();
  };

  const onSave = () => {
    setProduct(prev => ({ ...prev, name, reference }));
    onClose();
  };

  const onDelete = () => {
    // Remove product from list
    setProductList(prev => prev.filter(p => p.uuid !== product.uuid));
    // Remove product criterion values
    setProductCriterionValueList(prev =>
      prev.filter(p => p.productUuid !== product.uuid)
    );
    // Close dialog
    onClose();
  };

  /**
   * * Form
   */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={4}>
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
            icon={<DeleteIcon />}
            aria-label="Delete product"
            onClick={onDelete}
          />

          <Button flex={1} variant="outline" onClick={onClose}>
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
