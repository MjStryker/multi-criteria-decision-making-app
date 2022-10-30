import { uuid } from "./uuid";

describe("uuid(...)", () => {
  it("Ensure uuid returns unique ID", () => {
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
});
