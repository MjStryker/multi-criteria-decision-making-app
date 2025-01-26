import { CriterionDto } from '@/Application/Dtos/Criterion.dto';
import { useCallback } from 'react';
import UseSetCriterionListCommand from './UseSetCriterionList.command';

export default function UseUpdateCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const updateCriterionCommand = useCallback(
    (criterion: CriterionDto) => {
      setCriterionListCommand(prev => {
        const index = prev.findIndex(c => c.uuid === criterion.uuid);

        if (index === -1) {
          throw Error('Criterion not found');
        }

        const newCriterionList = [...prev];
        newCriterionList[index] = criterion;

        return newCriterionList;
      });
    },
    [setCriterionListCommand]
  );

  return updateCriterionCommand;
}
