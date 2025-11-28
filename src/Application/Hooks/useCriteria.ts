import { getDefaultStore, useAtom, useSetAtom } from "jotai";

import { CriterionListSplitAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
import { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

export function useCriteria() {
  const [criterionListAtoms, dispatch] = useAtom(CriterionListSplitAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );

  const nbCriteria = criterionListAtoms.length;

  /**
   * Add a new criterion with default product criterion values
   */
  const addCriterion = () => {
    const store = getDefaultStore();
    const newCriterion = CriterionDto.newEmpty(nbCriteria);

    // Add criterion
    dispatch({
      type: "insert",
      value: newCriterion
    });

    // Add default product criterion values for all existing products
    setProductCriterionValueList(prev => [
      ...prev,
      ...store
        .get(ProductListAtom)
        .map(product =>
          ProductCriterionValueDto.newEmpty(product.uuid, newCriterion.uuid)
        )
    ]);
  };

  /**
   * Remove a criterion and its associated product criterion values
   */
  const removeCriterion = (criterionUuid: string) => {
    // Find the criterion atom
    const criterionAtom = criterionListAtoms.find(atom => {
      const store = getDefaultStore();
      return store.get(atom).uuid === criterionUuid;
    });

    if (!criterionAtom) return;

    // Remove criterion from list
    dispatch({
      type: "remove",
      atom: criterionAtom
    });

    // Remove all product criterion values associated with this criterion
    setProductCriterionValueList(prev =>
      prev.filter(pcv => pcv.criterionUuid !== criterionUuid)
    );
  };

  return {
    criterionListAtoms,
    nbCriteria,
    addCriterion,
    removeCriterion
  };
}
