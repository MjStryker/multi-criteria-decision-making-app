import { Box, Icon, IconButton, Text, Thead, Tr } from "@chakra-ui/react";
import { IconPlus, IconWeight } from "@tabler/icons-react";

import { CRITERION } from "@/@Config/Criteria";
import { PRODUCTS_MAX_ITEMS } from "@/@Config/Product";
import { useProducts } from "@/Application/Hooks/useProducts";
import {
  ADD_PRODUCT_CELL_WIDTH,
  Cell,
  CRITERION_WEIGHT_CELL_WIDTH
} from "../Cell";
import { ProductCell } from "./ProductCell";

export default function TableHeader() {
  const { productListAtoms, nbProducts, addProduct } = useProducts();

  const nbProductsRemaining = PRODUCTS_MAX_ITEMS - nbProducts;

  return (
    <Thead>
      <Tr>
        {/*
         * SORT BUTTON
         */}
        <Cell border="none" bg="transparent">
          {/* <ButtonGroup variant="outline" size="sm" color="gray.500" isAttached>
            <IconButton
              aria-label="Sort criteria by weight"
              icon={<SortDownIcon />}
              onClick={() => sortCriteriaByWeight(SortByEnum.DESC)}
            />
            <IconButton
              aria-label="Sort criteria by weight"
              icon={<SortUpIcon />}
              onClick={() => sortCriteriaByWeight(SortByEnum.ASC)}
            />
          </ButtonGroup> */}
        </Cell>

        {/*
         * CRITERIA - WEIGHT INFO
         */}
        <Cell
          textAlign="center"
          w={CRITERION_WEIGHT_CELL_WIDTH}
          minW={CRITERION_WEIGHT_CELL_WIDTH}
          maxW={CRITERION_WEIGHT_CELL_WIDTH}
          border="none"
          bg="transparent"
        >
          <Icon as={IconWeight} color="gray.400" fontSize="xl" />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            fontFamily="monospace"
            color="gray.400"
            mt={-1}
          >{`${CRITERION.WEIGHT.MIN}-${CRITERION.WEIGHT.MAX}`}</Text>
        </Cell>

        {/*
         * PRODUCTS
         */}
        {productListAtoms.map((productAtom, idx) => (
          <ProductCell
            key={`${productAtom}`}
            columnIdx={idx}
            productAtom={productAtom}
          />
        ))}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Cell minW={ADD_PRODUCT_CELL_WIDTH} border="none" bg="transparent">
          <Box p={2}>
            <IconButton
              colorScheme={nbProductsRemaining > 0 ? "blue" : "gray"}
              aria-label="Add product"
              size="sm"
              rounded="full"
              icon={
                <Icon boxSize="20px">
                  <IconPlus />
                </Icon>
              }
              onClick={addProduct}
            />
          </Box>
        </Cell>
      </Tr>
    </Thead>
  );
}
