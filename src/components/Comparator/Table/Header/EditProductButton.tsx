import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";

import { SmallCloseIcon as CloseIcon } from "@chakra-ui/icons";
import { MdEdit as EditIcon } from "react-icons/md";
import EditProductForm from "./EditProductForm";
import FocusLock from "react-focus-lock";
import { IsAnyEditDialogOpenedContext } from "../../../../context/IsAnyEditDialogOpened";
import { TProduct } from "../../../../types/products";

type EditProductButtonProps = {
  product: TProduct;
};

const EditProductButton = ({ product }: EditProductButtonProps) => {
  const { isAnyEditDialogOpened, toggleIsAnyEditDialogOpened } = useContext(
    IsAnyEditDialogOpenedContext
  );

  const firstFieldRef = useRef(null);

  const [isFormDirty, setIsFormDirty] = useBoolean();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleOpen = () => {
    if (isOpen || isAnyEditDialogOpened) return;

    onOpen();
    toggleIsAnyEditDialogOpened();
  };

  const handleClose = () => {
    if (!isOpen) return;

    onClose();
    toggleIsAnyEditDialogOpened();
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={handleOpen}
      onClose={handleClose}
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
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <EditProductForm
            firstFieldRef={firstFieldRef}
            setParentIsDirty={setIsFormDirty}
            onParentClose={handleClose}
            product={product}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default EditProductButton;
