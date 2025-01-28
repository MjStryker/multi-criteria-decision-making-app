import { AbstractEvent } from '@/@Event/AbstractEvent';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';

export class CriterionDeletedEvent extends AbstractEvent<CriterionDto> {
  constructor(detail: CriterionDto) {
    super(CriterionDeletedEvent.name, detail);
  }
}
