import { Box, SimpleGrid, Td, Text, VStack } from "@chakra-ui/react";

import EditProductButton from "./EditProductButton";
import { TProduct } from "../../../../types/products";
import { isValidNonEmptyString } from "../../../../utils/strings";
import { useHandleProductsFunctions } from "../../../../hooks/data/useHandleProducts";

type TableHeaderCellProps = {
  columnIdx: number;
  product: TProduct;
  updateProduct: useHandleProductsFunctions["updateProduct"];
  removeProduct: useHandleProductsFunctions["removeProduct"];
};

const TableHeaderCell = ({
  columnIdx,
  product,
  updateProduct,
  removeProduct,
}: TableHeaderCellProps) => {
  const hasName = isValidNonEmptyString(product.name);

  const defaultName = `Produit ${columnIdx + 1}`;

  return (
    <Td w="150px" maxW="150px" px={2} border="1px" borderColor="gray.100">
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
            {!hasName ? defaultName : product.name}
          </Text>

          <Box>
            <EditProductButton
              product={product}
              updateProduct={updateProduct}
              removeProduct={removeProduct}
            />
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
