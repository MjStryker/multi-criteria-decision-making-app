import { ReactNode, createContext, useCallback } from "react";

import { useBoolean } from "@chakra-ui/react";

/**
 * * 1 - Type
 */
type ContextType = {
  isAnyEditDialogOpened: boolean;
  toggleIsAnyEditDialogOpened: VoidFunction;
};

/**
 * * 2 - Default value
 */
const defaultValue: ContextType = {
  isAnyEditDialogOpened: false,
  toggleIsAnyEditDialogOpened: () => {},
};

/**
 * * 3 - Context
 */
export const IsAnyEditDialogOpenedContext =
  createContext<ContextType>(defaultValue);

/**
 * * 4 - Provider
 */
export const IsAnyEditDialogOpenedContextProvider = (props: {
  children: ReactNode;
}) => {
  const [isAnyEditDialogOpened, setIsAnyEditDialogOpened] = useBoolean();

  const toggleIsAnyEditDialogOpened = useCallback(() => {
    setIsAnyEditDialogOpened.toggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IsAnyEditDialogOpenedContext.Provider
      value={{ isAnyEditDialogOpened, toggleIsAnyEditDialogOpened }}
      {...props}
    />
  );
};
