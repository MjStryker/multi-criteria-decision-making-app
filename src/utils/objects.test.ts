import { areDefined, deepEqual, isDefined } from "./objects";

describe("deepEqual(...)", () => {
  test("Returning false", () => {
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(false, true)).toBe(false);

    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(undefined, null)).toBe(false);

    expect(deepEqual("", " ")).toBe(false);
    expect(deepEqual("1", 1)).toBe(false);
    expect(deepEqual("null", null)).toBe(false);

    expect(deepEqual(0, 1)).toBe(false);
    expect(deepEqual(0.0, 0.1)).toBe(false);

    expect(deepEqual(["a"], [])).toBe(false);
    expect(deepEqual(["a"], ["b"])).toBe(false);

    expect(deepEqual({ a: "" }, {})).toBe(false);
    expect(deepEqual({ a: "", b: "" }, { a: "" })).toBe(false);
    expect(deepEqual({ a: "", b: "" }, { a: "", b: null })).toBe(false);

    expect(
      deepEqual(
        {
          artPieces: [
            {
              pieceName: "Emo Flamingos",
              price: 30,
              ownerList: [
                {
                  name: "John Ernest",
                  userID: 23849,
                  purchaseDate: "09/13/2021",
                },
                {
                  name: "Eric Kruger",
                  userID: 23510,
                  purchaseDate: "09/13/2021",
                },
              ],
            },
            {
              pieceName: "Where is my bit wallet",
              price: 100,
              ownerList: [],
            },
          ],
          storeCredits: 1000,
        },
        {
          artPieces: [
            {
              pieceName: "Emo Flamingos",
              price: 30,
              ownerList: [
                {
                  name: "John Ernest",
                  userID: 23849,
                  purchaseDate: "09/13/2021",
                },
                {
                  name: "Eric Kruger",
                  userID: 23510,
                  purchaseDate: "09/13/2021",
                },
              ],
            },
            {
              pieceName: "Where is my bit wallet",
              price: 101, // <-------------------- Diff here!
              ownerList: [],
            },
          ],
          storeCredits: 1000,
        }
      )
    ).toBe(false);
  });

  test("Returning true", () => {
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(false, false)).toBe(true);

    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);

    expect(deepEqual("", "")).toBe(true);
    expect(deepEqual(" ", " ")).toBe(true);
    expect(deepEqual("null", "null")).toBe(true);

    expect(deepEqual(0, 0)).toBe(true);
    expect(deepEqual(0.1, 0.1)).toBe(true);

    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual(["a"], ["a"])).toBe(true);

    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual({ a: "" }, { a: "" })).toBe(true);
    expect(deepEqual({ a: "", b: "" }, { a: "", b: "" })).toBe(true);

    expect(
      deepEqual(
        {
          artPieces: [
            {
              pieceName: "Emo Flamingos",
              price: 30,
              ownerList: [
                {
                  name: "John Ernest",
                  userID: 23849,
                  purchaseDate: "09/13/2021",
                },
                {
                  name: "Eric Kruger",
                  userID: 23510,
                  purchaseDate: "09/13/2021",
                },
              ],
            },
            {
              pieceName: "Where is my bit wallet",
              price: 100,
              ownerList: [],
            },
          ],
          storeCredits: 1000,
        },
        {
          artPieces: [
            {
              pieceName: "Emo Flamingos",
              price: 30,
              ownerList: [
                {
                  name: "John Ernest",
                  userID: 23849,
                  purchaseDate: "09/13/2021",
                },
                {
                  name: "Eric Kruger",
                  userID: 23510,
                  purchaseDate: "09/13/2021",
                },
              ],
            },
            {
              pieceName: "Where is my bit wallet",
              price: 100,
              ownerList: [],
            },
          ],
          storeCredits: 1000,
        }
      )
    ).toBe(true);
  });
});

describe("isDefined(...)", () => {
  test("Returning false", () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  test("Returning true", () => {
    expect(isDefined(1)).toBe(true);
    expect(isDefined(-1)).toBe(true);

    expect(isDefined("")).toBe(true);
    expect(isDefined("Lorem")).toBe(true);
    expect(isDefined("  Lorem")).toBe(true);

    expect(isDefined([])).toBe(true);
    expect(isDefined([1, 2, 3])).toBe(true);

    expect(isDefined({})).toBe(true);
    expect(isDefined({ a: "", b: "" })).toBe(true);
  });
});

describe("areDefined(...)", () => {
  test("Returning false", () => {
    expect(areDefined([null])).toBe(false);
    expect(areDefined([undefined])).toBe(false);

    expect(areDefined([null, null, null])).toBe(false);
    expect(areDefined([undefined, undefined, undefined])).toBe(false);

    expect(areDefined(["", "", null])).toBe(false);
    expect(areDefined(["", "", undefined])).toBe(false);

    expect(areDefined([[], [], null])).toBe(false);
    expect(areDefined([[], [], undefined])).toBe(false);

    expect(areDefined([{}, {}, null])).toBe(false);
    expect(areDefined([{}, {}, undefined])).toBe(false);
  });

  test("Returning true", () => {
    expect(areDefined([])).toBe(true);
    expect(areDefined([1])).toBe(true);
    expect(areDefined([""])).toBe(true);
    expect(areDefined(["Lorem"])).toBe(true);
    expect(areDefined([[]])).toBe(true);
    expect(areDefined([{}])).toBe(true);

    expect(areDefined(["", "", ""])).toBe(true);
    expect(areDefined([[], [], []])).toBe(true);
    expect(areDefined([{}, {}, {}])).toBe(true);

    expect(areDefined(["", [], {}])).toBe(true);
  });
});
