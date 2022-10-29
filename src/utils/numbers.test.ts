import { clamp, isValidNumber } from "./numbers";

describe("isValidNumber(...)", () => {
  test("Returning false", () => {
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
  });

  test("Returning true", () => {
    expect(isValidNumber(1)).toBe(true);
    expect(isValidNumber(-1)).toBe(true);
    expect(isValidNumber(+1)).toBe(true);
    expect(isValidNumber(1.0)).toBe(true);
    expect(isValidNumber(-1.0)).toBe(true);
    expect(isValidNumber(+1.0)).toBe(true);
  });
});

describe("clamp(...)", () => {
  function getValues(positive: "positive" | "mixed" | "negative") {
    const minValue = 5;
    const maxValue = 95;

    const min =
      positive === "negative"
        ? maxValue * -1
        : positive === "mixed"
        ? minValue * -1
        : minValue;

    const max = positive === "negative" ? minValue * -1 : maxValue;

    return {
      value:
        ((positive === "mixed" ? minValue + maxValue : maxValue - minValue) /
          2) *
        (positive === "negative" ? -1 : 1),
      min,
      max,
    };
  }

  describe("Given value is already inside range", () => {
    test("Inside positive range", () => {
      const { value, min, max } = getValues("positive");
      expect(clamp(min, min, max)).toBe(min);
      expect(clamp(value, min, max)).toBe(value);
      expect(clamp(max, min, max)).toBe(max);
    });

    test("Inside negative range", () => {
      const { value, min, max } = getValues("negative");
      expect(clamp(min, min, max)).toBe(min);
      expect(clamp(value, min, max)).toBe(value);
      expect(clamp(max, min, max)).toBe(max);
    });

    test("Inside Mixed range", () => {
      const { value, min, max } = getValues("mixed");
      expect(clamp(min, min, max)).toBe(min);
      expect(clamp(value, min, max)).toBe(value);
      expect(clamp(max, min, max)).toBe(max);
    });
  });

  describe("Given value is outside range", () => {
    test("Outside Positive range", () => {
      const { min, max } = getValues("positive");
      expect(clamp(min - 1, min, max)).toBe(min);
      expect(clamp(max + 1, min, max)).toBe(max);
    });

    test("Outside negative range", () => {
      const { min, max } = getValues("negative");
      expect(clamp(min - 1, min, max)).toBe(min);
      expect(clamp(max + 1, min, max)).toBe(max);
    });

    test("Outside mixed range", () => {
      const { min, max } = getValues("mixed");
      expect(clamp(min - 1, min, max)).toBe(min);
      expect(clamp(max + 1, min, max)).toBe(max);
    });
  });
});
