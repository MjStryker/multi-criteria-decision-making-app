import { AbstractEvent } from '@/@Event/AbstractEvent';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

export class CriterionRemovedEvent extends AbstractEvent<CriterionDto> {
  constructor(detail: CriterionDto) {
    super(CriterionRemovedEvent.name, detail);
  }
}
