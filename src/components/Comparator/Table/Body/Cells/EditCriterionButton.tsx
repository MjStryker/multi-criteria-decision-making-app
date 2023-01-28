import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import EditCriterionForm from "./EditCriterionForm";
import { MdEdit as EditIcon } from "react-icons/md";
import FocusLock from "react-focus-lock";
import { TCriterion } from "../../../../../types/criteria";
import { useRef } from "react";

type EditCriterionButtonProps = {
  criterion: TCriterion;
  updateCriterion: (criterion: TCriterion) => void;
  removeCriterion: (criterion: TCriterion) => void;
};

const EditCriterionButton = ({
  criterion,
  updateCriterion,
  removeCriterion,
}: EditCriterionButtonProps) => {
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
        <IconButton
          size="sm"
          variant="outline"
          color="gray.500"
          icon={<EditIcon />}
          aria-label="Edit criterion"
        />
      </PopoverTrigger>

      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <EditCriterionForm
            firstFieldRef={firstFieldRef}
            onClose={onClose}
            criterion={criterion}
            updateCriterion={updateCriterion}
            removeCriterion={removeCriterion}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default EditCriterionButton;
