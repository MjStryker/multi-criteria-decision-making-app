import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
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
            <Td key={product.id}>
              <VStack className="CellContainer" alignItems="stretch">
                <HStack
                  className="FirstRowContainer"
                  flex={1}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{product.name ?? `Produit ${idx + 1}`}</Text>

                  <EditProductButton
                    product={product}
                    updateProduct={updateProduct}
                    removeProduct={removeProduct}
                  />
                </HStack>

                <Tag color="gray.600" fontSize="xs">
                  {product.reference}
                </Tag>
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
          />
        </Td>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
