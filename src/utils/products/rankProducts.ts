import {
  calculateProductsCriteriaNormalizedWeightedValues,
  findProductCriterionValue,
} from "../productsWithCriteria/productsWithCriteria";

import { SORT_BY } from "../../constants/arrays";
import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { compareFn } from "../arrays";
import { isDefined } from "../objects";

export function rankProducts(
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
): TProduct[] {
  /**
   * STEP 1 - Get normalized and weighted values for all products
   */
  const productsWithCriteriaNormalizedWeightedValues =
    calculateProductsCriteriaNormalizedWeightedValues(
      products,
      criteria,
      productsWithCriteria
    );

  /**
   * STEP 2 - Get total beneficial and non-beneficial values (sum Bi / sum Ci)
   *        - Get min non-beneficial value (min Ci)
   */
  let allProductsTotalNonBeneficialValues = 0;
  let allProductsMinNonBeneficialValue = -1;

  const productsWithBeneficialAndNonBeneficialValues = [...products].map(
    (product) => {
      let productTotalBeneficialValues = 0;
      let productTotalNonBeneficialValues = 0;

      criteria.forEach((criterion) => {
        const productWithCriterion = findProductCriterionValue(
          product,
          criterion,
          productsWithCriteriaNormalizedWeightedValues
        );

        const weightedValueOrZero = productWithCriterion?.weightedValue ?? 0;

        // Get beneficial total (sum Bi)
        if (criterion.beneficial === true) {
          productTotalBeneficialValues += weightedValueOrZero;
        }
        // Get non-beneficial total (sum Ci)
        else {
          productTotalNonBeneficialValues += weightedValueOrZero;
          allProductsTotalNonBeneficialValues += weightedValueOrZero;

          // Get non-beneficial min (min Ci)
          if (
            allProductsMinNonBeneficialValue === -1 ||
            weightedValueOrZero < allProductsMinNonBeneficialValue
          ) {
            allProductsMinNonBeneficialValue = weightedValueOrZero;
          }
        }
      });

      return {
        product,
        totalBeneficialValues: productTotalBeneficialValues,
        totalNonBeneficialValues: productTotalNonBeneficialValues,
      };
    }
  );

  /**
   * STEP 3 - Get non-beneficial values relative to min ((min Ci)/Ci)
   */
  let allProductsTotalNonBeneficialValuesRelatedToMin = 0;

  const productsWithValuesRelativeToMinBeneficial =
    productsWithBeneficialAndNonBeneficialValues.map((product) => {
      const nonBeneficialValueRelativeToGlobalMin =
        allProductsMinNonBeneficialValue > 0 &&
        product.totalNonBeneficialValues > 0
          ? allProductsMinNonBeneficialValue / product.totalNonBeneficialValues
          : 0;

      allProductsTotalNonBeneficialValuesRelatedToMin +=
        nonBeneficialValueRelativeToGlobalMin ?? 0;

      return {
        ...product,
        minNonBeneficialValueRelativeToGlobalMin:
          nonBeneficialValueRelativeToGlobalMin,
      };
    });

  /**
   * STEP 4 - Get products Qi value
   */
  let allProductsMaxQi: number = -1;

  const productsQi = productsWithValuesRelativeToMinBeneficial.map(
    (product) => {
      let qi = product.totalBeneficialValues;

      // If there are non-beneficial values
      if (
        allProductsMinNonBeneficialValue > 0 &&
        allProductsTotalNonBeneficialValuesRelatedToMin > 0
      ) {
        // Then to the following calculous:
        // Qi + ((min Ci) x (sum Ci)) / Ci x sum((min Ci)/Ci)
        qi +=
          (allProductsMinNonBeneficialValue *
            allProductsTotalNonBeneficialValues) /
          (product.totalNonBeneficialValues *
            allProductsTotalNonBeneficialValuesRelatedToMin);
      }

      if (allProductsMaxQi === -1 || qi > allProductsMaxQi) {
        allProductsMaxQi = qi as number;
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
  let lastUi = -1;
  let lastRank = 0;

  const productsRank = productsUi
    .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.ui, p2.ui))
    .map(({ product, ui }, idx) => {
      let rank = undefined;

      if (isDefined(ui)) {
        rank = lastRank + (ui === lastUi ? 0 : 1);
        lastUi = ui;
        lastRank = rank;
      }

      return {
        ...product,
        rank,
      };
    });

  return productsRank;
}
