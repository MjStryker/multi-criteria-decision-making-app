import atomWithLocalStorage from "@/Infrastructure/AtomWithLocalStorage";
import { ProductCriterionValue } from "@/types/ProductCriterionValue";
import { useAtomValue } from "jotai";

export const ProductCriterionValueListAtom = atomWithLocalStorage<
  ProductCriterionValue[]
>("productCriterionValueList", []);

export default function UseGetProductCriterionValueListQuery() {
  const productCriterionValueList = useAtomValue(ProductCriterionValueListAtom);

  return productCriterionValueList;
}
