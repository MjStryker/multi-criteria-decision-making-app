import { DataContext } from "@/context/DataContext";
import { Criterion } from "@/types/Criterion";
import { createEmptyProductCriterionValue } from "@/utils/productsWithCriteria/productsWithCriteria";
import { Td, Tr } from "@chakra-ui/react";
import { useContext } from "react";
import CriterionNameUnitCell from "./Cell/CriterionNameUnitCell";
import CriterionProductValueCell from "./Cell/CriterionProductValueCell";
import CriterionWeightCell from "./Cell/CriterionWeightCell";

type TableBodyRowProps = {
  rowIdx: number;
  criterion: Criterion;
  maxWeight: number;
};

const TableBodyRow = ({ rowIdx, criterion, maxWeight }: TableBodyRowProps) => {
  const { products, productsWithCriteria } = useContext(DataContext);

  return (
    <Tr key={criterion.id}>
      {/*
       * CRITERION - NAME / UNIT
       */}
      <CriterionNameUnitCell
        criterion={criterion}
        rowIdx={rowIdx}
        maxWeight={maxWeight}
      />

      {/*
       * CRITERION - WEIGHT
       */}
      <CriterionWeightCell criterion={criterion} />

      {/*
       * PRODUCTS - CRITERION VALUES
       */}
      {products.map((product) => {
        const criterionProductValue =
          productsWithCriteria.find(
            ({ criterionId: criteriaId, productId }) =>
              criteriaId === criterion.id && productId === product.id
          ) ?? createEmptyProductCriterionValue(product, criterion);

        return (
          <CriterionProductValueCell
            key={criterionProductValue.id}
            criterion={criterion}
            product={product}
            criterionProductValue={criterionProductValue}
          />
        );
      })}

      {/*
       * --------
       */}
      <Td border="none" />
    </Tr>
  );
};

export default TableBodyRow;
