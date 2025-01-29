import { useCallback } from 'react';
import UseSetProductCriterionValueListCommand from './UseSetProductCriterionValueList.command';
import { EventService } from '@/@Event/EventService';
import { ProductCriterionValuesRemovedEvent } from '../Events/ProductCriterionValuesRemoved.event';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';

export default function UseRemoveAllValuesAssociatedToCriterionCommand() {
  const setProductCriterionValueCommand = UseSetProductCriterionValueListCommand();

  const removeAllValuesAssociatedToCriterionUuid = useCallback(
    (criterionUuid: string) => {
      const removedValues: ProductCriterionValueDto[] = [];

      setProductCriterionValueCommand(values => {
        removedValues.push(...values.filter(value => value.criterionUuid === criterionUuid));
        return values.filter(value => value.criterionUuid !== criterionUuid);
      });

      console.log('command >> remove >> productCriterionValues', removedValues);

      EventService.emit(new ProductCriterionValuesRemovedEvent(removedValues));
    },
    [setProductCriterionValueCommand]
  );

  return removeAllValuesAssociatedToCriterionUuid;
}
