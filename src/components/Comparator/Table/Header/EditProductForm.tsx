import {
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import { TProduct } from "../../../../types/products";
import TextInput from "../../global/form/TextInput";
import { isValidNonEmptyString } from "../../../../utils/strings";

type EditProductFormProps = {
  firstFieldRef: any;
  onClose: VoidFunction;
  product: TProduct;
  updateProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
};

const EditProductForm = ({
  firstFieldRef,
  product,
  onClose: onPropsClose,
  updateProduct,
  removeProduct,
}: EditProductFormProps) => {
  const [name, setName] = useState<string | undefined>(product.name);

  const [reference, setReference] = useState<string | undefined>(
    product.reference
  );

  const [confirmDelete, setConfirmDelete] = useBoolean();

  const hasChanges = name !== product.name || reference !== product.reference;

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(product.name);
    return () => setName(undefined);
  }, [product.name]);

  useEffect(() => {
    setReference(product.reference);
    return () => setReference(undefined);
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
    setConfirmDelete.off();
    onPropsClose();
  };

  const onSave = () => {
    updateProduct({ ...product, name, reference });
    onClose();
  };

  const onDelete = () => {
    removeProduct(product);
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
          ref={firstFieldRef}
          type="text"
          value={name}
          onChange={onNameChange}
          isDisabled={confirmDelete}
        />

        <TextInput
          label="Reference"
          id="product-reference"
          type="text"
          value={reference}
          onChange={onReferenceChange}
          isDisabled={confirmDelete}
        />

        <HStack>
          {confirmDelete ? (
            <>
              <Text flex={2} fontSize="md">
                Delete?
              </Text>

              <Button flex={1} variant="outline" onClick={setConfirmDelete.off}>
                No
              </Button>

              <Button flex={1} colorScheme="red" onClick={onDelete}>
                Yes
              </Button>
            </>
          ) : (
            <>
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                aria-label="Delete product"
                onClick={
                  !isValidNonEmptyString(name) &&
                  !isValidNonEmptyString(reference)
                    ? // * If fields are empty then delete product
                      onDelete
                    : // * Else go through confirm process
                      setConfirmDelete.on
                }
              />

              <Button flex={1} variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button
                flex={1}
                type="submit"
                colorScheme="teal"
                isDisabled={!hasChanges}
              >
                Save
              </Button>
            </>
          )}
        </HStack>
      </Stack>
    </form>
  );
};

export default EditProductForm;
