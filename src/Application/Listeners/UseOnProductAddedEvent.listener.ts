import { EventService } from '@/@Event/EventService';
import { useEffect } from 'react';
import { ProductAddedEvent } from '../Events/ProductAdded.event';

export default function UseOnProductAddedEventListener() {
  useEffect(() => {
    const handleProductAddedEvent = (event: ProductAddedEvent) => {
      console.log(event.key, event.detail);
    };

    EventService.subscribe(ProductAddedEvent.name, handleProductAddedEvent);

    return () => EventService.unsubscribe(ProductAddedEvent.name, handleProductAddedEvent);
  }, []);
}
