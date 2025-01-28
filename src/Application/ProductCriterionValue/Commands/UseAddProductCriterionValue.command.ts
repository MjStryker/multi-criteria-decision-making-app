import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';

export default function UseAddProductCriterionValueCommand() {
  const setProductCriterionValueListCommand = UseSetProductCriterionValueListCommand();

  const addProductCriterionValue = useCallback(
    (productCriterionValue: ProductCriterionValueDto) => {
      setProductCriterionValueListCommand(productCriterionValues => [...productCriterionValues, productCriterionValue]);
    },
    [setProductCriterionValueListCommand]
  );

  return addProductCriterionValue;
}
