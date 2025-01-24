import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";

import { Criterion } from "@/types/Criterion";
import { SmallCloseIcon as CloseIcon } from "@chakra-ui/icons";
import { MdEdit as EditIcon } from "react-icons/md";
import EditCriterionForm from "./EditCriterionForm";

type EditCriterionButtonProps = {
  criterion: Criterion;
};

const EditCriterionButton = ({ criterion }: EditCriterionButtonProps) => {
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
          aria-label="Edit criterion"
          size="sm"
          variant="outline"
          color="gray.500"
          icon={!isOpen ? <EditIcon /> : <CloseIcon />}
        />
      </PopoverTrigger>

      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <EditCriterionForm
          setParentIsDirty={setIsFormDirty}
          onParentClose={() => setIsOpen(false)}
          criterion={criterion}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EditCriterionButton;
