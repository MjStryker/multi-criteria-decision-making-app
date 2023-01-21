import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import EditProductForm from "./EditProductForm";
import FocusLock from "react-focus-lock";
import { TProduct } from "../../../../types/products";
import { useRef } from "react";

type EditProductButtonProps = {
  product: TProduct;
  updateProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
};

const EditProductButton = ({
  product,
  updateProduct,
  removeProduct,
}: EditProductButtonProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const firstFieldRef = useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
      closeOnEsc
      returnFocusOnClose
      isLazy
      lazyBehavior="unmount"
    >
      <PopoverTrigger>
        <IconButton size="sm" icon={<EditIcon />} aria-label="Edit product" />
      </PopoverTrigger>

      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <EditProductForm
            firstFieldRef={firstFieldRef}
            onClose={onClose}
            product={product}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default EditProductButton;
