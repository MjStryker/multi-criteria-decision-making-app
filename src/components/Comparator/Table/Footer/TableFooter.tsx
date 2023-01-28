import { Button, Td, Tfoot, Tr } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import TableFooterCell from "./TableFooterCell";
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
        <Td border="none" pl={0} pr={2} colSpan={2}>
          <Button
            w="full"
            size="sm"
            colorScheme="blue"
            onClick={handleAddCriterion}
            leftIcon={<AddIcon fontSize="xs" />}
            boxShadow="base"
          >
            Add
          </Button>
        </Td>

        {/*
         * PRODUCTS - RANK
         */}
        {products.map(({ id, rank }) => (
          <TableFooterCell key={id} productRank={rank} />
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
