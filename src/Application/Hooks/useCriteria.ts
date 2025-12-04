import { getDefaultStore, useAtom, useAtomValue, useSetAtom } from "jotai";

import { computeProductCriterionValueRankPts } from "@/@Compute/computeProductCriterionValueRankPoints";
import { computeProductRanks } from "@/@Compute/computeProductRanks";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import {
  CriterionListAtom,
  CriterionListSplitAtom
} from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
import { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

export function useCriteria() {
  const [criterionListAtoms, dispatch] = useAtom(CriterionListSplitAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  const setProductList = useSetAtom(ProductListAtom);
  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);

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
    const store = getDefaultStore();

    // Find the criterion atom and its current index
    const criterionAtom = criterionListAtoms.find(atom => {
      return store.get(atom).uuid === criterionUuid;
    });

    if (!criterionAtom) return;

    // Find the index of the criterion being removed
    const removedIndex = criterionListAtoms.indexOf(criterionAtom);

    // First, re-index criteria that come after the removed one
    criterionListAtoms.forEach((atom, index) => {
      if (index > removedIndex) {
        const criterion = store.get(atom);
        // Decrement the index for criteria after the removed one
        store.set(atom, { ...criterion, defaultRowIdx: index - 1 });
      }
    });

    // Then remove the criterion from list
    dispatch({
      type: "remove",
      atom: criterionAtom
    });

    // Remove all product criterion values associated with this criterion
    const updatedValues = store
      .get(ProductCriterionValueListAtom)
      .filter(pcv => pcv.criterionUuid !== criterionUuid);

    setProductCriterionValueList(updatedValues);

    // Recompute ranks if auto-recompute is enabled
    if (autoRecompute) {
      const updatedCriteria = store
        .get(CriterionListAtom)
        .filter(c => c.uuid !== criterionUuid);

      const updatedRankPts = computeProductCriterionValueRankPts(
        updatedCriteria,
        updatedValues
      );
      setProductCriterionValueList(updatedRankPts);

      const rankedProducts = computeProductRanks(
        store.get(ProductListAtom),
        updatedRankPts
      );
      setProductList(rankedProducts);
    }
  };

  return {
    criterionListAtoms,
    nbCriteria,
    addCriterion,
    removeCriterion
  };
}
