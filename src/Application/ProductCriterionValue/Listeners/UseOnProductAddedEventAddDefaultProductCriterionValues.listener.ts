import { EventService } from '@/@Event/EventService';
import UseGetCriterionListQuery from '@/Application/Criterion/Queries/UseGetCriterionList.query';
import UseAddProductCriterionValuesCommand from '@/Application/ProductCriterionValue/Commands/UseAddProductCriterionValues.command';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { ProductCriterionValueDtoFactory } from '@/Application/ProductCriterionValue/Dtos/ProductCriterionValueDto.factory';
import { useEffect } from 'react';
import { ProductAddedEvent } from '@/Application/Product/Events/ProductAdded.event';

export default function UseOnProductAddedEventAddDefaultProductCriterionValuesListener() {
  const criterionList = UseGetCriterionListQuery();

  const addProductCriterionValues = UseAddProductCriterionValuesCommand();

  useEffect(() => {
    const handle = (event: ProductAddedEvent) => {
      console.log('listener >> onProductAdded >> addDefaultProductCriterionValues');

      const productAdded = event.detail;

      const productCriterionValuesToAdd: ProductCriterionValueDto[] = [];

      for (const criterion of criterionList) {
        productCriterionValuesToAdd.push(ProductCriterionValueDtoFactory.newEmpty(productAdded.uuid, criterion.uuid));
      }

      addProductCriterionValues(productCriterionValuesToAdd);
    };

    EventService.subscribe(ProductAddedEvent.name, handle);

    return () => EventService.unsubscribe(ProductAddedEvent.name, handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criterionList]);
}
