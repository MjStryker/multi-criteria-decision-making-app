import { useEffect, useState } from "react";

import { SORT_BY } from "../../constants/arrays";
import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import { compareFn } from "../../utils/arrays";
import { getProductsWeightedNormalizedValues } from "../../utils/products/products";

const useRankProducts = (
  products: TProduct[],
  criterias: TCriteria[],
  productsWithCriterias: TProductWithCriteria[]
) => {
  const [rankedProducts, setRankedProducts] = useState(products);
  const [productsWithCriteriasInfo, setProductsWithCriterias] = useState(
    productsWithCriterias
  );

  useEffect(() => {
    const {
      productsWithNormalizedAndWeightedValues,
      productsWithCriteriasInfo,
    } = getProductsWeightedNormalizedValues(
      products,
      criterias,
      productsWithCriterias
    );

    setProductsWithCriterias(productsWithCriteriasInfo);

    let allProductsTotalNonBeneficialValues = 0;
    let allProductsMinNonBeneficialValue: number | undefined = undefined;

    const productsWithTotalBeneficialAndNonBeneficialValues =
      productsWithNormalizedAndWeightedValues.map((product) => {
        let totalBeneficialValues = 0;
        let totalNonBeneficialValues = 0;

        const weightedValueOrZero = product.weightedValue ?? 0;

        allProductsTotalNonBeneficialValues += weightedValueOrZero;

        if (
          allProductsMinNonBeneficialValue &&
          product.weightedValue &&
          product.weightedValue < allProductsMinNonBeneficialValue
        ) {
          allProductsMinNonBeneficialValue = product.weightedValue;
        }

        criterias.forEach((criteria) => {
          if (criteria.beneficial === true) {
            totalBeneficialValues += weightedValueOrZero;
          } else if (criteria.beneficial === false) {
            totalNonBeneficialValues += weightedValueOrZero;
          }
        });

        return {
          ...product,
          totalBeneficialValues,
          totalNonBeneficialValues,
        };
      });

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
