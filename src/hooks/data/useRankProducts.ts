import { useCallback, useEffect, useState } from "react";

import { SORT_BY } from "../../constants/arrays";
import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { compareFn } from "../../utils/arrays";
import { deepEqual } from "../../utils/objects";
import { findProductWithCriteria } from "../../utils/productsWithCriterias/productsWithCriterias";
import { isDefined } from "../../utils/objects";

const useRankProducts = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[],
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>
) => {
  const [rankedProducts, setRankedProducts] = useState<TProduct[]>([]);

  const rankProductsFn: () => TProduct[] = useCallback(() => {
    /**
     * STEP 1 - Get normalized and weighted values for all products
     */
    // const { productsWithCriteriasNormalizedWeightedValues } =
    //   getProductsWithCriteriasNormalizedWeightedValues(
    //     products,
    //     criterias,
    //     productsWithCriterias
    //   );

    /**
     * STEP 2 - Get total beneficial (Bi) and non-beneficial (Ci) values (with min)
     */
    let allProductsTotalNonBeneficialValues = 0;
    let allProductsMinNonBeneficialValue: number | undefined = undefined;

    const productsWithBeneficialAndNonBeneficialValues = [...products].map(
      (product) => {
        let totalBeneficialValues = 0;
        let totalNonBeneficialValues = 0;

        criterias.forEach((criteria) => {
          const productWithCriteria = findProductWithCriteria(
            product,
            criteria,
            productsWithCriterias
          );

          const weightedValueOrZero = productWithCriteria?.weightedValue ?? 0;

          allProductsTotalNonBeneficialValues += weightedValueOrZero;

          // Get totals
          if (criteria.beneficial === true) {
            totalBeneficialValues += weightedValueOrZero;
          } else if (criteria.beneficial === false) {
            totalNonBeneficialValues += weightedValueOrZero;

            // Get min
            if (
              !allProductsMinNonBeneficialValue ||
              (allProductsMinNonBeneficialValue &&
                productWithCriteria?.weightedValue &&
                productWithCriteria.weightedValue <
                  allProductsMinNonBeneficialValue)
            ) {
              allProductsMinNonBeneficialValue =
                productWithCriteria?.weightedValue ?? undefined;
            }
          }
        });

        return { product, totalBeneficialValues, totalNonBeneficialValues };
      }
    );

    /**
     * STEP 3 - Get beneficial and non-beneficial values relative to  min ((min Ci)/Ci)
     */
    let allProductsTotalNonBeneficialValuesRelatedToMin = 0;

    const productsWithValuesRelativeToMinBeneficial =
      productsWithBeneficialAndNonBeneficialValues.map((product) => {
        const minNonBeneficialValueRelativeToGlobalMin =
          allProductsMinNonBeneficialValue
            ? allProductsMinNonBeneficialValue /
              product.totalNonBeneficialValues
            : undefined;

        allProductsTotalNonBeneficialValuesRelatedToMin +=
          minNonBeneficialValueRelativeToGlobalMin ?? 0;

        return {
          ...product,
          minNonBeneficialValueRelativeToGlobalMin,
        };
      });

    /**
     * STEP 4 - Get all products Qi value
     */
    let allProductsMaxQi: number | undefined = undefined;

    const productsQi = productsWithValuesRelativeToMinBeneficial.map(
      (product) => {
        const qi =
          // If variables are defined
          allProductsMinNonBeneficialValue &&
          allProductsTotalNonBeneficialValuesRelatedToMin
            ? // then ..
              product.totalBeneficialValues +
              (allProductsMinNonBeneficialValue *
                allProductsTotalNonBeneficialValues) /
                (product.totalNonBeneficialValues *
                  allProductsTotalNonBeneficialValuesRelatedToMin)
            : undefined;

        if (
          !allProductsMaxQi ||
          (allProductsMaxQi && qi && qi > allProductsMaxQi)
        ) {
          allProductsMaxQi = qi;
        }

        return { ...product, qi };
      }
    );

    /**
     * STEP 5 - Get products Ui (rank in percentage)
     */
    const productsUi = productsQi.map((product) => {
      const ui =
        product.qi && allProductsMaxQi
          ? product.qi / allProductsMaxQi
          : undefined;

      return { ...product, ui };
    });

    /**
     * STEP 6 - Get products rank (+ sort by rank)
     */
    const productsRank = productsUi
      .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.ui, p2.ui))
      .map(({ product, ui }, idx) => ({
        ...product,
        rank: isDefined(ui) ? idx + 1 : undefined,
      }));

    return productsRank;
  }, [criterias, products, productsWithCriterias]);

  useEffect(() => {
    if (deepEqual(products, rankedProducts)) {
      console.log("Equals..");
      return;
    }

    const newRankedProducts = rankProductsFn();

    if (!deepEqual(rankedProducts, newRankedProducts)) {
      console.log("New ranks!");
      setRankedProducts(newRankedProducts);
    }

    return () => {
      console.log("[ useEffect ] useRankProducts -> cleanup()");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, criterias, productsWithCriterias]);

  return { rankedProducts };
};

export default useRankProducts;
