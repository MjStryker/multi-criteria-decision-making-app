import {
  getDefaultStore,
  type PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import { useEffect, useState } from "react";

import { computeProductCriterionValueRankPts } from "@/@Compute/computeProductCriterionValueRankPoints";
import { computeProductRanks } from "@/@Compute/computeProductRanks";
import { CRITERION } from "@/@Config/Criteria";
import { clamp, isValidNumber } from "@/@Shared/@Utils/Number";
import { isDefined } from "@/@Shared/@Utils/Object";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";

type UseCriterionWeightProps = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
};

export function useCriterionWeight({ criterionAtom }: UseCriterionWeightProps) {
  const [criterion, setCriterion] = useAtom(criterionAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  const setProductList = useSetAtom(ProductListAtom);
  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);

  const [weight, setWeight] = useState<number | null>(criterion.weight || null);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setWeight(criterion.weight ?? null);
  }, [criterion.weight]);

  /**
   * * Handle Input change / validation
   */
  const onChange = (nextValue: string) => {
    const newWeight = parseFloat(nextValue);

    setWeight(
      isDefined(newWeight)
        ? clamp(newWeight, CRITERION.WEIGHT.MIN, CRITERION.WEIGHT.MAX)
        : null
    );
  };

  const onSubmit = () => {
    const newWeight = isValidNumber(weight)
      ? clamp(weight, CRITERION.WEIGHT.MIN, CRITERION.WEIGHT.MAX)
      : 0;

    // Update criterion weight
    setCriterion(prev => ({ ...prev, weight: newWeight }));

    // Recompute rank points if auto-recompute is enabled
    if (autoRecompute) {
      const store = getDefaultStore();
      const updatedCriterion = { ...criterion, weight: newWeight };
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
  };

  return {
    weight,
    beneficial: criterion.beneficial,
    onChange,
    onSubmit
  };
}
