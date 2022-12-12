import { SORT_BY } from "../../constants/arrays";
import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { compareFn } from "../arrays";
import { isDefined } from "../objects";

/**
 * Rank products for each criteria
 */
function rankProductsPerCriterion(
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
): TProductWithCriterion[] {
  const res = [...productsWithCriteria];

  [...criteria].forEach((criterion) => {
    const products = res.filter(
      ({ criterionId }) => criterionId === criterion.id
    );

    let lastValue: number | undefined = undefined;
    let lastPos = 0;

    products
      .sort((p1, p2) =>
        compareFn(SORT_BY[criterion.beneficial === true ? "ASC" : "DESC"])(
          p1.value,
          p2.value
        )
      )
      .forEach((product) => {
        const pos =
          lastPos +
          (isDefined(criterion.weight) && lastValue !== product.value ? 1 : 0);

        product.criterionRankPts = isDefined(criterion.weight)
          ? criterion.weight * pos
          : 0;

        lastPos = pos;
        lastValue = product.value;
      });
  });

  return res;
}

// /**
//  * Rank products for each criteria
//  */
// function rankCriteriaProducts(
//   products: TProduct[],
//   criteria: TCriterion[],
//   productsWithCriteria: TProductWithCriterion[]
// ): TProductWithCriterion[] {
//   let productsWithCriteriaRank = [...productsWithCriteria];

//   [...criteria].forEach((criterion) => {
//     const isBeneficial = criterion.beneficial === true;

// let lastValue: number | undefined = undefined;
// let lastPos = 0;

//     [...products]
//       .map((product) => ({
//         ...product,
//         rankPts: 0,
//       }))
//       /**
//        * Get products values
//        */
//       .map((product) => {
//         const value = productsWithCriteria.find(
//           ({ criterionId, productId }) =>
//             criterionId === criterion.id && productId === product.id
//         )?.value;

//         return { ...product, value };
//       })
//       /**
//        * Sort them by value using their idx in the array as pts (further in the array the better)
//        */
// .sort((p1, p2) =>
//   compareFn(SORT_BY[isBeneficial ? "ASC" : "DESC"])(p1.value, p2.value)
// )
// /**
//  * Calculate rankPts
//  */
// .forEach(({ value, rankPts, ...product }, idx) => {
//   const pos =
//     lastPos +
//     (isDefined(criterion.weight) && lastValue !== value ? 1 : 0);

//   const criterionRank = isDefined(criterion.weight)
//     ? criterion.weight * pos
//     : 0;

//   const productWithCriterion = productsWithCriteriaRank.find(
//     ({ criterionId, productId }) =>
//       criterionId === criterion.id && productId === product.id
//   );

//   if (productWithCriterion) {
//     productWithCriterion.criterionRank = criterionRank;
//   }

//         // lastValue = value;
//         // lastPos = pos;

//         // return {
//         //   ...product,
//         //   rankPts: rankPts + criterionRank,
//         // };
//       });
//   });

//   return productsWithCriteriaRank;
// }

export function rankProducts(
  products: TProduct[],
  criteria: TCriterion[],
  productsWithCriteria: TProductWithCriterion[]
): TProduct[] {
  const rankedProducts = [...products];

  const productsWithCriteriaRanks = rankProductsPerCriterion(
    products,
    criteria,
    productsWithCriteria
  );

  const test = [...rankedProducts].map((product) => {
    const rankPts = products.reduce((total, product) => {
      const pts =
        productsWithCriteriaRanks.find(
          ({ productId }) => productId === product.id
        )?.criterionRankPts ?? 0;

      return (total += pts);
    }, 0);

    return { ...product, rankPts };
  });

  console.log(test);

  return rankedProducts;
}
