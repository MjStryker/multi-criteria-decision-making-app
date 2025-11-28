import { getDefaultStore, useAtom, useSetAtom } from "jotai";

import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import { ProductListSplitAtom } from "@/Application/Atoms/ProductList.atom";
import { ProductDto } from "@/Application/Dtos/Product.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

export function useProducts() {
  const [productListAtoms, dispatch] = useAtom(ProductListSplitAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );

  const nbProducts = productListAtoms.length;

  /**
   * Add a new product with default criterion values
   */
  const addProduct = () => {
    const store = getDefaultStore();
    const newProduct = ProductDto.newEmpty(nbProducts);

    // Add product
    dispatch({
      type: "insert",
      value: newProduct
    });

    // Add default product criterion values for all existing criteria
    setProductCriterionValueList(prev => [
      ...prev,
      ...store
        .get(CriterionListAtom)
        .map(criterion =>
          ProductCriterionValueDto.newEmpty(newProduct.uuid, criterion.uuid)
        )
    ]);
  };

  /**
   * Remove a product and its associated criterion values
   */
  const removeProduct = (productUuid: string) => {
    // Find the product atom
    const productAtom = productListAtoms.find(atom => {
      const store = getDefaultStore();
      return store.get(atom).uuid === productUuid;
    });

    if (!productAtom) return;

    // Remove product from list
    dispatch({
      type: "remove",
      atom: productAtom
    });

    // Remove all product criterion values associated with this product
    setProductCriterionValueList(prev =>
      prev.filter(pcv => pcv.productUuid !== productUuid)
    );
  };

  return {
    productListAtoms,
    nbProducts,
    addProduct,
    removeProduct
  };
}
