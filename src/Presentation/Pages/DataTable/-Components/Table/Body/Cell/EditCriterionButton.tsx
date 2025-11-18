import { SmallCloseIcon as CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger
} from "@chakra-ui/react";
import type { PrimitiveAtom } from "jotai";
import { useState } from "react";
import { MdEdit as EditIcon } from "react-icons/md";

import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import EditCriterionForm from "./EditCriterionForm";

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
};

export default function EditCriterionButton({ criterionAtom }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

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
          criterionAtom={criterionAtom}
          setParentIsDirty={setIsFormDirty}
          onParentClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
