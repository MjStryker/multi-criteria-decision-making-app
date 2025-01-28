import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

export class ProductAddedEvent extends AbstractEvent<ProductDto> {
  constructor(detail: ProductDto) {
    super(ProductAddedEvent.name, detail);
  }
}
