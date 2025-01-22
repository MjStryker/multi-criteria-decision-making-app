import { useSetAtom } from "jotai";
import { ProductCriterionValueListAtom } from "../Queries/UseGetProductCriterionValueList.query";

export default function UseSetProductCriterionValueListCommand() {
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  return setProductCriterionValueList;
}
