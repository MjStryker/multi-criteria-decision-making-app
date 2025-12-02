import {
  getDefaultStore,
  type PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom
} from "jotai";
import { useState } from "react";

import { computeProductCriterionValueRankPts } from "@/@Compute/computeProductCriterionValueRankPoints";
import { computeProductRanks } from "@/@Compute/computeProductRanks";
import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListAtom } from "@/Application/Atoms/ProductList.atom";
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

  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  const setProductList = useSetAtom(ProductListAtom);

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

    // Create updated product criterion value
    const updatedValue = { ...productCriterionValue, value };

    if (autoRecompute) {
      // Recompute criterion rank points
      const criterion = store
        .get(CriterionListAtom)
        .find(c => c.uuid === productCriterionValue.criterionUuid);
      if (criterion) {
        // Get current values and update the one we just changed
        const currentValues = store.get(ProductCriterionValueListAtom);
        const valuesWithUpdate = currentValues.map(pcv =>
          pcv.uuid === updatedValue.uuid ? updatedValue : pcv
        );

        const updatedRankPts = computeProductCriterionValueRankPts(
          store.get(CriterionListAtom),
          valuesWithUpdate
        );
        setProductCriterionValueList(updatedRankPts);

        // Compute overall product ranks
        const rankedProducts = computeProductRanks(
          store.get(ProductListAtom),
          updatedRankPts
        );
        setProductList(rankedProducts);
      }
    } else {
      // If not auto-recomputing, just update the value directly
      setProductCriterionValue(updatedValue);
    }
  };

  return {
    value,
    rankPoints: productCriterionValue.criterionRankPts,
    onChange,
    onSubmit
  };
}
