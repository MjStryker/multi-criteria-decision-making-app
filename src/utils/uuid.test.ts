import { uuid } from "./uuid";

describe("uuid(...)", () => {
  it("Return unique IDs", () => {
    const size = 100_000;

    const set = new Set(
      Array(size)
        .fill(0)
        .map(() => ({
          id: uuid(),
        }))
    );

    expect(set.size).toEqual(size);
  });

  it("Respect length property", () => {
    expect(uuid(-1)).toBe("");
    expect(uuid(0)).toBe("");
    expect(uuid(2)).toHaveLength(2);
    expect(uuid(12)).toHaveLength(12);
    expect(uuid(64)).toHaveLength(64);
    expect(uuid(128)).toHaveLength(128);
  });
});
