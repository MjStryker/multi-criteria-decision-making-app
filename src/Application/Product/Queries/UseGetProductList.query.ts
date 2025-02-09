import atomWithLocalStorage from '@/Infrastructure/AtomWithLocalStorage';
import { splitAtom } from 'jotai/utils';
import { useAtomValue } from 'jotai';
import { ProductDto } from '../Dtos/Product.dto';

export const ProductListAtom = atomWithLocalStorage<ProductDto[]>('productList', []);
export const ProductListSplitAtom = splitAtom(ProductListAtom);

export default function UseGetProductListQuery() {
  const productList = useAtomValue(ProductListAtom);
  return productList;
}
