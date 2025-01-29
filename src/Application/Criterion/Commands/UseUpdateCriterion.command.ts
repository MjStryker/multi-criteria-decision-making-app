import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { useCallback } from 'react';
import UseSetCriterionListCommand from './UseSetCriterionList.command';
import { EventService } from '@/@Event/EventService';
import { CriterionUpdatedEvent } from '../Events/CriterionUpdated.event';

export default function UseUpdateCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const updateCriterionCommand = useCallback(
    (updatedCriterion: CriterionDto) => {
      setCriterionListCommand(prev => {
        const index = prev.findIndex(c => c.uuid === updatedCriterion.uuid);

        if (index === -1) {
          throw Error('Criterion not found');
        }

        const updatedCriterionList = [...prev];

        updatedCriterionList[index] = updatedCriterion;

        return updatedCriterionList;
      });

      console.log('command >> update >> criterion', updatedCriterion);

      EventService.emit(new CriterionUpdatedEvent(updatedCriterion));
    },
    [setCriterionListCommand]
  );

  return updateCriterionCommand;
}
