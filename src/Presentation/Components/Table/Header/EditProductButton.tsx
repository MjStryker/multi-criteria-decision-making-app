import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { Product } from "@/types/Product";
import { SmallCloseIcon as CloseIcon } from "@chakra-ui/icons";

import { MdEdit as EditIcon } from "react-icons/md";
import EditProductForm from "./EditProductForm";

type Props = {
  product: Product;
};

const EditProductButton = ({ product }: Props) => {
  const firstFieldRef = useRef(null);

  const [isFormDirty, setIsFormDirty] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
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
          firstFieldRef={firstFieldRef}
          setParentIsDirty={setIsFormDirty}
          onParentClose={() => setIsOpen(false)}
          product={product}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EditProductButton;
