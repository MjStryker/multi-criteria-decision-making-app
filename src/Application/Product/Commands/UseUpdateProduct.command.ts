import { useCallback } from 'react';
import UseSetProductListCommand from './UseSetProductList.command';
import { ProductDto } from '../Dtos/Product.dto';
import { EventService } from '@/@Event/EventService';
import { ProductUpdatedEvent } from '../Events/ProductUpdated.event';

export default function UseUpdateProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const updateProductCommand = useCallback(
    (updatedProduct: ProductDto) => {
      setProductListCommand(prev => {
        const index = prev.findIndex(c => c.uuid === updatedProduct.uuid);

        if (index === -1) {
          throw Error('Product not found');
        }

        const updatedProductList = [...prev];

        updatedProductList[index] = updatedProduct;

        return updatedProductList;
      });

      console.log('command >> update >> product', updatedProduct);

      EventService.emit(new ProductUpdatedEvent(updatedProduct));
    },
    [setProductListCommand]
  );

  return updateProductCommand;
}
