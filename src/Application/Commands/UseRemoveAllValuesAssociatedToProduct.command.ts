import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';

export default function UseRemoveAllValuesAssociatedToProductCommand() {
  const setProductCriterionValueCommand = UseSetProductCriterionValueListCommand();

  const removeAllValuesAssociatedToProductUuid = useCallback(
    (productUuid: string) => {
      setProductCriterionValueCommand(values => values.filter(value => value.productUuid !== productUuid));
    },
    [setProductCriterionValueCommand]
  );

  return removeAllValuesAssociatedToProductUuid;
}
