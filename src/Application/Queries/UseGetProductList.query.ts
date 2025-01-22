import { Product } from "@/types/Product";
import { atom, useAtomValue } from "jotai";

// TODO: LocalStorage

export const ProductListAtom = atom<Product[]>([]);

export default function UseGetProductListQuery() {
  const productList = useAtomValue(ProductListAtom);

  // TODO: Sort list

  return productList;
}
