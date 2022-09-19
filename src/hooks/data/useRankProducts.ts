import { useEffect, useState } from "react";

import { SORT_BY } from "../../constants/arrays";
import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { compareFn } from "../../utils/arrays";
import { getProductsWithCriteriasNormalizedWeightedValues } from "../../utils/products/products";

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
    const { productsWithCriteriasNormalizedWeightedValues } =
      getProductsWithCriteriasNormalizedWeightedValues(
        products,
        criterias,
        productsWithCriterias
      );
    // const criteriasWithValues =
    //   getProductsWithCriteriasNormalizedWeightedValues(
    // products,
    // criterias,
    // productsWithCriterias
    //   );

    /**
     * STEP 2 - Get total beneficial (Bi) and non-beneficial (Ci) values (with min)
     */
    let allProductsTotalNonBeneficialValues = 0;
    let allProductsMinNonBeneficialValue: number | undefined = undefined;

    const criteriasWithProductsTotalBeneficialAndNonBeneficialValues =
      criteriasWithValues.map(({ criteria, products, ...rest }) => {
        let totalBeneficialValues = 0;
        let totalNonBeneficialValues = 0;

        products.forEach(({ weightedValue }) => {
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
          ...rest,
          totalBeneficialValues,
          totalNonBeneficialValues,
        };
      });

    /**
     * STEP 3 - Get beneficial and non-beneficial values relative to  min ((min Ci)/Ci)
     */
    let allProductsTotalNonBeneficialValuesRelatedToMin = 0;

    const productsWithValuesRelativeToMinBeneficial =
      criteriasWithProductsTotalBeneficialAndNonBeneficialValues.map(
        ({ criteria, products, ...criteriaRest }) => {
          const productsWithRelativeValues = products.map(
            ({ product, ...productRest }) => {
              const minNonBeneficialValueRelativeToGlobalMin =
                allProductsMinNonBeneficialValue
                  ? allProductsMinNonBeneficialValue /
                    criteriaRest.totalNonBeneficialValues
                  : undefined;

              allProductsTotalNonBeneficialValuesRelatedToMin +=
                minNonBeneficialValueRelativeToGlobalMin ?? 0;

              return {
                product,
                ...productRest,
                minNonBeneficialValueRelativeToGlobalMin,
              };
            }
          );

          return {
            criteria,
            products: productsWithRelativeValues,
            ...criteriaRest,
          };
        }
      );

    /**
     * STEP 4 - Get all products Qi value
     */
    let allProductsMaxQi: number | undefined = undefined;

    const productsQi = productsWithValuesRelativeToMinBeneficial.map(
      ({ criteria, products, ...criteriaRest }) => {
        const productsQiRes = products.map(({ product, ...productRest }) => {
          const qi =
            allProductsMinNonBeneficialValue &&
            allProductsTotalNonBeneficialValuesRelatedToMin
              ? // If variables are defined
                criteriaRest.totalBeneficialValues +
                (allProductsMinNonBeneficialValue *
                  allProductsTotalNonBeneficialValues) /
                  (criteriaRest.totalNonBeneficialValues *
                    allProductsTotalNonBeneficialValuesRelatedToMin)
              : undefined;

          if (allProductsMaxQi && qi && qi > allProductsMaxQi) {
            allProductsMaxQi = qi;
          }

          return { product, ...productRest, qi };
        });

        return { criteria, products: productsQiRes, ...criteriaRest };
      }
    );

    /**
     * STEP 5 - Get products Ui (rank in percentage)
     */
    const productsUi = productsQi.map(
      ({ criteria, products, ...criteriaRest }) => {
        const productsUiRes = products.map((product) => {
          const ui =
            product.qi && allProductsMaxQi
              ? product.qi / allProductsMaxQi
              : undefined;

          return { ...product, ui };
        });

        return { criteria, products: productsUiRes, ...criteriaRest };
      }
    );

    /**
     * STEP 6 - Get products rank (+ sort by rank)
     */
    const productsRank = productsUi.map(({ criteria, products }) => {
      const productsRankRes = products
        .sort((p1, p2) => compareFn(SORT_BY.ASC)(p1.ui, p2.ui))
        .map(({ product }, idx) => ({
          ...product,
          rank: idx + 1,
        }));

      return { criteria, products: productsRankRes };
    });

    setRankedProducts(productsRank[0].products);

    return () => {
      console.log("[ useEffect ] useRankProducts -> cleanup()");
    };
  }, [products, criterias, productsWithCriterias]);

  return { rankedProducts };
};

export default useRankProducts;
