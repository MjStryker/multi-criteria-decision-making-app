import { uuid } from "./uuid";

describe("uuid(...)", () => {
  it("Should return unique IDs", () => {
    const size = 1_000;

    const set = new Set(
      Array(size)
        .fill(0)
        .map(() => ({
          id: uuid(),
        }))
    );

    expect(set.size).toEqual(size);
  });

  it("Should respect length property", () => {
    expect(uuid(0)).toBe("");
    expect(uuid(12)).toHaveLength(12);
    expect(uuid(64)).toHaveLength(23); // TODO: make it work with desired length > 23 ?
  });
});
