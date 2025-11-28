import { type PrimitiveAtom, useAtom } from "jotai";
import { type FormEvent, useEffect, useState } from "react";

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
    setCriterion(prev => ({ ...prev, name, unit, beneficial }));
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
