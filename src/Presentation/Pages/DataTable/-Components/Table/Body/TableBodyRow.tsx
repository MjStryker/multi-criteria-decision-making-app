import { Tr } from "@chakra-ui/react";
import { atom, type PrimitiveAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";
import { ADD_PRODUCT_CELL_WIDTH, Cell } from "../Cell";
import CriterionNameUnitCell from "./Cell/CriterionNameUnitCell";
import CriterionWeightCell from "./Cell/CriterionWeightCell";
import CriterionProductValueCell from "./Cell/ProductCriterionValueCell";

type Props = {
  rowIdx: number;
  criterionAtom: PrimitiveAtom<CriterionDto>;
  criterionMaxWeight: number;
};

export default function TableBodyRow({
  rowIdx,
  criterionAtom,
  criterionMaxWeight
}: Props) {
  const criterion = useAtomValue(criterionAtom);
  const productCriterionValueList = useAtomValue(ProductCriterionValueListAtom);

  const productCriterionListValueAtoms = useMemo(
    () =>
      productCriterionValueList
        .filter(({ criterionUuid }) => criterion.uuid === criterionUuid)
        .map(productCriterionValue =>
          atom(
            get => {
              const val = get(ProductCriterionValueListAtom).find(
                v => v.uuid === productCriterionValue.uuid
              );
              if (!val) {
                throw new Error(
                  `ProductCriterionValue ${productCriterionValue.uuid} not found`
                );
              }
              return val;
            },
            (
              get,
              set,
              newValue:
                | ProductCriterionValueDto
                | ((prev: ProductCriterionValueDto) => ProductCriterionValueDto)
            ) => {
              const val = get(ProductCriterionValueListAtom).find(
                v => v.uuid === productCriterionValue.uuid
              );
              if (!val) {
                throw new Error(
                  `ProductCriterionValue ${productCriterionValue.uuid} not found`
                );
              }

              const updatedValue =
                typeof newValue === "function" ? newValue(val) : newValue;

              set(ProductCriterionValueListAtom, prev =>
                prev.map(v =>
                  v.uuid === productCriterionValue.uuid ? updatedValue : v
                )
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
      <CriterionNameUnitCell
        criterionAtom={criterionAtom}
        rowIdx={rowIdx}
        maxWeight={criterionMaxWeight}
      />

      {/*
       * CRITERION - WEIGHT
       */}
      <CriterionWeightCell criterionAtom={criterionAtom} />

      {/*
       * PRODUCTS - CRITERION VALUES
       */}
      {productCriterionListValueAtoms.map(criterionProductValueAtom => {
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
      <Cell
        border="none"
        w={ADD_PRODUCT_CELL_WIDTH}
        minW={ADD_PRODUCT_CELL_WIDTH}
        maxW={ADD_PRODUCT_CELL_WIDTH}
      />
    </Tr>
  );
}
