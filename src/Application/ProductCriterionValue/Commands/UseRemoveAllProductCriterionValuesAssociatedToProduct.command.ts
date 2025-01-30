import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';
import { EventService } from '@/@Event/EventService';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';
import { ProductCriterionValuesRemovedEvent } from '../Events/ProductCriterionValuesRemoved.event';

export default function UseRemoveAllProductCriterionValuesAssociatedToProductCommand() {
  const setProductCriterionValueCommand = UseSetProductCriterionValueListCommand();

  const removeAllValuesAssociatedToProductUuid = useCallback(
    (productUuid: string) => {
      const removedValues: ProductCriterionValueDto[] = [];

      setProductCriterionValueCommand(values => {
        removedValues.push(...values.filter(value => value.productUuid === productUuid));
        return values.filter(value => value.productUuid !== productUuid);
      });

      console.log('command >> remove >> productCriterionValues', removedValues);

      EventService.emit(new ProductCriterionValuesRemovedEvent(removedValues));
    },
    [setProductCriterionValueCommand]
  );

  return removeAllValuesAssociatedToProductUuid;
}
