import { Td, Tr } from "@chakra-ui/react";

import CriterionNameUnitCell from "./Cells/CriterionNameUnitCell";
import CriterionProductValueCell from "./Cells/CriterionProductValueCell";
import CriterionWeightCell from "./Cells/CriterionWeightCell";
import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { TProductWithCriterion } from "../../../../types/productsWithCriteria";
import { createEmptyProductCriterionValue } from "../../../../utils/productsWithCriteria/productsWithCriteria";
import { useHandleCriteriaFunctions } from "../../../../hooks/data/useHandleCriteria";
import { useHandleProductsWithCriteriaFunctions } from "../../../../hooks/data/useHandleProductsWithCriteria";

type TableBodyRowProps = {
  criterion: TCriterion;
  products: TProduct[];
  productsWithCriteria: TProductWithCriterion[];
  rowIdx: number;
  maxWeight: number;
  updateCriterion: useHandleCriteriaFunctions["updateCriterion"];
  removeCriterion: useHandleCriteriaFunctions["removeCriterion"];
  setProductCriterionValue: useHandleProductsWithCriteriaFunctions["setProductCriterionValue"];
};

const TableBodyRow = ({
  criterion,
  products,
  productsWithCriteria,
  rowIdx,
  maxWeight,
  updateCriterion,
  removeCriterion,
  setProductCriterionValue,
}: TableBodyRowProps) => {
  return (
    <Tr key={criterion.id}>
      {/*
       * CRITERION - NAME / UNIT
       */}
      <CriterionNameUnitCell
        criterion={criterion}
        rowIdx={rowIdx}
        maxWeight={maxWeight}
        updateCriterion={updateCriterion}
        removeCriterion={removeCriterion}
      />

      {/*
       * CRITERION - WEIGHT
       */}
      <CriterionWeightCell
        criterion={criterion}
        updateCriterion={updateCriterion}
      />

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
            setProductCriterionValue={setProductCriterionValue}
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
