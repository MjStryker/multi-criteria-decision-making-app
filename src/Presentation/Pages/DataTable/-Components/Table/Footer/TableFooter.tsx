import { Box, Icon, IconButton, Tfoot, Tr } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
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
import { ADD_PRODUCT_CELL_WIDTH, Cell } from "../Cell";
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
        <Cell colSpan={2} border="none" bg="transparent">
          <Box p={2}>
            <IconButton
              aria-label="Add criterion"
              w="full"
              size="sm"
              rounded="full"
              colorScheme={nbCriteriaRemaining > 0 ? "blue" : "gray"}
              onClick={handleAddCriterion}
            >
              <Icon boxSize="20px">
                <IconPlus />
              </Icon>
            </IconButton>
          </Box>
        </Cell>

        {/*
         * PRODUCTS - RANK
         */}
        {productListAtoms.map(productAtom => (
          <TableFooterCell key={`${productAtom}`} productAtom={productAtom} />
        ))}

        {/*
         * --------
         */}
        <Cell
          w={ADD_PRODUCT_CELL_WIDTH}
          minW={ADD_PRODUCT_CELL_WIDTH}
          maxW={ADD_PRODUCT_CELL_WIDTH}
          border="none"
          bg="transparent"
        />
      </Tr>
    </Tfoot>
  );
}
