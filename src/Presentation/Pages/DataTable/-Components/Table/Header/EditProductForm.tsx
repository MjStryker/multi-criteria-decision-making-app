import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import UseRemoveProductCommand from '@/Application/Commands/UseRemoveProduct.command';
import UseUpdateProductCommand from '@/Application/Commands/UseUpdateProduct.command';

import { ProductDto } from '@/Application/Dtos/Product.dto';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import TextInput from '../../../../../Components/Form/TextInput';

type Props = {
  setParentIsDirty: Dispatch<SetStateAction<boolean>>;
  onParentClose: VoidFunction;
  product: ProductDto;
};

export default function EditProductForm({ setParentIsDirty, product, onParentClose }: Props) {
  const updateProduct = UseUpdateProductCommand();
  const removeProduct = UseRemoveProductCommand();

  const [name, setName] = useState<string>(product.name || '');

  const [reference, setReference] = useState<string>(product.reference || '');

  const [confirmDelete, setConfirmDelete] = useState(false);

  const isDirty = name !== product.name || reference !== product.reference;

  /**
   * * Update parent props
   */
  useEffect(() => {
    setParentIsDirty(isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(product.name || '');
  }, [product.name]);

  useEffect(() => {
    setReference(product.reference || '');
  }, [product.reference]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) => setName(e.currentTarget.value);

  const onReferenceChange = (e: FormEvent<HTMLInputElement>) => setReference(e.currentTarget.value);

  /**
   * * Dialog actions
   */
  const onClose = () => {
    setConfirmDelete(false);
    onParentClose();
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

              <Button flex={1} variant="outline" onClick={() => setConfirmDelete(false)}>
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
                onClick={() =>
                  !isValidNotEmptyString(name) && !isValidNotEmptyString(reference)
                    ? // * If fields are empty + product does not have any value
                      onDelete
                    : // * Else go through confirm process
                      setConfirmDelete(true)
                }
              />

              <Button flex={1} variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button flex={1} type="submit" colorScheme="teal" isDisabled={!isDirty}>
                Save
              </Button>
            </>
          )}
        </HStack>
      </Stack>
    </form>
  );
}
