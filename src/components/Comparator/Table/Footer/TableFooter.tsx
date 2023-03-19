import { Button, Td, Tfoot, Tr, useToast } from "@chakra-ui/react";
import {
  CRITERIA_ITEMS_REMAINING_WARNING,
  CRITERIA_MAX_ITEMS,
} from "../../../../constants/criteria";

import { AddIcon } from "@chakra-ui/icons";
import { DataContext } from "../../../../context/DataContext";
import TableFooterCell from "./TableFooterCell";
import { createEmptyCriterion } from "../../../../utils/criteria/criteria";
import { useContext } from "react";

const TableFooter = () => {
  const { products, criteria, addCriterion } = useContext(DataContext);

  const toast = useToast();

  const nbCriteria = criteria.length;

  const nbCriteriaRemaining = CRITERIA_MAX_ITEMS - nbCriteria;

  const handleAddCriterion = () => {
    if (nbCriteriaRemaining === 0) {
      toast({
        status: "error",
        title: "Cannot add another criterion",
        description: `Maximum number of criteria reached (${CRITERIA_MAX_ITEMS}/${CRITERIA_MAX_ITEMS})`,
      });
      return;
    }

    if (nbCriteriaRemaining - 1 <= CRITERIA_ITEMS_REMAINING_WARNING) {
      const label = nbCriteriaRemaining - 1 === 1 ? "criterion" : "criteria";

      toast({
        status: "warning",
        title: `${nbCriteriaRemaining - 1} ${label} remaining`,
      });
    }

    addCriterion(createEmptyCriterion(nbCriteria));
  };

  return (
    <Tfoot>
      <Tr>
        {/*
         * CRITERION - ADD BUTTON
         */}
        <Td border="none" pl={1} pr={2} colSpan={2}>
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
        {products.map((product) => (
          <TableFooterCell key={product.id} product={product} />
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
