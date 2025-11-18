import { atomWithStorage, splitAtom } from "jotai/utils";

import type { ProductDto } from "../Dtos/Product.dto";

export const ProductListAtom = atomWithStorage<ProductDto[]>(
  "data:productList",
  []
);
export const ProductListSplitAtom = splitAtom(ProductListAtom);
