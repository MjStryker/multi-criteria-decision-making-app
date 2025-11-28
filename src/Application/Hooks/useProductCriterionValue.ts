import {
  getDefaultStore,
  type PrimitiveAtom,
  useAtom,
  useAtomValue
} from "jotai";
import { useState } from "react";

import { computeProductCriterionValueRankPts } from "@/@Compute/ComputeProductCriterionValueRankPoints";
import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import type { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

type UseProductCriterionValueProps = {
  productCriterionValueAtom: PrimitiveAtom<ProductCriterionValueDto>;
};

export function useProductCriterionValue({
  productCriterionValueAtom
}: UseProductCriterionValueProps) {
  const [productCriterionValue, setProductCriterionValue] = useAtom(
    productCriterionValueAtom
  );

  const debugMode = useAtomValue(AppSettingsAtoms.debugMode);
  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);

  const [value, setValue] = useState<number | null>(
    productCriterionValue?.value ?? null
  );

  /**
   * * Handle Input change / validation
   */
  const onChange = (stringValue: string) => {
    setValue(() =>
      isValidNotEmptyString(stringValue) ? Number(stringValue) : null
    );
  };

  const onSubmit = () => {
    const store = getDefaultStore();

    // Update value
    setProductCriterionValue({ ...productCriterionValue, value });

    if (autoRecompute) {
      // Recompute criterion rank points
      const criterion = store
        .get(CriterionListAtom)
        .find(c => c.uuid === productCriterionValue.criterionUuid);
      if (criterion) {
        const updatedRankPts = computeProductCriterionValueRankPts(
          [criterion],
          store.get(ProductCriterionValueListAtom)
        );
        store.set(ProductCriterionValueListAtom, updatedRankPts);
      }
    }
  };

  return {
    value,
    debugMode,
    rankPoints: productCriterionValue.criterionRankPts,
    onChange,
    onSubmit
  };
}
