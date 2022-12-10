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
  let productsWithRankPts = [...products].map((product) => ({
    ...product,
    rankPts: 0,
  }));

  /**
   * For each criteria
   */
  [...criteria].forEach((criterion) => {
    const isBeneficial = criterion.beneficial === true;

    let lastValue: number | undefined = undefined;
    let lastPos = 0;

    productsWithRankPts = [...productsWithRankPts]
      /**
       * Get products values
       */
      .map((product) => {
        const value = productsWithCriteria.find(
          ({ criterionId, productId }) =>
            criterionId === criterion.id && productId === product.id
        )?.value;

        return { ...product, value };
      })
      /**
       * Sort them by value using their idx in the array as pts (further in the array the better)
       */
      .sort((p1, p2) =>
        compareFn(SORT_BY[isBeneficial ? "ASC" : "DESC"])(p1.value, p2.value)
      )
      /**
       * Calculate rankPts (remove value property)
       */
      .map(({ value, rankPts, ...product }, idx) => {
        const pos =
          lastPos + (isDefined(lastValue) && lastValue !== value ? 1 : 0);

        const newRankPts =
          rankPts +
          (isDefined(criterion.weight) &&
          isDefined(lastValue) &&
          value !== lastValue
            ? criterion.weight * pos
            : 0);

        // console.log({
        //   criterion: criterion.name,
        //   lastValue,
        //   value,
        //   rankPts,
        //   newRankPts,
        // });

        lastValue = value;
        lastPos = pos;

        return {
          ...product,
          rankPts: newRankPts,
        };
      });
  });

  console.log(productsWithRankPts);

  return products;

  // const rankedProducts = productsWithRankPts
  //   /**
  //    * Sort products by pts (higher the better)
  //    */
  //   .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.rankPts, p2.rankPts))
  //   /**
  //    * Calculate ranks (remove rankPts property)
  //    */
  //   .map(({ rankPts, ...product }, idx) => ({
  //     ...product,
  //     rank: idx + 1,
  //   }))
  //   /**
  //    * Sort products by ranks (higher the better)
  //    */
  //   .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.rank, p2.rank));

  // console.log(rankedProducts);

  // return rankedProducts;
}

// function rankProductsUsingCoprasMethod(
//   products: TProduct[],
//   criteria: TCriterion[],
//   productsWithCriteria: TProductWithCriterion[]
// ): TProduct[] {
//   /**
//    * STEP 1 - Get normalized and weighted values for all products
//    */
//   const productsWithCriteriaNormalizedWeightedValues =
//     calculateProductsCriteriaNormalizedWeightedValues(
//       products,
//       criteria,
//       productsWithCriteria
//     );

//   /**
//    * STEP 2 - Get total beneficial and non-beneficial values (sum Bi / sum Ci)
//    *        - Get min non-beneficial value (min Ci)
//    */
//   let allProductsTotalNonBeneficialValues = 0;
//   let allProductsMinNonBeneficialValue = -1;

//   const productsWithBeneficialAndNonBeneficialValues = [...products].map(
//     (product) => {
//       let productTotalBeneficialValues = 0;
//       let productTotalNonBeneficialValues = 0;

//       criteria.forEach((criterion) => {
//         const productWithCriterion = findProductCriterionValue(
//           product,
//           criterion,
//           productsWithCriteriaNormalizedWeightedValues
//         );

//         const weightedValueOrZero = productWithCriterion?.weightedValue ?? 0;

//         // Get beneficial total (sum Bi)
//         if (criterion.beneficial === true) {
//           productTotalBeneficialValues += weightedValueOrZero;
//         }
//         // Get non-beneficial total (sum Ci)
//         else {
//           productTotalNonBeneficialValues += weightedValueOrZero;
//           allProductsTotalNonBeneficialValues += weightedValueOrZero;

//           // Get non-beneficial min (min Ci)
//           if (
//             allProductsMinNonBeneficialValue === -1 ||
//             weightedValueOrZero < allProductsMinNonBeneficialValue
//           ) {
//             allProductsMinNonBeneficialValue = weightedValueOrZero;
//           }
//         }
//       });

//       return {
//         product,
//         totalBeneficialValues: productTotalBeneficialValues,
//         totalNonBeneficialValues: productTotalNonBeneficialValues,
//       };
//     }
//   );

//   /**
//    * STEP 3 - Get non-beneficial values relative to min ((min Ci)/Ci)
//    */
//   let allProductsTotalNonBeneficialValuesRelatedToMin = 0;

//   const productsWithValuesRelativeToMinBeneficial =
//     productsWithBeneficialAndNonBeneficialValues.map((product) => {
//       const nonBeneficialValueRelativeToGlobalMin =
//         allProductsMinNonBeneficialValue > 0 &&
//         product.totalNonBeneficialValues > 0
//           ? allProductsMinNonBeneficialValue / product.totalNonBeneficialValues
//           : 0;

//       allProductsTotalNonBeneficialValuesRelatedToMin +=
//         nonBeneficialValueRelativeToGlobalMin ?? 0;

//       return {
//         ...product,
//         minNonBeneficialValueRelativeToGlobalMin:
//           nonBeneficialValueRelativeToGlobalMin,
//       };
//     });

//   /**
//    * STEP 4 - Get products Qi value
//    */
//   let allProductsMaxQi: number = -1;

//   const productsQi = productsWithValuesRelativeToMinBeneficial.map(
//     (product) => {
//       let qi = product.totalBeneficialValues;

//       // If there are non-beneficial values
//       if (
//         allProductsMinNonBeneficialValue > 0 &&
//         allProductsTotalNonBeneficialValuesRelatedToMin > 0
//       ) {
//         // Then to the following calculous:
//         // Qi + ((min Ci) x (sum Ci)) / Ci x sum((min Ci)/Ci)
//         qi +=
//           (allProductsMinNonBeneficialValue *
//             allProductsTotalNonBeneficialValues) /
//           (product.totalNonBeneficialValues *
//             allProductsTotalNonBeneficialValuesRelatedToMin);
//       }

//       if (allProductsMaxQi === -1 || qi > allProductsMaxQi) {
//         allProductsMaxQi = qi as number;
//       }

//       return { ...product, qi };
//     }
//   );

//   /**
//    * STEP 5 - Get products Ui (rank in percentage)
//    */
//   const productsUi = productsQi.map((product) => {
//     const ui =
//       product.qi && allProductsMaxQi
//         ? product.qi / allProductsMaxQi
//         : undefined;

//     return { ...product, ui };
//   });

//   /**
//    * STEP 6 - Get products rank (+ sort by rank)
//    */
//   let lastUi = -1;
//   let lastRank = 0;

//   const productsRank = productsUi
//     .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.ui, p2.ui))
//     .map(({ product, ui }, idx) => {
//       let rank = undefined;

//       if (isDefined(ui)) {
//         rank = lastRank + (ui === lastUi ? 0 : 1);
//         lastUi = ui;
//         lastRank = rank;
//       }

//       return {
//         ...product,
//         rank,
//       };
//     });

//   return productsRank;
// }

// export function rankProducts(
//   products: TProduct[],
//   criteria: TCriterion[],
//   productsWithCriteria: TProductWithCriterion[]
// ): TProduct[] {
//   /**
//    * * If data is simple (same criterion weight) -> Compare products' values
//    */
//   if (sumCriteriaWeight(criteria) === criteria.length) {
//     const productsBeneficialAndNonBeneficialTotals = products.map(
//       (product) => ({
//         ...product,
//         beneficialRankTotal: undefined as number | undefined,
//         nonBeneficialRankTotal: undefined as number | undefined,
//       })
//     );

//     let maxBeneficial: number | undefined = undefined;
//     let minNonBeneficial: number | undefined = undefined;

//     criteria.forEach((criterion) => {
//       productsBeneficialAndNonBeneficialTotals.map((product) => {
//         const value: number | undefined = findProductCriterionValue(
//           product,
//           criterion,
//           productsWithCriteria
//         )?.value;

//         if (criterion.beneficial === true) {
//           const newBeneficialRankSum = isDefined(value)
//             ? isDefined(product.beneficialRankTotal)
//               ? product.beneficialRankTotal + value
//               : value
//             : undefined;

//           product.beneficialRankTotal = newBeneficialRankSum;

//           if (
//             isDefined(newBeneficialRankSum) &&
//             (!maxBeneficial || newBeneficialRankSum > maxBeneficial)
//           ) {
//             maxBeneficial = newBeneficialRankSum;
//           }
//         }

//         if (criterion.beneficial === false) {
//           const newNonBeneficialRankSum = isDefined(value)
//             ? isDefined(product.nonBeneficialRankTotal)
//               ? product.nonBeneficialRankTotal + value
//               : value
//             : undefined;

//           product.nonBeneficialRankTotal = newNonBeneficialRankSum;

//           if (
//             isDefined(newNonBeneficialRankSum) &&
//             (!minNonBeneficial || newNonBeneficialRankSum < minNonBeneficial)
//           ) {
//             minNonBeneficial = newNonBeneficialRankSum;
//           }
//         }

//         return product;
//       });
//     });

//     const productsRanksInPercentage =
//       productsBeneficialAndNonBeneficialTotals.map(
//         ({
//           beneficialRankTotal: beneficialRankSum,
//           nonBeneficialRankTotal: nonBeneficialRankSum,
//           ...product
//         }) => {
//           const beneficialRank = areDefined([beneficialRankSum, maxBeneficial])
//             ? beneficialRankSum! / maxBeneficial!
//             : undefined;

//           const nonBeneficialRank = areDefined([
//             nonBeneficialRankSum,
//             minNonBeneficial,
//           ])
//             ? 2 - nonBeneficialRankSum! / minNonBeneficial!
//             : undefined;

//           const ui = areDefined([beneficialRank, nonBeneficialRank])
//             ? beneficialRank! + nonBeneficialRank!
//             : isDefined(beneficialRank)
//             ? beneficialRank
//             : isDefined(nonBeneficialRank)
//             ? nonBeneficialRank
//             : undefined;

//           return { ...product, ui };
//         }
//       );

//     let lastUi = -1;
//     let lastRank = 0;

//     const productsRank = productsRanksInPercentage
//       .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.ui, p2.ui))
//       .map(({ ui, ...product }) => {
//         let rank = undefined;

//         if (isDefined(ui)) {
//           rank = lastRank + (ui === lastUi ? 0 : 1);
//           lastUi = ui;
//           lastRank = rank;
//         }

//         return {
//           ...product,
//           rank,
//         };
//       });

//     return productsRank;
//   }

//   /**
//    * * Else if data is complex (criteria with different weights) -> Use COPRAS method
//    */
//   return rankProductsUsingCoprasMethod(
//     products,
//     criteria,
//     productsWithCriteria
//   );
// }
