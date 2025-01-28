import { AbstractEvent } from './AbstractEvent';

export class EventService {
  static emit<T>(event: AbstractEvent<T>) {
    console.log('event >> emit', event);
    document.dispatchEvent(event);
  }

  static subscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    console.log('event >> subscribe', { eventName });
    document.addEventListener(eventName, e => {
      console.log('event >> received', { event: e });
      return listener(e as AbstractEvent<T>);
    });
  }

  static unsubscribe<T>(eventName: string, listener: (event: AbstractEvent<T>) => void) {
    console.log('event >> unsubscribe', { eventName });
    document.removeEventListener(eventName, e => {
      console.log('event >> received', { event: e });
      return listener(e as AbstractEvent<T>);
    });
  }
}
