import { isDefined } from "./objects";

export function isValidNonEmptyString(
  str: string | null | undefined
): str is string {
  return isDefined(str) && typeof str === "string" && str.length > 0;
}

export function isAnyValidNonEmptyString(str: any[]): boolean {
  return str.some(isValidNonEmptyString);
}

export function areValidNonEmptyStrings(str: any[]): boolean {
  return str.every(isValidNonEmptyString);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseStringAsNumber(str: string): number | null {
  return isValidNonEmptyString(str) && !isNaN(parseFloat(str))
    ? parseFloat(str)
    : null;
}
