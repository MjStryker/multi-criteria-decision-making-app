import { isDefined } from "./objects";

export const isValidNumber = (value: any): value is number =>
  isDefined(value) && typeof value === "number" && !isNaN(value);

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
