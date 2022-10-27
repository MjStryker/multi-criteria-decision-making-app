import {
  capitalize,
  isValidNonEmptyString,
  parseStringAsNumber,
} from "./strings";

describe("isValidNonEmptyString(...)", () => {
  test("Returning false", () => {
    expect(isValidNonEmptyString(undefined)).toBe(false);
    expect(isValidNonEmptyString(null)).toBe(false);
    expect(isValidNonEmptyString("")).toBe(false);
  });

  test("Returning true", () => {
    expect(isValidNonEmptyString("abc")).toBe(true);
    expect(isValidNonEmptyString("  abc")).toBe(true);
    expect(isValidNonEmptyString((123).toString())).toBe(true);
  });
});

describe("capitalize(...)", () => {
  test("String already capitalized", () => {
    expect(capitalize("Lorem ipsum dolor sit")).toBe("Lorem ipsum dolor sit");
  });

  test("Capitalize first letter", () => {
    expect(capitalize("lorem ipsum dolor sit")).toBe("Lorem ipsum dolor sit");
  });

  test("Capitalize one letter only", () => {
    expect(capitalize("lorem Ipsum dolor sit")).toBe("Lorem Ipsum dolor sit");
  });

  test("Capitalize nothing", () => {
    expect(capitalize(" lorem ipsum dolor sit")).toBe(" lorem ipsum dolor sit");
  });
});

describe("parseStringAsNumber(...)", () => {
  test("Returning null", () => {
    expect(parseStringAsNumber("a")).toBe(null);
    expect(parseStringAsNumber("-")).toBe(null);
    expect(parseStringAsNumber(" ")).toBe(null);
    expect(parseStringAsNumber("")).toBe(null);
  });

  test("Returning int", () => {
    expect(parseStringAsNumber("1")).toBe(1);
    expect(parseStringAsNumber("+1")).toBe(1);
    expect(parseStringAsNumber("-1")).toBe(-1);
    expect(parseStringAsNumber("  -1")).toBe(-1);
    expect(parseStringAsNumber("  3000")).toBe(3000);
    expect(parseStringAsNumber("3000  ")).toBe(3000);
  });

  test("Returning decimals", () => {
    expect(parseStringAsNumber("1.0")).toBe(1.0);
    expect(parseStringAsNumber("1.000")).toBe(1.0);
    expect(parseStringAsNumber("1.025")).toBe(1.025);
    expect(parseStringAsNumber("+1.0")).toBe(1.0);
    expect(parseStringAsNumber("-1.0")).toBe(-1.0);
    expect(parseStringAsNumber("-1.75")).toBe(-1.75);
    expect(parseStringAsNumber("  -1.0")).toBe(-1.0);
    expect(parseStringAsNumber("  3000.0")).toBe(3000.0);
    expect(parseStringAsNumber("3000.0  ")).toBe(3000.0);
  });
});
