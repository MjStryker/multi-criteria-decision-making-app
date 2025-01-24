import { describe, it, expect } from "vitest";

import { SortByEnum } from "../@Enums/SortBy.enum";
import { compareFn } from "./Array";

const ASC = SortByEnum.ASC;
const DESC = SortByEnum.DESC;

const sortedStringArray = {
  ASC: ["a", "b", "c", null],
  DESC: ["c", "b", "a", null],
};

const sortedNumberArray = {
  ASC: [-1, 0, 1, null],
  DESC: [1, 0, -1, null],
};

describe("compareFn", () => {
  describe("Comparing strings)", () => {
    describe("ASC", () => {
      it("Already sorted string array", () => {
        expect(sortedStringArray.ASC.sort(compareFn(ASC))).toStrictEqual(
          sortedStringArray.ASC
        );
      });

      it("Unsorted string array", () => {
        expect(["b", "a", null, "c"].sort(compareFn(ASC))).toStrictEqual(
          sortedStringArray.ASC
        );
      });
    });

    describe("DESC", () => {
      it("Already sorted string array", () => {
        expect(sortedStringArray.DESC.sort(compareFn(DESC))).toStrictEqual(
          sortedStringArray.DESC
        );
      });

      it("Unsorted string array", () => {
        expect(["b", null, "a", "c"].sort(compareFn(DESC))).toStrictEqual(
          sortedStringArray.DESC
        );
      });
    });
  });

  describe("Comparing numbers)", () => {
    describe("ASC", () => {
      it("Already sorted number array", () => {
        expect(sortedNumberArray.ASC.sort(compareFn(ASC))).toStrictEqual(
          sortedNumberArray.ASC
        );
      });

      it("Unsorted number array", () => {
        expect([0, -1, null, 1].sort(compareFn(ASC))).toStrictEqual(
          sortedNumberArray.ASC
        );
      });
    });

    describe("DESC", () => {
      it("Already sorted number array", () => {
        expect(sortedNumberArray.DESC.sort(compareFn(DESC))).toStrictEqual(
          sortedNumberArray.DESC
        );
      });

      it("Unsorted number array", () => {
        expect([0, null, -1, 1].sort(compareFn(DESC))).toStrictEqual(
          sortedNumberArray.DESC
        );
      });
    });
  });
});
