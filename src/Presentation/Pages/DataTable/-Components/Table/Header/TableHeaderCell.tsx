import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtom } from "jotai";

import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { Cell, HEADER_CELL_HEIGHT } from "../Cell";
import EditProductButton from "./EditProductButton";

type Props = {
  columnIdx: number;
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function TableHeaderCell({ columnIdx, productAtom }: Props) {
  const [product] = useAtom(productAtom);

  return (
    <Cell h={HEADER_CELL_HEIGHT} minH={HEADER_CELL_HEIGHT}>
      <VStack
        className="CellContainer"
        alignItems="stretch"
        justifyContent="space-between"
        h="full"
        p={2}
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

            <Text fontSize="xs" opacity={0.5} mt={-1}>
              {columnIdx} - {product.uuid.slice(0, 8)}
            </Text>
          </Box>

          <EditProductButton productAtom={productAtom} />
        </SimpleGrid>

        <Text color="gray.500" fontSize="xs">
          {product.reference}
        </Text>
      </VStack>
    </Cell>
  );
}
