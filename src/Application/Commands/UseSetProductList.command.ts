import { useSetAtom } from 'jotai';
import { ProductListAtom } from '../Queries/UseGetProductList.query';

export default function UseSetProductListCommand() {
  const setProductList = useSetAtom(ProductListAtom);
  return setProductList;
}
