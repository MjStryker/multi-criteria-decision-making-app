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

import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { useEditPopover } from "@/Application/Hooks/useEditPopover";
import EditCriterionForm from "./EditCriterionForm";

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
};

export default function EditCriterionButton({ criterionAtom }: Props) {
  const { isOpen, isFormDirty, setIsFormDirty, onOpen, onClose } =
    useEditPopover();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
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
          onParentClose={onClose}
        />
      </PopoverContent>
    </Popover>
  );
}
