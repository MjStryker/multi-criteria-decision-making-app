import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { useCallback } from 'react';
import UseSetCriterionListCommand from './UseSetCriterionList.command';
import { EventService } from '@/@Event/EventService';
import { CriterionRemovedEvent } from '../Events/CriterionRemoved.event';

export default function UseRemoveCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const removeCriterion = useCallback(
    (criterion: CriterionDto) => {
      setCriterionListCommand(criterionList => criterionList.filter(c => c.uuid !== criterion.uuid));

      console.log('command >> remove >> criterion', criterion);

      EventService.emit(new CriterionRemovedEvent(criterion));
    },
    [setCriterionListCommand]
  );

  return removeCriterion;
}
