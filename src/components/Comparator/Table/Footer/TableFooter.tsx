import { Td, Tfoot, Tr } from "@chakra-ui/react";

import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { createEmptyCriterion } from "../../../../utils/criteria/criteria";

type TableFooterProps = {
  criteria: TCriterion[];
  products: TProduct[];
  addCriterion: Function;
};

const TableFooter = (props: TableFooterProps) => {
  return (
    <Tfoot>
      <Tr>
        {/*
         * CRITERION - ADD BUTTON
         */}
        <Td>
          <button
            onClick={() =>
              props.addCriterion(createEmptyCriterion(props.criteria.length))
            }
          >
            +
          </button>
        </Td>

        {/*
         * --------
         */}
        <Td />

        {/*
         * --------
         */}
        <Td />

        {/*
         * PRODUCTS - RANK
         */}
        {props.products.map((p) => (
          <Td key={p.id}>#{p.rank ?? " -"}</Td>
        ))}

        {/*
         * --------
         */}
        <Td />
      </Tr>
    </Tfoot>
  );
};

export default TableFooter;
