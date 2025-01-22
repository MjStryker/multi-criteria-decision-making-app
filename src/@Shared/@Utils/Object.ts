export function deepEqual(x: any, y: any, verbose = false): boolean {
  if (x === y) {
    return true;
  } else if (
    typeof x == "object" &&
    isDefined(x) &&
    typeof y == "object" &&
    isDefined(y)
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }

    for (const prop in x) {
      if (Object.prototype.hasOwnProperty.call(y, prop)) {
        if (verbose) {
          console.log({ [prop]: { x: x[prop], y: y[prop] } });
        }
        if (x[prop] instanceof Map && y[prop] instanceof Map) {
          if (x[prop].size === y[prop].size) {
            return true;
          } else {
            return false;
          }
        } else if (!deepEqual(x[prop], y[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

export function isDefined<T>(obj: T): obj is Exclude<T, null | undefined> {
  return obj !== null && obj !== undefined;
}

export function areDefined(
  obj: unknown[]
): obj is Exclude<Exclude<unknown, null | undefined>[], null | undefined> {
  return obj.every(isDefined);
}
