import { areDefined, isDefined } from "./objects";

import { SORT_BY } from "../constants/arrays";

export const compareFn =
  (sortBy: SORT_BY) =>
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
  (sortBy: SORT_BY) =>
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
  (sortBy: SORT_BY) =>
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
