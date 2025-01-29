import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export class ProductCriterionValuesRemovedEvent extends AbstractEvent<ProductCriterionValueDto[]> {
  constructor(detail: ProductCriterionValueDto[]) {
    super(ProductCriterionValuesRemovedEvent.name, detail);
  }
}
