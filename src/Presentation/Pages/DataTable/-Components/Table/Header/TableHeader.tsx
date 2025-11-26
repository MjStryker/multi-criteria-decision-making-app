import { Box, Icon, IconButton, Text, Thead, Tr } from "@chakra-ui/react";
import { IconPlus, IconWeight } from "@tabler/icons-react";
import { getDefaultStore, useAtom, useSetAtom } from "jotai";

import { CRITERION } from "@/@Config/Criteria";
import { PRODUCTS_MAX_ITEMS } from "@/@Config/Product";
import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListSplitAtom } from "@/Application/Atoms/ProductList.atom";
import { ProductDto } from "@/Application/Dtos/Product.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import {
  ADD_PRODUCT_CELL_WIDTH,
  Cell,
  CRITERION_WEIGHT_CELL_WIDTH
} from "../Cell";
import TableHeaderCell from "./TableHeaderCell";

export default function TableHeader() {
  const [productListAtoms, dispatch] = useAtom(ProductListSplitAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );

  const nbProducts = productListAtoms.length;
  const nbProductsRemaining = PRODUCTS_MAX_ITEMS - nbProducts;

  const handleAddProduct = () => {
    const store = getDefaultStore();
    const newProduct = ProductDto.newEmpty(nbProducts);
    // Add product
    dispatch({
      type: "insert",
      value: newProduct
    });
    // Add default product criterion values
    setProductCriterionValueList(prev => [
      ...prev,
      ...store
        .get(CriterionListAtom)
        .map(criterion =>
          ProductCriterionValueDto.newEmpty(newProduct.uuid, criterion.uuid)
        )
    ]);
  };

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
          <TableHeaderCell
            key={`${productAtom}`}
            columnIdx={idx}
            productAtom={productAtom}
          />
        ))}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Cell
          w={ADD_PRODUCT_CELL_WIDTH}
          minW={ADD_PRODUCT_CELL_WIDTH}
          maxW={ADD_PRODUCT_CELL_WIDTH}
          border="none"
          bg="transparent"
        >
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
              onClick={handleAddProduct}
            />
          </Box>
        </Cell>
      </Tr>
    </Thead>
  );
}
