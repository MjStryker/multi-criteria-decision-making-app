import { useCallback } from 'react';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';
import { ProductCriterionValueDtoFactory } from '../Dtos/ProductCriterionValueDto.factory';
import UseGetCriterionListQuery from '../../Criterion/Queries/UseGetCriterionList.query';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';

export default function UseAddDefaultValuesForNewProductCommand() {
  const criterionList = UseGetCriterionListQuery();
  const setProductCriterionValueListCommand = UseSetProductCriterionValueListCommand();

  const addDefaultValuesForNewProductCommand = useCallback(
    (productUuid: string) => {
      const newProductCriterionValues: ProductCriterionValueDto[] = [];

      criterionList.forEach(criterion => {
        newProductCriterionValues.push(ProductCriterionValueDtoFactory.newEmpty(productUuid, criterion.uuid));
      });

      setProductCriterionValueListCommand(values => [...values, ...newProductCriterionValues]);
    },
    [criterionList, setProductCriterionValueListCommand]
  );

  return addDefaultValuesForNewProductCommand;
}
