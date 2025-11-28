import { type PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useState } from "react";

import { CRITERION } from "@/@Config/Criteria";
import { clamp, isValidNumber } from "@/@Shared/@Utils/Number";
import { isDefined } from "@/@Shared/@Utils/Object";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";

type UseCriterionWeightProps = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
};

export function useCriterionWeight({ criterionAtom }: UseCriterionWeightProps) {
  const [criterion, setCriterion] = useAtom(criterionAtom);

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
    setCriterion(prev => ({ ...prev, weight: newWeight }));
  };

  return {
    weight,
    beneficial: criterion.beneficial,
    onChange,
    onSubmit
  };
}
