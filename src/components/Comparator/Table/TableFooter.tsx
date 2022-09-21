import { createEmptyCriteria } from "../../../utils/criterias/criterias";
import useHandleCriterias from "../../../hooks/data/useHandleCriterias";

type TableFooterProps = {};

const TableFooter = (props: TableFooterProps) => {
  return (
    <tr>
      {/*
       * CRITERIA - ADD BUTTON
       */}
      <td>
        <button onClick={() => addCriteria(createEmptyCriteria(nbCriteria))}>
          +
        </button>
      </td>

      {/*
       * --------
       */}
      <td />

      {/*
       * CRITERIA - WEIGHT TOTAL
       */}
      <td style={STYLES.TD.CRITERIA_WEIGHT_TOTAL}>{weightTotal}</td>

      {/*
       * PRODUCTS - RANK
       */}
      {productsSorted.map((p) => (
        <td key={p.id} style={STYLES.TD.RES_ARRAY_POS}>
          #{p.rank ?? " -"}
        </td>
      ))}

      {/*
       * --------
       */}
      <td />
    </tr>
  );
};

export default TableFooter;
