import { ReactNode, createContext, useCallback } from "react";

import { useBoolean } from "@chakra-ui/react";

/**
 * * Type
 */
type ContextType = {
  isAnyEditDialogOpened: boolean;
  toggleIsAnyEditDialogOpened: VoidFunction;
};

/**
 * * Default value
 */
const defaultValue: ContextType = {
  isAnyEditDialogOpened: false,
  toggleIsAnyEditDialogOpened: () => {},
};

/**
 * * Context
 */
export const IsAnyEditDialogOpenedContext =
  createContext<ContextType>(defaultValue);

/**
 * * Provider
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
