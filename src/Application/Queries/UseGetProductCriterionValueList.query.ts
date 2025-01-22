import { ProductCriterionValue } from "@/types/ProductCriterionValue";
import { atom, useAtomValue } from "jotai";

// TODO: LocalStorage

export const ProductCriterionValueListAtom = atom<ProductCriterionValue[]>([]);

export default function UseGetProductCriterionValueListQuery() {
  const productCriterionValueList = useAtomValue(ProductCriterionValueListAtom);

  return productCriterionValueList;
}
