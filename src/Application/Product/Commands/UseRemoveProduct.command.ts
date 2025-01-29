import { useCallback } from 'react';
import UseSetProductListCommand from './UseSetProductList.command';
import { ProductDto } from '../Dtos/Product.dto';
import { EventService } from '@/@Event/EventService';
import { ProductRemovedEvent } from '../Events/ProductRemoved.event';

export default function UseRemoveProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const removeProduct = useCallback(
    (product: ProductDto) => {
      setProductListCommand(productList => productList.filter(p => p.uuid !== product.uuid));

      console.log('command >> remove >> product', product);

      EventService.emit(new ProductRemovedEvent(product));
    },
    [setProductListCommand]
  );

  return removeProduct;
}
