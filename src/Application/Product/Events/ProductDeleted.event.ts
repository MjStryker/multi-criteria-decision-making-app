import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

export class ProductDeletedEvent extends AbstractEvent<ProductDto> {
  constructor(detail: ProductDto) {
    super(ProductDeletedEvent.name, detail);
  }
}
