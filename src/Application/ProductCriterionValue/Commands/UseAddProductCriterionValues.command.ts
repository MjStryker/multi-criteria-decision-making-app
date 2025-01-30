import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';
import { EventService } from '@/@Event/EventService';
import { ProductCriterionValuesAddedEvent } from '../Events/ProductCriterionValuesAdded.event';

export default function UseAddProductCriterionValuesCommand() {
  const setProductCriterionValueListCommand = UseSetProductCriterionValueListCommand();

  const addProductCriterionValue = useCallback(
    (newValues: ProductCriterionValueDto[]) => {
      if (newValues.length === 0) {
        return;
      }

      setProductCriterionValueListCommand(currentValues => [...currentValues, ...newValues]);

      console.log('command >> add >> productCriterionValues', newValues);

      EventService.emit(new ProductCriterionValuesAddedEvent(newValues));
    },
    [setProductCriterionValueListCommand]
  );

  return addProductCriterionValue;
}
