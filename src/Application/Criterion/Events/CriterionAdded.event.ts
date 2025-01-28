import { AbstractEvent } from '@/@Event/AbstractEvent';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

export class CriterionAddedEvent extends AbstractEvent<CriterionDto> {
  constructor(detail: CriterionDto) {
    super(CriterionAddedEvent.name, detail);
  }
}
