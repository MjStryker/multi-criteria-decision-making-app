import { Icon, IconButton, Td, Text, Thead, Tr } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { GiAnvil as AnvilIcon } from "react-icons/gi";
import { CRITERION } from "../../../../constants/criteria";
import { DataContext } from "../../../../context/DataContext";
import TableHeaderCell from "./TableHeaderCell";
import { createEmptyProduct } from "../../../../utils/products/products";
import { useContext } from "react";

const addButtonCellWidth = "50px";

const TableHeader = () => {
  const { products, addProduct } = useContext(DataContext);

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
          <Icon as={AnvilIcon} color="gray.400" fontSize="2xl" />
          <Text
            fontSize="xs"
            color="gray.400"
          >{`${CRITERION.WEIGHT.MIN} - ${CRITERION.WEIGHT.MAX}`}</Text>
        </Td>

        {/*
         * PRODUCTS
         */}
        {products.map((product, idx) => (
          <TableHeaderCell key={product.id} columnIdx={idx} product={product} />
        ))}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Td
          border="none"
          w={addButtonCellWidth}
          minW={addButtonCellWidth}
          maxW={addButtonCellWidth}
        >
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
