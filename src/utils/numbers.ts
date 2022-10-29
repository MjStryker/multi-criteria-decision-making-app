import { isDefined } from "./objects";

export function isValidNumber(value: any): value is number {
  return isDefined(value) && typeof value === "number" && !isNaN(value);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
