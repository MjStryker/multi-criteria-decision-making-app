import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtom, useAtomValue } from "jotai";

import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { Cell } from "../Cell";
import EditProductButton from "./EditProductButton";

type Props = {
  columnIdx: number;
  productAtom: PrimitiveAtom<ProductDto>;
};

export function ProductCell({ columnIdx, productAtom }: Props) {
  const [product] = useAtom(productAtom);

  const debugMode = useAtomValue(AppSettingsAtoms.debugMode);

  return (
    <Cell>
      <VStack
        className="CellContainer"
        alignItems="stretch"
        justifyContent="center"
        h="full"
        px={2}
      >
        <SimpleGrid
          className="FirstRowContainer"
          templateColumns="1fr auto"
          alignItems="center"
          gap={1}
        >
          <Box>
            <Text
              whiteSpace="break-spaces"
              wordBreak="break-word"
              fontWeight="semibold"
              {...(!isValidNotEmptyString(product.name) && {
                fontStyle: "italic",
                fontWeight: "medium",
                color: "gray.600"
              })}
            >
              {isValidNotEmptyString(product.name)
                ? product.name
                : `Item ${columnIdx + 1}`}
            </Text>

            {debugMode ? (
              <Text fontSize="xs" opacity={0.5} mt={-1}>
                [{product.defaultColumnIdx}] {columnIdx} -{" "}
                {product.uuid.slice(0, 8)}
              </Text>
            ) : null}
          </Box>

          <EditProductButton productAtom={productAtom} />
        </SimpleGrid>
      </VStack>
    </Cell>
  );
}
