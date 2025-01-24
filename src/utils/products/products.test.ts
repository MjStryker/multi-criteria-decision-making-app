import {
  compareProductsByDefaultColumnIdxFn,
  compareProductsByRankFn,
} from "./products";

import { describe, it, expect } from "vitest";
import { Product } from "../../types/Product";
import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";

const p1: Product = {
  id: "id-p1",
  name: "p1",
  reference: null,
  rank: 3,
  rankPts: null,
  defaultColumnIdx: 2,
};

const p2: Product = {
  id: "id-p2",
  name: "p2",
  reference: null,
  rank: 2,
  rankPts: null,
  defaultColumnIdx: 1,
};

const p3: Product = {
  id: "id-p3",
  name: "p3",
  reference: null,
  rank: 1,
  rankPts: null,
  defaultColumnIdx: 3,
};

const ASC = SortByEnum.ASC;
const DESC = SortByEnum.DESC;

const productsSortedByDefaultColumnIdx = {
  ASC: [p2, p1, p3] as Product[],
  DESC: [p3, p1, p2] as Product[],
};

describe("compareProductsByDefaultColumnIdxFn", () => {
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
  ASC: [p3, p2, p1] as Product[],
  DESC: [p1, p2, p3] as Product[],
};

describe("compareProductsByRankFn", () => {
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
