import { CriterionDto } from '@/Application/Dtos/Criterion.dto';
import { useCallback } from 'react';
import UseSetCriterionListCommand from './UseSetCriterionList.command';

export default function UseRemoveCriterionCommand() {
  const setCriterionListCommand = UseSetCriterionListCommand();

  const removeCriterion = useCallback(
    (criterion: CriterionDto) => {
      setCriterionListCommand(criterionList => criterionList.filter(c => c.uuid !== criterion.uuid));
    },
    [setCriterionListCommand]
  );

  return removeCriterion;
}
