import { CSSProperties } from "react";
import { TCriteria } from "../../../../types/criterias";
import { TProduct } from "../../../../types/products";
import { border } from "../../../../styles/tables/tableCell";
import { createEmptyCriteria } from "../../../../utils/criterias/criterias";

const STYLES = {
  TD: {
    PRODUCT_RANK: {
      border,
      textAlign: "right",
      fontWeight: "bold",
    } as CSSProperties,
  },
};

type TableFooterProps = {
  criterias: TCriteria[];
  products: TProduct[];
  addCriteria: Function;
};

const TableFooter = (props: TableFooterProps) => {
  return (
    <tfoot>
      <tr>
        {/*
         * CRITERIA - ADD BUTTON
         */}
        <td>
          <button
            onClick={() =>
              props.addCriteria(createEmptyCriteria(props.criterias.length))
            }
          >
            +
          </button>
        </td>

        {/*
         * --------
         */}
        <td />

        {/*
         * --------
         */}
        <td />

        {/*
         * PRODUCTS - RANK
         */}
        {props.products.map((p) => (
          <td key={p.id} style={STYLES.TD.PRODUCT_RANK}>
            #{p.rank ?? " -"}
          </td>
        ))}

        {/*
         * --------
         */}
        <td />
      </tr>
    </tfoot>
  );
};

export default TableFooter;
