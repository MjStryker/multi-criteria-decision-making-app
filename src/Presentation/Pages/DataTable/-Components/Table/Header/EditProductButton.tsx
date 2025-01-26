import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";

import { SmallCloseIcon as CloseIcon } from "@chakra-ui/icons";

import { MdEdit as EditIcon } from "react-icons/md";
import EditProductForm from "./EditProductForm";
import { ProductDto } from "@/Application/Dtos/Product.dto";

type Props = {
  product: ProductDto;
};

export default function EditProductButton({ product }: Props) {
  const [isFormDirty, setIsFormDirty] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="right"
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
          setParentIsDirty={setIsFormDirty}
          onParentClose={() => setIsOpen(false)}
          product={product}
        />
      </PopoverContent>
    </Popover>
  );
}
