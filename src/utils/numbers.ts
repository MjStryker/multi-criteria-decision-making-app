import { isDefined } from "./objects";

export function isValidNumber(
  value: number | undefined | null
): value is number {
  return isDefined(value) && typeof value === "number" && !isNaN(value);
}

export function clamp(value: number, min: number, max: number): number {
  return value > max ? max : value < min ? min : value;
}
