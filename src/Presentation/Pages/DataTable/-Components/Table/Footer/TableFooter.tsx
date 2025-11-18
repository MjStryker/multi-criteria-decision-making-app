import { AddIcon } from "@chakra-ui/icons";
import { Button, Td, Tfoot, Tr } from "@chakra-ui/react";
import { getDefaultStore, useAtom, useAtomValue, useSetAtom } from "jotai";

import { CRITERIA_MAX_ITEMS } from "@/@Config/Criteria";
import { CriterionListSplitAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import {
  ProductListAtom,
  ProductListSplitAtom
} from "@/Application/Atoms/ProductList.atom";
import { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import TableFooterCell from "./TableFooterCell";

export default function TableFooter() {
  const productListAtoms = useAtomValue(ProductListSplitAtom);
  const [criterionListAtoms, dispatch] = useAtom(CriterionListSplitAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );

  const nbCriteria = criterionListAtoms.length;
  const nbCriteriaRemaining = CRITERIA_MAX_ITEMS - nbCriteria;

  function handleAddCriterion() {
    const store = getDefaultStore();
    const newCriterion = CriterionDto.newEmpty(nbCriteria);
    // Add criterion
    dispatch({
      type: "insert",
      value: newCriterion
    });
    // Add default product criterion values
    setProductCriterionValueList(prev => [
      ...prev,
      ...store
        .get(ProductListAtom)
        .map(product =>
          ProductCriterionValueDto.newEmpty(product.uuid, newCriterion.uuid)
        )
    ]);
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
            onClick={handleAddCriterion}
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
        {productListAtoms.map(productAtom => (
          <TableFooterCell key={`${productAtom}`} productAtom={productAtom} />
        ))}

        {/*
         * --------
         */}
        <Td border="none" />
      </Tr>
    </Tfoot>
  );
}
