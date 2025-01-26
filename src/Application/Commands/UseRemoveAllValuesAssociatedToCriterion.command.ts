import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';

export default function UseRemoveAllValuesAssociatedToCriterionCommand() {
  const setProductCriterionValueCommand = UseSetProductCriterionValueListCommand();

  const removeAllValuesAssociatedToCriterionUuid = useCallback(
    (criterionUuid: string) => {
      setProductCriterionValueCommand(values => values.filter(value => value.criterionUuid !== criterionUuid));
    },
    [setProductCriterionValueCommand]
  );

  return removeAllValuesAssociatedToCriterionUuid;
}
