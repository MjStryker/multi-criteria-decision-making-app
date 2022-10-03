import { CSSProperties } from "react";
import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { border } from "../../../../styles/tables/tableCell";
import { createEmptyCriterion } from "../../../../utils/criteria/criteria";

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
  criteria: TCriterion[];
  products: TProduct[];
  addCriterion: Function;
};

const TableFooter = (props: TableFooterProps) => {
  return (
    <tfoot>
      <tr>
        {/*
         * CRITERION - ADD BUTTON
         */}
        <td>
          <button
            onClick={() =>
              props.addCriterion(createEmptyCriterion(props.criteria.length))
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
