import { computeProductCriterionValueRankPts } from './ComputeProductCriterionValueRankPoints';
import { describe, it, expect } from 'vitest';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { Uuid } from '@/@Shared/@Utils/Uuid';

function criterionForTest(values: Pick<CriterionDto, 'uuid' | 'beneficial' | 'weight'>): CriterionDto {
  return {
    uuid: values.uuid,
    beneficial: values.beneficial,
    weight: values.weight,
    name: '',
    normalizedWeight: null,
    unit: null,
    defaultRowIdx: 1
  };
}

function productForTest(values: Pick<ProductDto, 'uuid' | 'defaultColumnIdx'>): ProductDto {
  return {
    uuid: values.uuid,
    name: '',
    reference: '',
    rank: null,
    rankPts: null,
    defaultColumnIdx: values.defaultColumnIdx
  };
}

function productCriterionValueForTest(
  values: Pick<ProductCriterionValueDto, 'criterionUuid' | 'value' | 'productUuid'>
): ProductCriterionValueDto {
  return {
    uuid: Uuid.newRandom(),
    criterionUuid: values.criterionUuid,
    value: values.value,
    productUuid: values.productUuid,
    criterionRankPts: 0
  };
}

describe('computeProductCriterionValueRankPts', () => {
  it('should assign rank points in ascending order', () => {
    const criteria = [criterionForTest({ uuid: 'criterion-1', beneficial: true, weight: 10 })];
    const products = [
      productForTest({ uuid: 'product-1', defaultColumnIdx: 0 }),
      productForTest({ uuid: 'product-2', defaultColumnIdx: 1 }),
      productForTest({ uuid: 'product-3', defaultColumnIdx: 2 })
    ];
    const productCriterionValues = [
      productCriterionValueForTest({ criterionUuid: 'criterion-1', value: 10, productUuid: 'product-1' }),
      productCriterionValueForTest({ criterionUuid: 'criterion-1', value: 20, productUuid: 'product-2' }),
      productCriterionValueForTest({ criterionUuid: 'criterion-1', value: 30, productUuid: 'product-3' })
    ];

    const result = computeProductCriterionValueRankPts(criteria, products, productCriterionValues);

    expect(result.find(v => v.productUuid === 'product-1')?.criterionRankPts).toBe(0);
    expect(result.find(v => v.productUuid === 'product-2')?.criterionRankPts).toBe(1);
    expect(result.find(v => v.productUuid === 'product-3')?.criterionRankPts).toBe(2);
  });

  it('should handle criteria with tied values correctly', () => {
    const criteria = [criterionForTest({ uuid: 'criterion-2', beneficial: true, weight: 5 })];
    const products = [
      productForTest({ uuid: 'product-1', defaultColumnIdx: 0 }),
      productForTest({ uuid: 'product-2', defaultColumnIdx: 1 }),
      productForTest({ uuid: 'product-3', defaultColumnIdx: 2 })
    ];
    const productCriterionValues = [
      productCriterionValueForTest({ criterionUuid: 'criterion-2', value: 30, productUuid: 'product-1' }),
      productCriterionValueForTest({ criterionUuid: 'criterion-2', value: 30, productUuid: 'product-2' }),
      productCriterionValueForTest({ criterionUuid: 'criterion-2', value: 20, productUuid: 'product-3' })
    ];

    const result = computeProductCriterionValueRankPts(criteria, products, productCriterionValues);

    expect(result.find(v => v.productUuid === 'product-1')?.criterionRankPts).toBe(1);
    expect(result.find(v => v.productUuid === 'product-2')?.criterionRankPts).toBe(1);
    expect(result.find(v => v.productUuid === 'product-3')?.criterionRankPts).toBe(0);
  });

  it('should return unchanged list if no criteria match', () => {
    const criteria = [criterionForTest({ uuid: 'non-existent-criterion', beneficial: true, weight: 10 })];
    const products = [
      productForTest({ uuid: 'product-1', defaultColumnIdx: 0 }),
      productForTest({ uuid: 'product-2', defaultColumnIdx: 1 })
    ];
    const productCriterionValues = [
      productCriterionValueForTest({ criterionUuid: 'criterion-1', value: 50, productUuid: 'product-1' }),
      productCriterionValueForTest({ criterionUuid: 'criterion-1', value: 60, productUuid: 'product-2' })
    ];

    const result = computeProductCriterionValueRankPts(criteria, products, productCriterionValues);

    expect(result).toEqual(productCriterionValues);
  });

  it('should handle empty product criterion value list', () => {
    const criteria = [criterionForTest({ uuid: 'criterion-3', beneficial: true, weight: 10 })];
    const products: ProductDto[] = [];
    const productCriterionValues: ProductCriterionValueDto[] = [];

    const result = computeProductCriterionValueRankPts(criteria, products, productCriterionValues);

    expect(result).toEqual([]);
  });
});
