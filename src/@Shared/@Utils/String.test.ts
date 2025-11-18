import { describe, expect, test } from "vitest";

import { capitalize, isValidNotEmptyString } from "./String";

describe("isValidNotEmptyString", () => {
  test("Returning false", () => {
    expect(isValidNotEmptyString(null)).toBe(false);
    expect(isValidNotEmptyString(null)).toBe(false);
    expect(isValidNotEmptyString("")).toBe(false);
  });

  test("Returning true", () => {
    expect(isValidNotEmptyString("abc")).toBe(true);
    expect(isValidNotEmptyString("  abc")).toBe(true);
    expect(isValidNotEmptyString((123).toString())).toBe(true);
  });
});

describe("capitalize", () => {
  test("String already capitalized", () => {
    expect(capitalize("Lorem ipsum dolor sit")).toBe("Lorem ipsum dolor sit");
  });

  test("Capitalize first letter", () => {
    expect(capitalize("lorem ipsum dolor sit")).toBe("Lorem ipsum dolor sit");
  });

  test("Capitalize one letter only", () => {
    expect(capitalize("lorem Ipsum dolor sit")).toBe("Lorem Ipsum dolor sit");
  });

  test("Capitalize first letter after space", () => {
    expect(capitalize(" lorem ipsum dolor sit")).toBe(" Lorem ipsum dolor sit");
  });
});
