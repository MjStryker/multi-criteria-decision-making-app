import { atom } from 'jotai';

export default function atomWithLocalStorage<T>(key: string, initialValue: T) {
  const getInitialValue = (): T => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(error);
        throw Error('Could not retrieve value from localStorage');
      }
    }
    return initialValue;
  };

  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    get => get(baseAtom),
    (get, set, update: T | ((prev: T) => T)) => {
      const nextValue = typeof update === 'function' ? (update as (prev: T) => T)(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
}
