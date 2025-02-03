import { EventService } from '@/@Event/EventService';
import { ProductRemovedEvent } from '@/Application/Product/Events/ProductRemoved.event';
import { useEffect } from 'react';
import UseRemoveAllProductCriterionValuesAssociatedToProductCommand from '../Commands/UseRemoveAllProductCriterionValuesAssociatedToProduct.command';

export default function UseOnProductRemovedEventRemoveAssociatedProductCriterionValuesListener() {
  const removeAllProductCriterionValuesAssociatedToProduct =
    UseRemoveAllProductCriterionValuesAssociatedToProductCommand();

  useEffect(() => {
    const handle = (event: ProductRemovedEvent) => {
      console.log('listener >> onProductRemoved >> removeAssociatedProductCriterionValues');
      const productRemoved = event.detail;
      removeAllProductCriterionValuesAssociatedToProduct(productRemoved.uuid);
    };

    EventService.subscribe(ProductRemovedEvent.name, handle);

    return () => EventService.unsubscribe(ProductRemovedEvent.name, handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
