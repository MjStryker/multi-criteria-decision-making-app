import { AbstractEvent } from './AbstractEvent';

export class EventService {
  static emit<T>(event: AbstractEvent<T>) {
    console.log('event >> emit', event);
    document.dispatchEvent(event);
  }

  static subscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    document.addEventListener(eventName, e => listener(e as AbstractEvent<T>));
  }

  static unsubscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    document.removeEventListener(eventName, e => listener(e as AbstractEvent<T>));
  }
}
