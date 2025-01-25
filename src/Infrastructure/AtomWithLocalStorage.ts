import { atom } from "jotai";

export default function atomWithLocalStorage<T>(key: string, initialValue: T) {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(error);
        throw Error("Could not retrieve value from localStorage");
      }
    }
    return initialValue;
  };

  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
}
