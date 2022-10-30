import { SORT_BY } from "../constants/arrays";
import { compareFn } from "./arrays";

describe("compareFn(...)", () => {
  const ASC = SORT_BY.ASC;
  const DESC = SORT_BY.DESC;

  const sortedStringArray = {
    ASC: ["a", "b", "c", undefined],
    DESC: ["c", "b", "a", undefined],
  };

  const sortedNumberArray = {
    ASC: [-1, 0, 1, undefined],
    DESC: [-1, 0, 1, undefined],
  };

  describe("Comparing string[])", () => {
    describe("ASC", () => {
      it("Already sorted string array", () => {
        expect(sortedStringArray.ASC.sort(compareFn(ASC))).toStrictEqual(
          sortedStringArray.ASC
        );
      });

      it("Unsorted string array", () => {
        expect(["b", "a", undefined, "c"].sort(compareFn(ASC))).toStrictEqual(
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
        expect(["b", undefined, "a", "c"].sort(compareFn(DESC))).toStrictEqual(
          sortedStringArray.DESC
        );
      });
    });
  });

  describe("Comparing number[])", () => {
    describe("ASC", () => {
      it("Already sorted number array", () => {
        expect(sortedNumberArray.ASC.sort(compareFn(ASC))).toStrictEqual(
          sortedNumberArray.ASC
        );
      });

      it("Unsorted number array", () => {
        expect([0, -1, undefined, 1].sort(compareFn(ASC))).toStrictEqual(
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
        expect([0, undefined, -1, 1].sort(compareFn(DESC))).toStrictEqual(
          sortedNumberArray.DESC
        );
      });
    });
  });
});
