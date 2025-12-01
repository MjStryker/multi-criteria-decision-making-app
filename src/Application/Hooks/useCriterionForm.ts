import {
  getDefaultStore,
  type PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import { type FormEvent, useEffect, useState } from "react";

import { computeProductCriterionValueRankPts } from "@/@Compute/computeProductCriterionValueRankPoints";
import { computeProductRanks } from "@/@Compute/computeProductRanks";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { useCriteria } from "./useCriteria";

type UseCriterionFormProps = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
  onClose: VoidFunction;
};

export function useCriterionForm({
  criterionAtom,
  onClose
}: UseCriterionFormProps) {
  const [criterion, setCriterion] = useAtom(criterionAtom);
  const { removeCriterion } = useCriteria();
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  const setProductList = useSetAtom(ProductListAtom);
  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);

  const [name, setName] = useState<string>(criterion.name || "");
  const [unit, setUnit] = useState<string>(criterion.unit || "");
  const [beneficial, setBeneficial] = useState<boolean | null>(
    criterion.beneficial
  );

  const isDirty =
    name !== criterion.name ||
    unit !== criterion.unit ||
    beneficial !== criterion.beneficial;

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(criterion.name || "");
  }, [criterion.name]);

  useEffect(() => {
    setUnit(criterion.unit || "");
  }, [criterion.unit]);

  useEffect(() => {
    setBeneficial(criterion.beneficial);
  }, [criterion.beneficial]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const onUnitChange = (e: FormEvent<HTMLInputElement>) =>
    setUnit(e.currentTarget.value);

  const toggleBeneficial = () => {
    setBeneficial(prev => !prev);
  };

  /**
   * * Form actions
   */
  const onSave = () => {
    const beneficialChanged = beneficial !== criterion.beneficial;

    // Update criterion
    setCriterion(prev => ({ ...prev, name, unit, beneficial }));

    // Recompute rank points if beneficial changed and auto-recompute is enabled
    if (autoRecompute && beneficialChanged) {
      const store = getDefaultStore();
      const updatedCriterion = { ...criterion, name, unit, beneficial };
      const updatedRankPts = computeProductCriterionValueRankPts(
        [updatedCriterion],
        store.get(ProductCriterionValueListAtom)
      );
      setProductCriterionValueList(updatedRankPts);

      // Compute overall product ranks
      const rankedProducts = computeProductRanks(
        store.get(ProductListAtom),
        updatedRankPts
      );
      setProductList(rankedProducts);
    }

    onClose();
  };

  const onDelete = () => {
    removeCriterion(criterion.uuid);
    onClose();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  return {
    name,
    unit,
    beneficial,
    isDirty,
    onNameChange,
    onUnitChange,
    toggleBeneficial,
    onSave,
    onDelete,
    onSubmit
  };
}
