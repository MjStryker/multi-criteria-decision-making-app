import UseGetProductCriterionValueListQuery from '@/Application/ProductCriterionValue/Queries/UseGetProductCriterionValueList.query';
import UseGetProductListQuery from '@/Application/Product/Queries/UseGetProductList.query';

import { Td, Tr } from '@chakra-ui/react';
import CriterionNameUnitCell from './Cell/CriterionNameUnitCell';
import CriterionProductValueCell from './Cell/ProductCriterionValueCell';
import CriterionWeightCell from './Cell/CriterionWeightCell';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

type Props = {
  rowIdx: number;
  criterion: CriterionDto;
  maxWeight: number;
};

export default function TableBodyRow({ rowIdx, criterion, maxWeight }: Props) {
  const productList = UseGetProductListQuery();
  const productCriterionValueList = UseGetProductCriterionValueListQuery();

  return (
    <Tr key={criterion.uuid}>
      {/*
       * CRITERION - NAME / UNIT
       */}
      <CriterionNameUnitCell criterion={criterion} rowIdx={rowIdx} maxWeight={maxWeight} />

      {/*
       * CRITERION - WEIGHT
       */}
      <CriterionWeightCell criterion={criterion} />

      {/*
       * PRODUCTS - CRITERION VALUES
       */}
      {productList.map(product => {
        const criterionProductValue = productCriterionValueList.find(
          ({ criterionUuid, productUuid }) => criterion.uuid === criterionUuid && product.uuid === productUuid
        );

        if (!criterionProductValue) {
          return <Td key={product.uuid} />;
        }

        return (
          <CriterionProductValueCell
            key={criterionProductValue.uuid}
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
