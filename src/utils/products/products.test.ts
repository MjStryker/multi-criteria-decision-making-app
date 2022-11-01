import {
  compareProductsByDefaultColumnIdxFn,
  compareProductsByRankFn,
} from "./products";

import { SORT_BY } from "../../constants/arrays";
import { TProduct } from "../../types/products";

const p1: TProduct = {
  id: "id-p1",
  name: "p1",
  reference: undefined,
  rank: 3,
  defaultColumnIdx: 2,
};

const p2: TProduct = {
  id: "id-p2",
  name: "p2",
  reference: undefined,
  rank: 2,
  defaultColumnIdx: 1,
};

const p3: TProduct = {
  id: "id-p3",
  name: "p3",
  reference: undefined,
  rank: 1,
  defaultColumnIdx: 3,
};

const ASC = SORT_BY.ASC;
const DESC = SORT_BY.DESC;

const productsSortedByDefaultColumnIdx = {
  ASC: [p2, p1, p3] as TProduct[],
  DESC: [p3, p1, p2] as TProduct[],
};

describe("compareProductsByDefaultColumnIdxFn(...)", () => {
  describe("ASC", () => {
    it("Already sorted products array", () => {
      expect(
        [...productsSortedByDefaultColumnIdx.ASC].sort(
          compareProductsByDefaultColumnIdxFn(ASC)
        )
      ).toStrictEqual(productsSortedByDefaultColumnIdx.ASC);
    });

    it("Unsorted products array", () => {
      expect(
        [p1, p2, p3].sort(compareProductsByDefaultColumnIdxFn(ASC))
      ).toStrictEqual(productsSortedByDefaultColumnIdx.ASC);
    });
  });

  describe("DESC", () => {
    it("Already sorted products array", () => {
      expect(
        [...productsSortedByDefaultColumnIdx.DESC].sort(
          compareProductsByDefaultColumnIdxFn(DESC)
        )
      ).toStrictEqual(productsSortedByDefaultColumnIdx.DESC);
    });

    it("Unsorted products array", () => {
      expect(
        [p1, p2, p3].sort(compareProductsByDefaultColumnIdxFn(DESC))
      ).toStrictEqual(productsSortedByDefaultColumnIdx.DESC);
    });
  });
});

const productsSortedByRank = {
  ASC: [p3, p2, p1] as TProduct[],
  DESC: [p1, p2, p3] as TProduct[],
};

describe("compareProductsByRankFn(...)", () => {
  describe("ASC", () => {
    it("Already sorted products array", () => {
      expect(
        [...productsSortedByRank.ASC].sort(compareProductsByRankFn(ASC))
      ).toStrictEqual(productsSortedByRank.ASC);
    });

    it("Unsorted products array", () => {
      expect([p1, p3, p2].sort(compareProductsByRankFn(ASC))).toStrictEqual(
        productsSortedByRank.ASC
      );
    });
  });

  describe("DESC", () => {
    it("Already sorted products array", () => {
      expect(
        [...productsSortedByRank.DESC].sort(compareProductsByRankFn(DESC))
      ).toStrictEqual(productsSortedByRank.DESC);
    });

    it("Unsorted products array", () => {
      expect([p1, p3, p2].sort(compareProductsByRankFn(DESC))).toStrictEqual(
        productsSortedByRank.DESC
      );
    });
  });
});
