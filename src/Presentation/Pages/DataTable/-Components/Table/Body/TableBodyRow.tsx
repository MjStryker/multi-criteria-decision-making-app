import { CELL_HEIGHT, CELL_WIDTH } from '@/@Config/Table';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductCriterionValueListAtom } from '@/Application/ProductCriterionValue/Atoms/ProductCriterionValueList.atom';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { Td, Tr } from '@chakra-ui/react';
import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import CriterionNameUnitCell from './Cell/CriterionNameUnitCell';
import CriterionWeightCell from './Cell/CriterionWeightCell';
import CriterionProductValueCell from './Cell/ProductCriterionValueCell';

type Props = {
  rowIdx: number;
  criterionAtom: PrimitiveAtom<CriterionDto>;
  criterionMaxWeight: number;
};

export default function TableBodyRow({ rowIdx, criterionAtom, criterionMaxWeight }: Props) {
  const criterion = useAtomValue(criterionAtom);
  const productCriterionValueList = useAtomValue(ProductCriterionValueListAtom);

  const productCriterionListValueAtoms = useMemo(
    () =>
      productCriterionValueList
        .filter(({ criterionUuid }) => criterion.uuid === criterionUuid)
        .map(productCriterionValue =>
          atom(
            get => {
              const val = get(ProductCriterionValueListAtom).find(v => v.uuid === productCriterionValue.uuid);
              if (!val) {
                throw new Error(`ProductCriterionValue ${productCriterionValue.uuid} not found`);
              }
              return val;
            },
            (
              get,
              set,
              newValue: ProductCriterionValueDto | ((prev: ProductCriterionValueDto) => ProductCriterionValueDto)
            ) => {
              const val = get(ProductCriterionValueListAtom).find(v => v.uuid === productCriterionValue.uuid);
              if (!val) {
                throw new Error(`ProductCriterionValue ${productCriterionValue.uuid} not found`);
              }

              const updatedValue = typeof newValue === 'function' ? newValue(val) : newValue;

              set(ProductCriterionValueListAtom, prev =>
                prev.map(v => (v.uuid === productCriterionValue.uuid ? updatedValue : v))
              );
            }
          )
        ),
    [criterion.uuid, productCriterionValueList]
  );

  return (
    <Tr>
      {/*
       * CRITERION - NAME / UNIT
       */}
      <CriterionNameUnitCell criterionAtom={criterionAtom} rowIdx={rowIdx} maxWeight={criterionMaxWeight} />

      {/*
       * CRITERION - WEIGHT
       */}
      <CriterionWeightCell criterionAtom={criterionAtom} />

      {/*
       * PRODUCTS - CRITERION VALUES
       */}
      {productCriterionListValueAtoms.map(criterionProductValueAtom => {
        // const criterionProductValue = productCriterionValueList.find(
        //   ({ criterionUuid, productUuid }) => criterion.uuid === criterionUuid && product.uuid === productUuid
        // );

        // if (!criterionProductValue) {
        //   return <Td key={product.uuid} />;
        // }

        return (
          <CriterionProductValueCell
            key={`${criterionProductValueAtom}`}
            productCriterionValueAtom={criterionProductValueAtom}
          />
        );
      })}

      {/*
       * --------
       */}
      <Td w={CELL_WIDTH} h={CELL_HEIGHT} border="none" />
    </Tr>
  );
}
