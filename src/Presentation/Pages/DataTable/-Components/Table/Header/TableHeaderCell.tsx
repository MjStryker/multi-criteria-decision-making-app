import { Box, SimpleGrid, Td, Text, VStack } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtom } from "jotai";

import { CELL_WIDTH } from "@/@Config/Table";
import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import EditProductButton from "./EditProductButton";

type Props = {
  columnIdx: number;
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function TableHeaderCell({ columnIdx, productAtom }: Props) {
  const [product] = useAtom(productAtom);

  return (
    <Td
      position="relative"
      minW={CELL_WIDTH}
      maxW={CELL_WIDTH}
      px={2}
      border="1px"
      borderColor="gray.100"
    >
      <Text position="absolute" top={0} left={0} fontSize="xs" opacity={0.5}>
        {columnIdx} - {product.uuid.slice(0, 8)}
      </Text>

      <VStack
        className="CellContainer"
        alignItems="stretch"
        justifyContent="space-between"
        minH="70px"
      >
        <SimpleGrid
          className="FirstRowContainer"
          templateColumns="1fr auto"
          alignItems="center"
          gap={1}
        >
          <Text
            whiteSpace="break-spaces"
            wordBreak="break-word"
            fontWeight="semibold"
          >
            {isValidNotEmptyString(product.name)
              ? product.name
              : `Product ${columnIdx + 1}`}
          </Text>

          <Box>
            <EditProductButton productAtom={productAtom} />
          </Box>
        </SimpleGrid>

        <Text color="gray.500" fontSize="xs">
          {product.reference}
        </Text>
      </VStack>
    </Td>
  );
}
