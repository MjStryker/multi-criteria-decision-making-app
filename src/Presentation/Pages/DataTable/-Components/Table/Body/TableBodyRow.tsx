import UseGetProductCriterionValueListQuery from "@/Application/Queries/UseGetProductCriterionValueList.query";
import UseGetProductListQuery from "@/Application/Queries/UseGetProductList.query";
import { Criterion } from "@/types/Criterion";
import { createEmptyProductCriterionValue } from "@/utils/productsWithCriteria/productsWithCriteria";
import { Td, Tr } from "@chakra-ui/react";
import CriterionNameUnitCell from "./Cell/CriterionNameUnitCell";
import CriterionProductValueCell from "./Cell/ProductCriterionValueCell";
import CriterionWeightCell from "./Cell/CriterionWeightCell";

type Props = {
  rowIdx: number;
  criterion: Criterion;
  maxWeight: number;
};

export default function TableBodyRow({ rowIdx, criterion, maxWeight }: Props) {
  const productList = UseGetProductListQuery();
  const productCriterionValueList = UseGetProductCriterionValueListQuery();

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
      {productList.map((product) => {
        const criterionProductValue =
          productCriterionValueList.find(
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
}
