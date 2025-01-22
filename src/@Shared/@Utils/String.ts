export function isValidNotEmptyString(
  str: string | null | undefined | unknown
): str is string {
  if (str && typeof str === "string" && str.trim().length > 0) return true;
  return false;
}

export function capitalize<T = string | undefined>(
  str: T
): T extends string ? string : undefined {
  if (!isValidNotEmptyString(str))
    return undefined as T extends string ? string : undefined;

  const split = str.split("");
  const index = split.findIndex(
    (x) => x.toUpperCase() !== x || x.toLowerCase() !== x
  );

  if (index === -1) return str as T extends string ? string : undefined;

  split[index] = split[index].toUpperCase();
  return split.join("") as T extends string ? string : undefined;
}
