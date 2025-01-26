import { SortByEnum } from '@/@Shared/@Enums/SortBy.enum';
import { compareFn } from '@/@Shared/@Utils/Array';
import { isDefined } from '@/@Shared/@Utils/Object';
import { CriterionDto } from '@/Application/Dtos/Criterion.dto';
import { ProductDto } from '@/Application/Dtos/Product.dto';
import { ProductCriterionValueDto } from '@/Application/Dtos/ProductCriteriaValue.dto';

/**
 * Rank products for each criteria
 */
export function calculateProductsCriteriaRankPts(
  criterionList: CriterionDto[],
  productCriterionValueList: ProductCriterionValueDto[]
): ProductCriterionValueDto[] {
  const res = [...productCriterionValueList];

  [...criterionList].forEach(criterion => {
    const products = res.filter(({ criterionUuid }) => criterion.uuid === criterionUuid);

    let lastValue: number | null = null;
    let lastPos = 0;

    products
      .sort((p1, p2) => compareFn(SortByEnum[criterion.beneficial === true ? 'ASC' : 'DESC'])(p1.value, p2.value))
      .forEach(product => {
        const pos =
          isDefined(criterion.weight) && isDefined(product.value) && lastValue !== product.value
            ? lastPos + 1
            : lastPos;

        const criterionRankPts = isDefined(criterion.weight) && isDefined(product.value) ? criterion.weight * pos : 0;

        lastPos = pos;
        lastValue = product.value;

        product.criterionRankPts = criterionRankPts;
      });
  });

  return res;
}

export function rankProducts(
  productList: ProductDto[],
  criterionList: CriterionDto[],
  productCriterionList: ProductCriterionValueDto[]
) {
  let lastRankPts: number | null = null;
  let lastPos = 0;

  const productsWithCriteriaRankPts = calculateProductsCriteriaRankPts(criterionList, productCriterionList);

  const rankedProducts = [...productList]
    .map(product => {
      const rankPts = productsWithCriteriaRankPts
        .filter(({ productUuid }) => product.uuid === productUuid)
        .reduce((total, current) => total + (current?.criterionRankPts ?? 0), 0);

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
