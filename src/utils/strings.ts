export const isValidNonEmptyString = (
  str: string | null | undefined
): boolean => {
  if (str && typeof str === "string" && str.length > 0) return true;
  return false;
};

export function isAnyValidNonEmptyString(str: any[]): boolean {
  return str.some(isValidNonEmptyString);
}

export function areValidNonEmptyStrings(str: any[]): boolean {
  return str.every(isValidNonEmptyString);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
