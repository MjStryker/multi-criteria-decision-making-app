import { Uuid } from '@/@Shared/@Utils/Uuid';
import { computeProductCriterionValueRankPts } from './ComputeProductCriterionValueRankPoints';
import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { ProductCriterionValueDto } from '@/Application/ProductCriterionValue/Dtos/ProductCriteriaValue.dto';
import { describe, it, expect } from 'vitest';

function criterionForTest(values: Pick<CriterionDto, 'uuid' | 'beneficial' | 'weight'>): CriterionDto {
  return {
    uuid: values.uuid,
    weight: values.weight,
    beneficial: values.beneficial,
    name: '',
    normalizedWeight: null,
    unit: null,
    defaultRowIdx: 1
  };
}

function productCriterionValueForTest(
  values: Pick<ProductCriterionValueDto, 'criterionUuid' | 'value'>
): ProductCriterionValueDto {
  return {
    uuid: Uuid.newRandom(),
    criterionUuid: values.criterionUuid,
    value: values.value,
    productUuid: '',
    criterionRankPts: 0
  };
}

describe('computeProductCriterionValueRankPts', () => {
  it('should compute rank points based on criteria weights and product values', () => {
    const criteria: CriterionDto[] = [
      criterionForTest({ uuid: 'c1', beneficial: true, weight: 2 }),
      criterionForTest({ uuid: 'c2', beneficial: false, weight: 3 })
    ];

    const productCriterionValues: ProductCriterionValueDto[] = [
      productCriterionValueForTest({ criterionUuid: 'c1', value: 10 }),
      productCriterionValueForTest({ criterionUuid: 'c1', value: 20 }),
      productCriterionValueForTest({ criterionUuid: 'c1', value: 20 }),
      productCriterionValueForTest({ criterionUuid: 'c2', value: 5 }),
      productCriterionValueForTest({ criterionUuid: 'c2', value: 3 })
    ];

    const result = computeProductCriterionValueRankPts(criteria, productCriterionValues);

    expect(result.find(p => p.criterionUuid === 'c1' && p.value === 10)?.criterionRankPts).toBe(2);
    expect(result.find(p => p.criterionUuid === 'c1' && p.value === 20)?.criterionRankPts).toBe(4);
    expect(result.find(p => p.criterionUuid === 'c2' && p.value === 5)?.criterionRankPts).toBe(3);
    expect(result.find(p => p.criterionUuid === 'c2' && p.value === 3)?.criterionRankPts).toBe(6);
  });

  it('should handle missing criterion weights or product values by assigning 0 rank points', () => {
    const criteria: CriterionDto[] = [criterionForTest({ uuid: 'c1', beneficial: true, weight: null })];

    const productCriterionValues: ProductCriterionValueDto[] = [
      productCriterionValueForTest({ criterionUuid: 'c1', value: 10 }),
      productCriterionValueForTest({ criterionUuid: 'c1', value: null })
    ];

    const result = computeProductCriterionValueRankPts(criteria, productCriterionValues);

    expect(result.find(p => p.criterionUuid === 'c1' && p.value === 10)?.criterionRankPts).toBe(0);
    expect(result.find(p => p.criterionUuid === 'c1' && p.value === null)?.criterionRankPts).toBe(0);
  });

  it('should handle multiple criteria correctly', () => {
    const criteria: CriterionDto[] = [
      criterionForTest({ uuid: 'c1', beneficial: true, weight: 1 }),
      criterionForTest({ uuid: 'c2', beneficial: false, weight: 1 })
    ];

    const productCriterionValues: ProductCriterionValueDto[] = [
      productCriterionValueForTest({ criterionUuid: 'c1', value: 15 }),
      productCriterionValueForTest({ criterionUuid: 'c1', value: 10 }),
      productCriterionValueForTest({ criterionUuid: 'c2', value: 20 }),
      productCriterionValueForTest({ criterionUuid: 'c2', value: 25 })
    ];

    const result = computeProductCriterionValueRankPts(criteria, productCriterionValues);

    expect(result.find(p => p.criterionUuid === 'c1' && p.value === 15)?.criterionRankPts).toBe(2);
    expect(result.find(p => p.criterionUuid === 'c1' && p.value === 10)?.criterionRankPts).toBe(1);
    expect(result.find(p => p.criterionUuid === 'c2' && p.value === 20)?.criterionRankPts).toBe(2);
    expect(result.find(p => p.criterionUuid === 'c2' && p.value === 25)?.criterionRankPts).toBe(1);
  });
});
