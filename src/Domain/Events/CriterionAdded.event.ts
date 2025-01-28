import { AbstractEvent } from '@/@Event/AbstractEvent';
import { CriterionDto } from '@/Application/Dtos/Criterion.dto';

export class CriterionAddedEvent extends AbstractEvent<CriterionDto> {
  constructor(detail: CriterionDto) {
    super(CriterionAddedEvent.name, detail);
  }
}
