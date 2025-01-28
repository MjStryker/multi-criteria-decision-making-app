import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductCriterionValueDto } from '@/Application/Dtos/ProductCriteriaValue.dto';

export class ProductCriterionValueAddedEvent extends AbstractEvent<ProductCriterionValueDto> {
  constructor(detail: ProductCriterionValueDto) {
    super(ProductCriterionValueAddedEvent.name, detail);
  }
}
