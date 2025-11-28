import {
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger
} from "@chakra-ui/react";
import { IconPencil } from "@tabler/icons-react";
import type { PrimitiveAtom } from "jotai";

import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { useEditPopover } from "@/Application/Hooks/useEditPopover";
import EditProductForm from "./EditProductForm";

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function EditProductButton({ productAtom }: Props) {
  const { isOpen, isFormDirty, setIsFormDirty, onOpen, onClose } =
    useEditPopover();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom"
      closeOnBlur={!isFormDirty}
      closeOnEsc
      returnFocusOnClose
      isLazy
      lazyBehavior="unmount"
      strategy="fixed"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Edit product"
          size="sm"
          variant="ghost"
          color="gray.500"
          icon={
            <Icon boxSize="20px">
              <IconPencil />
            </Icon>
          }
        />
      </PopoverTrigger>

      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <EditProductForm
          productAtom={productAtom}
          setParentIsDirty={setIsFormDirty}
          onParentClose={onClose}
        />
      </PopoverContent>
    </Popover>
  );
}
