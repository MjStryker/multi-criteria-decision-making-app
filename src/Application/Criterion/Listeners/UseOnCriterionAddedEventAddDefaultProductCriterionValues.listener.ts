import { EventService } from '@/@Event/EventService';
import { useEffect } from 'react';
import { CriterionAddedEvent } from '../Events/CriterionAdded.event';

export default function UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener() {
  useEffect(() => {
    const handleCriterionAddedEvent = (event: CriterionAddedEvent) => {
      console.log(event.key, event.detail);
    };

    EventService.subscribe(CriterionAddedEvent.name, handleCriterionAddedEvent);

    return () => EventService.unsubscribe(CriterionAddedEvent.name, handleCriterionAddedEvent);
  }, []);
}
