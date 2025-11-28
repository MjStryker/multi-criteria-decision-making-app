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
import { useState } from "react";

import type { ProductDto } from "@/Application/Dtos/Product.dto";
import EditProductForm from "./EditProductForm";

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
          onParentClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
