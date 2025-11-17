import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react';
import { useState } from 'react';

import { SmallCloseIcon as CloseIcon } from '@chakra-ui/icons';

import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { PrimitiveAtom } from 'jotai';
import { MdEdit as EditIcon } from 'react-icons/md';
import EditProductForm from './EditProductForm';

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function EditProductButton({ productAtom }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="bottom"
      closeOnBlur={!isFormDirty}
      closeOnEsc
      returnFocusOnClose
      isLazy
      lazyBehavior="unmount"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Edit product"
          size="sm"
          variant="outline"
          color="gray.500"
          icon={!isOpen ? <EditIcon /> : <CloseIcon />}
        />
      </PopoverTrigger>

      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <EditProductForm
          productAtom={productAtom}
          setParentIsDirty={setIsFormDirty}
          onParentClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
