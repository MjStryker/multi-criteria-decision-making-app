import { EventService } from '@/@Event/EventService';
import UseGetProductListQuery from '@/Application/Product/Queries/UseGetProductList.query';
import UseAddProductCriterionValuesCommand from '@/Application/ProductCriterionValue/Commands/UseAddProductCriterionValues.command';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { ProductCriterionValueDtoFactory } from '@/Application/ProductCriterionValue/Dtos/ProductCriterionValueDto.factory';
import { useEffect } from 'react';
import { CriterionAddedEvent } from '@/Application/Criterion/Events/CriterionAdded.event';

export default function UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener() {
  const productList = UseGetProductListQuery();

  const addProductCriterionValues = UseAddProductCriterionValuesCommand();

  useEffect(() => {
    const handle = (event: CriterionAddedEvent) => {
      const criterionAdded = event.detail;

      const productCriterionValuesToAdd: ProductCriterionValueDto[] = [];

      for (const product of productList) {
        productCriterionValuesToAdd.push(ProductCriterionValueDtoFactory.newEmpty(product.uuid, criterionAdded.uuid));
      }

      addProductCriterionValues(productCriterionValuesToAdd);
    };

    EventService.subscribe(CriterionAddedEvent.name, handle);

    return () => EventService.unsubscribe(CriterionAddedEvent.name, handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
