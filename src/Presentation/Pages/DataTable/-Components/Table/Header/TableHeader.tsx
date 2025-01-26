import { Icon, IconButton, Td, Text, Thead, Tr } from '@chakra-ui/react';

import { CRITERION } from '@/@Config/Criteria';
import { PRODUCTS_MAX_ITEMS } from '@/@Config/Product';
import UseAddProductCommand from '@/Application/Commands/UseAddProduct.command';
import UseGetProductListQuery from '@/Application/Queries/UseGetProductList.query';

import { AddIcon } from '@chakra-ui/icons';
import { GiAnvil as AnvilIcon } from 'react-icons/gi';
import TableHeaderCell from './TableHeaderCell';
import { ProductFactory } from '@/Application/Factories/Product.factory';

const addButtonCellWidth = '50px';

const TableHeader = () => {
  const productList = UseGetProductListQuery();
  const addProductCommand = UseAddProductCommand();

  const nbProducts = productList.length;
  const nbProductsRemaining = PRODUCTS_MAX_ITEMS - nbProducts;

  const handleAddProduct = () => {
    addProductCommand(ProductFactory.newEmpty(nbProducts));
  };

  return (
    <Thead>
      <Tr>
        {/*
         * SORT BUTTON
         */}
        <Td px={2}>
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
        </Td>

        {/*
         * CRITERIONS - MIN/MAX WEIGHT INFO
         */}
        <Td textAlign="center">
          <Icon as={AnvilIcon} color="gray.400" fontSize="2xl" />
          <Text fontSize="xs" color="gray.400">{`${CRITERION.WEIGHT.MIN} - ${CRITERION.WEIGHT.MAX}`}</Text>
        </Td>

        {/*
         * PRODUCTS
         */}
        {productList.map((product, idx) => (
          <TableHeaderCell key={product.uuid} columnIdx={idx} product={product} />
        ))}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Td border="none" w={addButtonCellWidth} minW={addButtonCellWidth} maxW={addButtonCellWidth}>
          <IconButton
            colorScheme={nbProductsRemaining > 0 ? 'blue' : 'gray'}
            aria-label="Add product"
            size="sm"
            icon={<AddIcon />}
            onClick={handleAddProduct}
            boxShadow="base"
            transition="background .2s"
          />
        </Td>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
