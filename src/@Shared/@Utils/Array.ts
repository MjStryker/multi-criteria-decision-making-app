import { SortByEnum } from '../@Enums/SortBy.enum';
import { areDefined, isDefined } from './Object';

export const compareFn =
  (sortBy: SortByEnum) =>
  <T>(a: T, b: T): number => {
    if (typeof a === 'string' && typeof b === 'string') {
      return compareStringFn(sortBy)(a, b);
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return compareNumberFn(sortBy)(a, b);
    }
    if (a !== null && a !== undefined && (b === null || b === undefined)) {
      return 1;
    }
    if ((a === null || a === undefined) && b !== null && b !== undefined) {
      return -1;
    }
    return 0;
  };

const compareStringFn =
  (sortBy: SortByEnum) =>
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
  (sortBy: SortByEnum) =>
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
