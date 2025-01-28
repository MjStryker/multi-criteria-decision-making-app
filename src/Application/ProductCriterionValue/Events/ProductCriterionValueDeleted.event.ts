import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export class ProductCriterionValueDeletedEvent extends AbstractEvent<ProductCriterionValueDto> {
  constructor(detail: ProductCriterionValueDto) {
    super(ProductCriterionValueDeletedEvent.name, detail);
  }
}
