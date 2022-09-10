export function isDefined<T>(obj: T): obj is Exclude<T, null | undefined> {
  return obj !== null && obj !== undefined;
}

export function areDefined(
  obj: unknown[]
): obj is Exclude<Exclude<unknown, null | undefined>[], null | undefined> {
  return obj.every(isDefined);
}
