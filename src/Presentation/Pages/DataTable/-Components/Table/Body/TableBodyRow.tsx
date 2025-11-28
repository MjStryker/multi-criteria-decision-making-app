import { Tr } from "@chakra-ui/react";
import { atom, type PrimitiveAtom, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";
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

  // Create a stable atom that only updates when the UUIDs for this criterion change
  const productCriterionUuidsAtom = useMemo(
    () =>
      selectAtom(
        ProductCriterionValueListAtom,
        list =>
          list
            .filter(({ criterionUuid }) => criterionUuid === criterion.uuid)
            .map(v => v.uuid),
        (a, b) => a.length === b.length && a.every((uuid, i) => uuid === b[i])
      ),
    [criterion.uuid]
  );

  const productCriterionUuids = useAtomValue(productCriterionUuidsAtom);

  const productCriterionValueAtoms = useMemo(
    () =>
      productCriterionUuids.map(uuid =>
        atom(
          get => {
            const val = get(ProductCriterionValueListAtom).find(
              v => v.uuid === uuid
            );
            if (!val) {
              throw new Error(`ProductCriterionValue ${uuid} not found`);
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
              v => v.uuid === uuid
            );
            if (!val) {
              throw new Error(`ProductCriterionValue ${uuid} not found`);
            }

            const updatedValue =
              typeof newValue === "function" ? newValue(val) : newValue;

            set(ProductCriterionValueListAtom, prev =>
              prev.map(v => (v.uuid === uuid ? updatedValue : v))
            );
          }
        )
      ),
    [productCriterionUuids]
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
      {productCriterionValueAtoms.map(criterionProductValueAtom => {
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
      <Cell minW={ADD_PRODUCT_CELL_WIDTH} border="none" bg="transparent" />
    </Tr>
  );
}
