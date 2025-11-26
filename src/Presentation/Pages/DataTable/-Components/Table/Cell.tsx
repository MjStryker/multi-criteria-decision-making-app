import { Td } from "@chakra-ui/react";
import { type ComponentProps, forwardRef } from "react";

export const HEADER_CELL_HEIGHT = "64px";

export const CRITERION_CELL_WIDTH = "220px";
export const CRITERION_WEIGHT_CELL_WIDTH = "72px";

export const ADD_PRODUCT_CELL_WIDTH = "48px";

export const CELL_WIDTH = "180px";
export const CELL_HEIGHT = "48px";

export const Cell = forwardRef<HTMLTableCellElement, ComponentProps<typeof Td>>(
  ({ children, ...props }, ref) => {
    return (
      <Td
        ref={ref}
        w={CELL_WIDTH}
        minW={CELL_WIDTH}
        // maxW={CELL_WIDTH}
        h={CELL_HEIGHT}
        minH={CELL_HEIGHT}
        // maxH={CELL_HEIGHT}
        border="1px solid"
        borderColor="gray.200"
        // bg="white"
        p={0}
        {...props}
      >
        {children}
      </Td>
    );
  }
);

Cell.displayName = "Cell";
