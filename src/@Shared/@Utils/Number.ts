import { isDefined } from "./Object";

export function isValidNumber(value: number | null | null): value is number {
  return isDefined(value) && typeof value === "number" && !Number.isNaN(value);
}

export function clamp(value: number, min: number, max: number): number {
  return value > max ? max : value < min ? min : value;
}
