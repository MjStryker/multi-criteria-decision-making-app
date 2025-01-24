import { SortByEnum } from "@/@Shared/@Enums/SortBy.enum";
import { compareFn } from "@/@Shared/@Utils/Array";
import { isDefined } from "@/@Shared/@Utils/Object";
import { Criterion } from "@/types/Criterion";
import { Product } from "@/types/Product";
import { ProductCriterionValue } from "@/types/ProductCriterionValue";

/**
 * Rank products for each criteria
 */
export function calculateProductsCriteriaRankPts(
  criteria: Criterion[],
  productsWithCriteria: ProductCriterionValue[]
): ProductCriterionValue[] {
  const res = [...productsWithCriteria];

  [...criteria].forEach((criterion) => {
    const products = res.filter(
      ({ criterionId }) => criterionId === criterion.id
    );

    let lastValue: number | null = null;
    let lastPos = 0;

    products
      .sort((p1, p2) =>
        compareFn(SortByEnum[criterion.beneficial === true ? "ASC" : "DESC"])(
          p1.value,
          p2.value
        )
      )
      .forEach((product) => {
        const pos =
          isDefined(criterion.weight) &&
          isDefined(product.value) &&
          lastValue !== product.value
            ? lastPos + 1
            : lastPos;

        const criterionRankPts =
          isDefined(criterion.weight) && isDefined(product.value)
            ? criterion.weight * pos
            : 0;

        lastPos = pos;
        lastValue = product.value;

        product.criterionRankPts = criterionRankPts;
      });
  });

  return res;
}

export function rankProducts(
  products: Product[],
  criteria: Criterion[],
  productsWithCriteria: ProductCriterionValue[]
) {
  let lastRankPts: number | null = null;
  let lastPos = 0;

  const productsWithCriteriaRankPts = calculateProductsCriteriaRankPts(
    criteria,
    productsWithCriteria
  );

  const rankedProducts = [...products]
    .map((product) => {
      const rankPts = productsWithCriteriaRankPts
        .filter(({ productId }) => productId === product.id)
        .reduce(
          (total, current) => total + (current?.criterionRankPts ?? 0),
          0
        );

      return { ...product, rankPts };
    })
    .sort((p1, p2) => compareFn(SortByEnum.DESC)(p1.rankPts, p2.rankPts))
    .map(({ rankPts, ...product }) => {
      const pos = rankPts !== lastRankPts ? lastPos + 1 : lastPos;

      lastRankPts = rankPts;
      lastPos = pos;

      return { ...product, rank: pos, rankPts };
    });

  return { rankedProducts, productsWithCriteriaRankPts };
}
