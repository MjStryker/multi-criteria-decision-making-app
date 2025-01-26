import atomWithLocalStorage from "@/Infrastructure/AtomWithLocalStorage";

import { useAtomValue } from "jotai";
import { ProductCriterionValueDto } from "../Dtos/ProductCriteriaValue.dto";

export const ProductCriterionValueListAtom = atomWithLocalStorage<
  ProductCriterionValueDto[]
>("productCriterionValueList", []);

export default function UseGetProductCriterionValueListQuery() {
  const productCriterionValueList = useAtomValue(ProductCriterionValueListAtom);

  return productCriterionValueList;
}
