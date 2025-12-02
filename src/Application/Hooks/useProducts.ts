import { getDefaultStore, useAtom, useAtomValue, useSetAtom } from "jotai";

import { computeProductCriterionValueRankPts } from "@/@Compute/computeProductCriterionValueRankPoints";
import { computeProductRanks } from "@/@Compute/computeProductRanks";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import {
  ProductListAtom,
  ProductListSplitAtom
} from "@/Application/Atoms/ProductList.atom";
import { ProductDto } from "@/Application/Dtos/Product.dto";
import { ProductCriterionValueDto } from "@/Application/Dtos/ProductCriteriaValue.dto";

export function useProducts() {
  const [productListAtoms, dispatch] = useAtom(ProductListSplitAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );
  const setProductList = useSetAtom(ProductListAtom);
  const autoRecompute = useAtomValue(AppSettingsAtoms.autoRecompute);

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
    const store = getDefaultStore();

    // Find the product atom and its current index
    const productAtom = productListAtoms.find(atom => {
      return store.get(atom).uuid === productUuid;
    });

    if (!productAtom) return;

    // Find the index of the product being removed
    const removedIndex = productListAtoms.findIndex(
      atom => atom === productAtom
    );

    // First, reindex products that come after the removed one
    productListAtoms.forEach((atom, index) => {
      if (index > removedIndex) {
        const product = store.get(atom);
        // Decrement the index for products after the removed one
        store.set(atom, { ...product, defaultColumnIdx: index - 1 });
      }
    });

    // Then remove the product from list
    dispatch({
      type: "remove",
      atom: productAtom
    });

    // Remove all product criterion values associated with this product
    const updatedValues = store
      .get(ProductCriterionValueListAtom)
      .filter(pcv => pcv.productUuid !== productUuid);

    setProductCriterionValueList(updatedValues);

    // Recompute ranks if auto-recompute is enabled
    if (autoRecompute) {
      const updatedRankPts = computeProductCriterionValueRankPts(
        store.get(CriterionListAtom),
        updatedValues
      );
      setProductCriterionValueList(updatedRankPts);

      const rankedProducts = computeProductRanks(
        store.get(ProductListAtom),
        updatedRankPts
      );
      setProductList(rankedProducts);
    }
  };

  return {
    productListAtoms,
    nbProducts,
    addProduct,
    removeProduct
  };
}
