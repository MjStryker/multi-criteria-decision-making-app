import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Stack } from '@chakra-ui/react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import TextInput from '../../../../../Components/Form/TextInput';

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
  remove: () => void;
  setParentIsDirty: Dispatch<SetStateAction<boolean>>;
  onParentClose: VoidFunction;
};

export default function EditProductForm({ setParentIsDirty, productAtom, remove, onParentClose }: Props) {
  const [product, setProduct] = useAtom(productAtom);

  // const updateProduct = UseUpdateProductCommand();
  // const removeProduct = UseRemoveProductCommand();

  const [name, setName] = useState<string>(product.name || '');

  const [reference, setReference] = useState<string>(product.reference || '');

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
    onParentClose();
  };

  const onSave = () => {
    // updateProduct({ ...product, name, reference });
    setProduct({ ...product, name, reference });
    onClose();
  };

  const onDelete = () => {
    // removeProduct(product);
    remove();
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
        <TextInput label="Name" id="product-name" type="text" value={name} onChange={onNameChange} />

        <TextInput
          label="Reference"
          id="product-reference"
          type="text"
          value={reference}
          onChange={onReferenceChange}
        />

        <HStack>
          <IconButton colorScheme="red" icon={<DeleteIcon />} aria-label="Delete product" onClick={onDelete} />

          <Button flex={1} variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button flex={1} type="submit" colorScheme="teal" isDisabled={!isDirty}>
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
