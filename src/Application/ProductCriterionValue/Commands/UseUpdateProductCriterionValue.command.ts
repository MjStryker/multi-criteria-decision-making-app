import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';
import { EventService } from '@/@Event/EventService';
import { ProductCriterionValueUpdatedEvent } from '../Events/ProductCriterionValueUpdated.event';

export default function UseUpdateProductCriterionValueCommand() {
  const setProductCriterionValueList = UseSetProductCriterionValueListCommand();

  const updateProductCriterionValue = useCallback(
    (updatedProductCriterionValue: ProductCriterionValueDto) => {
      setProductCriterionValueList(prev => {
        const index = prev.findIndex(item => item.uuid === updatedProductCriterionValue.uuid);

        if (index === -1) {
          throw Error('Product criterion value not found');
        }

        prev[index] = updatedProductCriterionValue;

        return prev;
      });

      console.log('command >> update >> productCriterionValue', updatedProductCriterionValue);

      EventService.emit(new ProductCriterionValueUpdatedEvent(updatedProductCriterionValue));
    },
    [setProductCriterionValueList]
  );

  return updateProductCriterionValue;
}
