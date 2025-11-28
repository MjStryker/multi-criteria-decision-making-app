import { useState } from "react";

export function useEditPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    isFormDirty,
    setIsFormDirty,
    onOpen,
    onClose
  };
}
