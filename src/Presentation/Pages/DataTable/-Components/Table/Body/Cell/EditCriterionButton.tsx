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
      strategy="fixed"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Edit criterion"
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
        <EditCriterionForm
          criterionAtom={criterionAtom}
          setParentIsDirty={setIsFormDirty}
          onParentClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
