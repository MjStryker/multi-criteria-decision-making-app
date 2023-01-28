import {
  Box,
  Flex,
  IconButton,
  SimpleGrid,
  Tag,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { CRITERION } from "../../../../constants/criteria";
import EditProductButton from "./EditProductButton";
import { TProduct } from "../../../../types/products";
import { createEmptyProduct } from "../../../../utils/products/products";

type TableHeaderProps = {
  products: TProduct[];
  addProduct: (product: TProduct) => void;
  updateProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
};

const TableHeader = ({
  products,
  addProduct,
  updateProduct,
  removeProduct,
}: TableHeaderProps) => {
  const handleAddProduct = () => {
    addProduct(createEmptyProduct(products.length));
  };

  return (
    <Thead>
      <Tr>
        {/*
         * --------
         */}
        <Td />

        {/*
         * CRITERIONS - MIN/MAX WEIGHT INFO
         */}
        <Td textAlign="center">
          <Flex
            h="full"
            direction="column"
            fontSize="xs"
            color="gray"
          >{`${CRITERION.WEIGHT.MIN} - ${CRITERION.WEIGHT.MAX}`}</Flex>
        </Td>

        {/*
         * PRODUCTS
         */}
        {products.map((product, idx) => {
          return (
            <Td key={product.id} w="150px" maxW="150px" px={2}>
              <VStack className="CellContainer" alignItems="stretch">
                <SimpleGrid
                  className="FirstRowContainer"
                  templateColumns="1fr auto"
                  alignItems="center"
                  gap={1}
                >
                  <Text whiteSpace="break-spaces" wordBreak="break-word">
                    {product.name ?? `Produit ${idx + 1}`}
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
        })}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Td border="none">
          <IconButton
            colorScheme="blue"
            aria-label="Add product"
            size="sm"
            icon={<AddIcon />}
            onClick={handleAddProduct}
            boxShadow="base"
          />
        </Td>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
