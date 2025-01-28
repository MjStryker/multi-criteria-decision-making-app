import { EventService } from '@/@Event/EventService';
import { ProductAddedEvent } from '@/Application/Product/Events/ProductAdded.event';
import { useEffect } from 'react';

export default function UseOnProductAddedEventListener() {
  useEffect(() => {
    const handleProductAddedEvent = (event: ProductAddedEvent) => {
      console.log(event.key, event.detail);
    };

    EventService.subscribe(ProductAddedEvent.name, handleProductAddedEvent);

    return () => EventService.unsubscribe(ProductAddedEvent.name, handleProductAddedEvent);
  }, []);
}
