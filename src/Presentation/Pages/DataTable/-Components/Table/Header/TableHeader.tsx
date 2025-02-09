import { Icon, IconButton, Td, Text, Thead, Tr } from '@chakra-ui/react';

import { CRITERION } from '@/@Config/Criteria';
import { PRODUCTS_MAX_ITEMS } from '@/@Config/Product';
import UseAddProductCommand from '@/Application/Product/Commands/UseAddProduct.command';
import { ProductListSplitAtom } from '@/Application/Product/Queries/UseGetProductList.query';

import { ProductDtoFactory } from '@/Application/Product/Dtos/ProductDto.factory';
import { AddIcon } from '@chakra-ui/icons';
import { useAtom } from 'jotai';
import { GiAnvil as AnvilIcon } from 'react-icons/gi';
import TableHeaderCell from './TableHeaderCell';

const ADD_PRODUCT_CELL_WIDTH = '50px';

export default function TableHeader() {
  const [productListAtoms, dispatch] = useAtom(ProductListSplitAtom);
  const addProductCommand = UseAddProductCommand();

  const nbProducts = productListAtoms.length;
  const nbProductsRemaining = PRODUCTS_MAX_ITEMS - nbProducts;

  const handleAddProduct = () => {
    addProductCommand(ProductDtoFactory.newEmpty(nbProducts));
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
        {productListAtoms.map((productAtom, idx) => (
          <TableHeaderCell
            key={`${productAtom}`}
            columnIdx={idx}
            productAtom={productAtom}
            remove={() => dispatch({ type: 'remove', atom: productAtom })}
          />
        ))}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Td border="none" w={ADD_PRODUCT_CELL_WIDTH} minW={ADD_PRODUCT_CELL_WIDTH} maxW={ADD_PRODUCT_CELL_WIDTH}>
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
}
