import { SORT_BY } from "../../constants/arrays";
import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import { compareFn } from "../arrays";
import { isDefined } from "../objects";

/**
 * Rank products for each criteria
 */
export function calculateProductsCriteriaRankPts(
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
          isDefined(criterion.weight) && lastValue !== product.value
            ? lastPos + 1
            : lastPos;

        const criterionRankPts = isDefined(criterion.weight)
          ? criterion.weight * pos
          : 1;

        lastPos = pos;
        lastValue = product.value;

        product.criterionRankPts = criterionRankPts;
      });
  });

  return res;
}

export function rankProducts(
  products: TProduct[],
  productsWithCriteria: TProductWithCriterion[]
): TProduct[] {
  let lastRankPts: number | undefined = undefined;
  let lastPos = 0;

  const res = [...products]
    .map((product) => {
      const rankPts = productsWithCriteria
        .filter(({ productId }) => productId === product.id)
        .reduce(
          (total, current) => total + (current?.criterionRankPts ?? 0),
          0
        );

      return { ...product, rankPts };
    })
    .sort((p1, p2) => compareFn(SORT_BY.DESC)(p1.rankPts, p2.rankPts))
    .map(({ rankPts, rank, ...product }) => {
      const pos = rankPts !== lastRankPts ? lastPos + 1 : lastPos;

      lastRankPts = rankPts;
      lastPos = pos;

      return { ...product, rank: pos };
    });

  return res;
}
