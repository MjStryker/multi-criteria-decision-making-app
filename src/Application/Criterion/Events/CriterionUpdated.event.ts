import { AbstractEvent } from '@/@Event/AbstractEvent';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

export class CriterionUpdatedEvent extends AbstractEvent<CriterionDto> {
  constructor(detail: CriterionDto) {
    super(CriterionUpdatedEvent.name, detail);
  }
}
