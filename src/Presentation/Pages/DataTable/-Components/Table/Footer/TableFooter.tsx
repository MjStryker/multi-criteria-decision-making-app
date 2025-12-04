import { Box, Icon, IconButton, Tfoot, Tr } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";

import { CRITERIA_MAX_ITEMS } from "@/@Config/Criteria";
import { ProductListSplitAtom } from "@/Application/Atoms/ProductList.atom";
import { useCriteria } from "@/Application/Hooks/useCriteria";
import { ADD_PRODUCT_CELL_WIDTH, Cell } from "../Cell";

export default function TableFooter() {
  const productListAtoms = useAtomValue(ProductListSplitAtom);
  const { nbCriteria, addCriterion } = useCriteria();

  const nbCriteriaRemaining = CRITERIA_MAX_ITEMS - nbCriteria;

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
              onClick={addCriterion}
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
        {productListAtoms.map((_, idx) => (
          <Cell
            key={`product-${
              // biome-ignore lint/suspicious/noArrayIndexKey: Test
              idx
            }`}
            border="none"
            bg="transparent"
          />
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
