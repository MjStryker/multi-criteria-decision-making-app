import { Uuid } from "@/@Shared/@Utils/Uuid";

export type ProductDto = {
  uuid: string;
  name: string | null;
  reference: string | null;
  rank: number | null;
  rankPts: number | null;
  defaultColumnIdx: number;
};

export const ProductDto = {
  newEmpty(defaultColumnIdx: number): ProductDto {
    return {
      uuid: Uuid.newRandom(),
      name: null,
      reference: null,
      rank: null,
      rankPts: null,
      defaultColumnIdx
    };
  }
};
