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

export function capitalize(str: string | undefined): string | undefined {
  return isValidNonEmptyString(str)
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : undefined;
}

export function parseStringAsNumber(str: string): number | null {
  return isValidNonEmptyString(str) && !isNaN(parseFloat(str))
    ? parseFloat(str)
    : null;
}
