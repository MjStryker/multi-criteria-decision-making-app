import { useBoolean } from "@chakra-ui/react";

export type useBooleanState = ReturnType<typeof useBoolean>;

export type useBooleanSetState = useBooleanState[1];
