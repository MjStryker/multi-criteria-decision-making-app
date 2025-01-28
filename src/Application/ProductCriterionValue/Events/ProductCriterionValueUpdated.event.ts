import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export class ProductCriterionValueUpdatedEvent extends AbstractEvent<ProductCriterionValueDto> {
  constructor(detail: ProductCriterionValueDto) {
    super(ProductCriterionValueUpdatedEvent.name, detail);
  }
}
