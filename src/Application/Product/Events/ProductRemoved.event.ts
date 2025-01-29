import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

export class ProductRemovedEvent extends AbstractEvent<ProductDto> {
  constructor(detail: ProductDto) {
    super(ProductRemovedEvent.name, detail);
  }
}
