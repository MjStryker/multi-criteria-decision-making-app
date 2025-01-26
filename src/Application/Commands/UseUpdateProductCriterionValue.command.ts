import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';

export default function UseUpdateProductCriterionValueCommand() {
  const setProductCriterionValueList = UseSetProductCriterionValueListCommand();

  const updateProductCriterionValue = useCallback(
    (productUuid: string, criterionUuid: string, newValue: number | null) => {
      setProductCriterionValueList(prev => {
        const index = prev.findIndex(item => item.productUuid === productUuid && item.criterionUuid === criterionUuid);

        if (index === -1) {
          throw Error('Product criterion value not found');
        }

        const newProductCriterionValueList = [...prev];
        newProductCriterionValueList[index] = {
          ...newProductCriterionValueList[index],
          value: newValue
        };

        return newProductCriterionValueList;
      });
    },
    [setProductCriterionValueList]
  );

  return updateProductCriterionValue;
}
