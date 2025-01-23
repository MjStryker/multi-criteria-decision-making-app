export function isValidNotEmptyString(
  str: string | null | null | unknown
): str is string {
  if (str && typeof str === "string" && str.trim().length > 0) return true;
  return false;
}

export function capitalize<T = string | null>(
  str: T
): T extends string ? string : null {
  if (!isValidNotEmptyString(str))
    return null as T extends string ? string : null;

  const split = str.split("");
  const index = split.findIndex(
    (x) => x.toUpperCase() !== x || x.toLowerCase() !== x
  );

  if (index === -1) return str as T extends string ? string : null;

  split[index] = split[index].toUpperCase();
  return split.join("") as T extends string ? string : null;
}
