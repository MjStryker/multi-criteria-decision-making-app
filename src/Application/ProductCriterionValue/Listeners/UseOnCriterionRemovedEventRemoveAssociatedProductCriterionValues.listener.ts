import { EventService } from '@/@Event/EventService';
import { CriterionRemovedEvent } from '@/Application/Criterion/Events/CriterionRemoved.event';
import { useEffect } from 'react';
import UseRemoveAllProductCriterionValuesAssociatedToCriterionCommand from '../Commands/UseRemoveAllProductCriterionValuesAssociatedToCriterion.command';

export default function UseOnCriterionRemovedEventRemoveAssociatedProductCriterionValuesListener() {
  const removeAllProductCriterionValuesAssociatedToCriterion =
    UseRemoveAllProductCriterionValuesAssociatedToCriterionCommand();

  useEffect(() => {
    const handle = (event: CriterionRemovedEvent) => {
      const criterionRemoved = event.detail;
      removeAllProductCriterionValuesAssociatedToCriterion(criterionRemoved.uuid);
    };

    EventService.subscribe(CriterionRemovedEvent.name, handle);

    return () => EventService.unsubscribe(CriterionRemovedEvent.name, handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
