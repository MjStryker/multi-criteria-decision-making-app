import { useEffect, useState } from "react";

import { SORT_BY } from "../../constants/arrays";
import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { compareFn } from "../../utils/arrays";
import { getCriteriasProductsWithNormalizedWeightedValues } from "../../utils/products/products";

const useRankProducts = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) => {
  const [rankedProducts, setRankedProducts] = useState(products);

  useEffect(() => {
    /**
     * STEP 1 - Get normalized and weighted values for all products
     */
    const criteriasWithValues =
      getCriteriasProductsWithNormalizedWeightedValues(
        products,
        criterias,
        productsWithCriterias
      );

    /**
     * STEP 2 - Get total beneficial and non-beneficial values (with min)
     */
    let allProductsTotalNonBeneficialValues = 0;
    let allProductsMinNonBeneficialValue: number | undefined = undefined;

    const productsWithTotalBeneficialAndNonBeneficialValues =
      criteriasWithValues.map(({ criteria, products }) => {
        let totalBeneficialValues = 0;
        let totalNonBeneficialValues = 0;

        products.forEach(({ product, weightedValue }) => {
          const weightedValueOrZero = weightedValue ?? 0;

          allProductsTotalNonBeneficialValues += weightedValueOrZero;

          // Get totals
          if (criteria.beneficial === true) {
            totalBeneficialValues += weightedValueOrZero;
          } else if (criteria.beneficial === false) {
            totalNonBeneficialValues += weightedValueOrZero;
          }

          // Get min
          if (
            allProductsMinNonBeneficialValue &&
            weightedValue &&
            weightedValue < allProductsMinNonBeneficialValue
          ) {
            allProductsMinNonBeneficialValue = weightedValue;
          }
        });

        return {
          criteria,
          products,
          totalBeneficialValues,
          totalNonBeneficialValues,
        };
      });

    /**
     * STEP 3 -
     */
    let allProductsTotalNonBeneficialValuesRelatedToMin = 0;

    const productsWithValuesRelativeToMinBeneficial =
      productsWithTotalBeneficialAndNonBeneficialValues.map((product) => {
        const minNonBeneficialValueRelativeToGlobalMin =
          allProductsMinNonBeneficialValue
            ? allProductsMinNonBeneficialValue /
              product.totalNonBeneficialValues
            : undefined;

        allProductsTotalNonBeneficialValuesRelatedToMin +=
          minNonBeneficialValueRelativeToGlobalMin ?? 0;

        return { ...product, minNonBeneficialValueRelativeToGlobalMin };
      });

    let allProductsMaxQi: number | undefined = undefined;

    const productsQi = productsWithValuesRelativeToMinBeneficial.map(
      (product) => {
        const qi =
          allProductsMinNonBeneficialValue &&
          allProductsTotalNonBeneficialValuesRelatedToMin
            ? // If variables are defined
              product.totalBeneficialValues +
              (allProductsMinNonBeneficialValue *
                allProductsTotalNonBeneficialValues) /
                (product.totalNonBeneficialValues *
                  allProductsTotalNonBeneficialValuesRelatedToMin)
            : undefined;

        if (allProductsMaxQi && qi && qi > allProductsMaxQi) {
          allProductsMaxQi = qi;
        }

        return { ...product, qi };
      }
    );

    const productsUi = productsQi.map((product) => {
      const ui =
        product.qi && allProductsMaxQi
          ? product.qi / allProductsMaxQi
          : undefined;

      return { ...product, ui };
    });

    const productRank = productsUi
      .sort((p1, p2) => compareFn(SORT_BY.ASC)(p1.ui, p2.ui))
      .map((productWithCalculatedData, idx) => ({
        ...productWithCalculatedData.product,
        rank: idx,
      }));

    setRankedProducts(productRank);

    return () => {
      console.log("[ useEffect ] useRankProducts -> cleanup()");
    };
  }, [products, criterias, productsWithCriterias]);

  return { rankedProducts, productsWithCriteriasInfo };
};

export default useRankProducts;
