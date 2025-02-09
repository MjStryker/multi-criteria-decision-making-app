import { atomWithStorage, splitAtom } from 'jotai/utils';
import { ProductCriterionValueDto } from '../Dtos/ProductCriteriaValue.dto';

export const ProductCriterionValueListAtom = atomWithStorage<ProductCriterionValueDto[]>(
  'data:productCriterionValueList',
  []
);

export const ProductCriterionValueListSplitAtom = splitAtom(ProductCriterionValueListAtom);
