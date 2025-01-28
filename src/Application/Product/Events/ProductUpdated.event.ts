import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

export class ProductUpdatedEvent extends AbstractEvent<ProductDto> {
  constructor(detail: ProductDto) {
    super(ProductUpdatedEvent.name, detail);
  }
}
