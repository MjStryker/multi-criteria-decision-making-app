import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductDto } from '../Dtos/Product.dto';

export class ProductAddedEvent extends AbstractEvent<ProductDto> {
  constructor(public payload: ProductDto) {
    super(ProductAddedEvent.name);
  }
}
