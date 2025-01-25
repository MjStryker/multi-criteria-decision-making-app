import { Box, SimpleGrid, Td, Text, VStack } from "@chakra-ui/react";

import EditProductButton from "./EditProductButton";

import { Product } from "@/types/Product";
import { isValidNotEmptyString } from "@/@Shared/@Utils/String";

const cellWidth = "150px";

type TableHeaderCellProps = {
  columnIdx: number;
  product: Product;
};

const TableHeaderCell = ({ columnIdx, product }: TableHeaderCellProps) => {
  return (
    <Td
      w={cellWidth}
      minW={cellWidth}
      maxW={cellWidth}
      px={2}
      border="1px"
      borderColor="gray.100"
    >
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
            <EditProductButton product={product} />
          </Box>
        </SimpleGrid>

        <Text color="gray.500" fontSize="xs">
          {product.reference}
        </Text>
      </VStack>
    </Td>
  );
};

export default TableHeaderCell;
