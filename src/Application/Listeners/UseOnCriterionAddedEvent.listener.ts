import { EventService } from '@/@Event/EventService';
import { useEffect } from 'react';
import { CriterionAddedEvent } from '../Events/CriterionAdded.event';

export default function UseOnCriterionAddedEventListener() {
  useEffect(() => {
    const handleCriterionAddedEvent = (event: CriterionAddedEvent) => {
      console.log('Criterion added event received', event);
    };

    EventService.subscribe(CriterionAddedEvent.name, handleCriterionAddedEvent);

    return () => EventService.unsubscribe(CriterionAddedEvent.name, handleCriterionAddedEvent);
  }, []);
}
