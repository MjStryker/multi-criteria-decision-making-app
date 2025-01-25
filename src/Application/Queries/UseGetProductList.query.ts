import atomWithLocalStorage from "@/Infrastructure/AtomWithLocalStorage";
import { Product } from "@/types/Product";
import { useAtomValue } from "jotai";

export const ProductListAtom = atomWithLocalStorage<Product[]>(
  "productList",
  []
);

export default function UseGetProductListQuery() {
  const productList = useAtomValue(ProductListAtom);

  // TODO: Sort list

  return productList;
}
