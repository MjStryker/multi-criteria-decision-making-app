import UseAddCriterionCommand from "@/Application/Commands/UseAddCriterion.command";
import UseGetProductListQuery from "@/Application/Queries/UseGetProductList.query";
import { createEmptyCriterion } from "@/utils/criteria/criteria";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Td, Tfoot, Tr } from "@chakra-ui/react";
import TableFooterCell from "./TableFooterCell";
import UseGetCriterionListQuery from "@/Application/Queries/UseGetCriterionList.query";
import { CRITERIA_MAX_ITEMS } from "@/@Config/Criteria";

export default function TableFooter() {
  const productList = UseGetProductListQuery();
  const criterionList = UseGetCriterionListQuery();
  const addCriterionCommand = UseAddCriterionCommand();

  const nbCriteria = criterionList.length;
  const nbCriteriaRemaining = CRITERIA_MAX_ITEMS - nbCriteria;

  function handleAddCriterion() {
    const newCriterion = createEmptyCriterion(nbCriteria);
    addCriterionCommand(newCriterion);
  }

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
            colorScheme={nbCriteriaRemaining > 0 ? "blue" : "gray"}
            onClick={() => handleAddCriterion()}
            leftIcon={<AddIcon fontSize="xs" />}
            boxShadow="base"
            transition="background .2s"
          >
            Add
          </Button>
        </Td>

        {/*
         * PRODUCTS - RANK
         */}
        {productList.map((product) => (
          <TableFooterCell key={product.id} product={product} />
        ))}

        {/*
         * --------
         */}
        <Td border="none" />
      </Tr>
    </Tfoot>
  );
}
