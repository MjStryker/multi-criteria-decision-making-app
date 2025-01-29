import { AbstractEvent } from '@/@Event/AbstractEvent';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';

export class ProductCriterionValuesAddedEvent extends AbstractEvent<ProductCriterionValueDto[]> {
  constructor(detail: ProductCriterionValueDto[]) {
    super(ProductCriterionValuesAddedEvent.name, detail);
  }
}
