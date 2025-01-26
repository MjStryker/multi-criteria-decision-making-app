import atomWithLocalStorage from "@/Infrastructure/AtomWithLocalStorage";

import { useAtomValue } from "jotai";
import { ProductDto } from "../Dtos/Product.dto";

export const ProductListAtom = atomWithLocalStorage<ProductDto[]>(
  "productList",
  []
);

export default function UseGetProductListQuery() {
  const productList = useAtomValue(ProductListAtom);
  return productList;
}
