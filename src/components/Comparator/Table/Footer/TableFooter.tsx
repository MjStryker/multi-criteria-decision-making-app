import {
  Button,
  ButtonGroup,
  IconButton,
  Td,
  Tfoot,
  Tr,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { createEmptyCriterion } from "../../../../utils/criteria/criteria";

type TableFooterProps = {
  criteria: TCriterion[];
  products: TProduct[];
  addCriterion: Function;
};

const TableFooter = ({
  criteria,
  products,
  addCriterion,
}: TableFooterProps) => {
  const handleAddCriterion = () => {
    addCriterion(createEmptyCriterion(criteria.length));
  };

  return (
    <Tfoot>
      <Tr>
        {/*
         * CRITERION - ADD BUTTON
         */}
        <Td border="none" px={0}>
          <Button
            w="full"
            size="sm"
            colorScheme="blue"
            onClick={handleAddCriterion}
            leftIcon={<AddIcon fontSize="xs" />}
          >
            Add criterion
          </Button>
        </Td>

        {/*
         * --------
         */}
        <Td border="none" />

        {/*
         * --------
         */}
        <Td border="none" />

        {/*
         * PRODUCTS - RANK
         */}
        {products.map((p) => (
          <Td key={p.id}>#{p.rank ?? " -"}</Td>
        ))}

        {/*
         * --------
         */}
        <Td border="none" />
      </Tr>
    </Tfoot>
  );
};

export default TableFooter;
