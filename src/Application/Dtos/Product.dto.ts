export type ProductDto = {
  uuid: string;
  name: string | null;
  reference: string | null;
  rank: number | null;
  rankPts: number | null;
  defaultColumnIdx: number;
};
