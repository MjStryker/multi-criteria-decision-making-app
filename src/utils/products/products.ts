import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";
import { compareFn } from "@/@Shared/@Utils/Array";
import { ProductDto } from "@/Application/Dtos/Product.dto";

export const compareProductsByDefaultColumnIdxFn =
  (sortBy = SortByEnum.ASC) =>
  (a: ProductDto, b: ProductDto): number =>
    compareFn(sortBy)(a.defaultColumnIdx, b.defaultColumnIdx);

export const compareProductsByRankFn =
  (sortBy = SortByEnum.ASC) =>
  (a: ProductDto, b: ProductDto): number =>
    compareFn(sortBy)(a.rank, b.rank);

export function updateProductsDefaultColumnIdx(products: ProductDto[]) {
  return products.map((p, idx) => ({ ...p, defaultColumnIdx: idx }));
}
