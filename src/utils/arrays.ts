import { areDefined, isDefined } from "./objects";

import { TSortBy } from "../types/arrays";

export const compareFn =
  (sortBy: TSortBy) =>
  <T>(a: T, b: T): number => {
    if (typeof a === "string" && typeof b === "string") {
      return compareStringFn(sortBy)(a, b);
    }
    if (typeof a === "number" && typeof b === "number") {
      return compareNumberFn(sortBy)(a, b);
    }
    return 0;
  };

const compareStringFn =
  (sortBy: TSortBy) =>
  (a: string, b: string): number => {
    let res = 0;
    if (areDefined([a, b])) {
      res = a.localeCompare(b);
    }
    if (!isDefined(a)) {
      res = -1;
    }
    if (!isDefined(b)) {
      res = 1;
    }
    return res * sortBy;
  };

const compareNumberFn =
  (sortBy: TSortBy) =>
  (a: number, b: number): number => {
    let res = 0;
    if (areDefined([a, b])) {
      res = a - b;
    }
    if (!isDefined(a)) {
      res = -1;
    }
    if (!isDefined(b)) {
      res = 1;
    }
    return res * sortBy;
  };
