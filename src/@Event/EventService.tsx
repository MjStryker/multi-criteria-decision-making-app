import { AbstractEvent } from './AbstractEvent';

export class EventService {
  static emit<T>(event: AbstractEvent<T>) {
    console.log('event >> emit', { name: event.type, detail: event.detail });
    window.dispatchEvent(event);
  }

  static subscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    console.log('event >> subscribe', { eventName });
    window.addEventListener(eventName, e => listener(e as AbstractEvent<T>));
  }

  static unsubscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    console.log('event >> unsubscribe', { eventName });
    window.removeEventListener(eventName, e => listener(e as AbstractEvent<T>));
  }
}
