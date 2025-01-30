import { AbstractEvent } from './AbstractEvent';

export const EVENT_SERVICE_CONTAINER_ID = 'event-service-container';

export class EventService {
  static container: HTMLElement | null = null;

  static provider(): HTMLElement {
    if (this.container === null) {
      this.container = document.getElementById(EVENT_SERVICE_CONTAINER_ID);
    }
    if (this.container === null) {
      throw new Error('EventServiceProvider not found');
    }
    return this.container;
  }

  static emit<T>(event: AbstractEvent<T>) {
    console.log('event >> emit', event);
    EventService.provider().dispatchEvent(event);
  }

  static subscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    console.log('event >> subscribe', { eventName });
    EventService.provider().addEventListener(eventName, e => listener(e as AbstractEvent<T>));
  }

  static unsubscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    console.log('event >> unsubscribe', { eventName });
    EventService.provider().removeEventListener(eventName, e => listener(e as AbstractEvent<T>));
  }
}

export function EventServiceProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        id={EVENT_SERVICE_CONTAINER_ID}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }}
      />
      {children}
    </>
  );
}
