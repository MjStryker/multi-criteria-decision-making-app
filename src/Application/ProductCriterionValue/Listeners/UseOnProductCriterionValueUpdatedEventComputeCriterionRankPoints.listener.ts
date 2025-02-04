import { EventService } from '@/@Event/EventService';
import UseGetCriterionFromUuidQuery from '@/Application/Criterion/Queries/UseGetCriterionFromUuid.query';
import { useEffect } from 'react';
import UseSetProductCriterionValueListCommand from '../Commands/UseSetProductCriterionValueList.command';
import { ProductCriterionValueUpdatedEvent } from '../Events/ProductCriterionValueUpdated.event';
import { compareFn } from '@/@Shared/@Utils/Array';
import { SortByEnum } from '@/@Shared/@Enums/SortBy.enum';

export default function UseOnProductCriterionValueUpdatedEventComputeCriterionRankPointsListener() {
  const getCriterionFromUuid = UseGetCriterionFromUuidQuery();
  const setProductCriterionValueList = UseSetProductCriterionValueListCommand();

  useEffect(() => {
    const handle = (event: ProductCriterionValueUpdatedEvent) => {
      const criterion = getCriterionFromUuid(event.detail.criterionUuid);

      if (!criterion) {
        console.error(`Criterion ${event.detail.criterionUuid} not found`);
        return;
      }

      if (criterion.weight === null) {
        console.info(`Criterion ${event.detail.criterionUuid} has no weight. Skipping.`);
        return;
      }

      setProductCriterionValueList(currentList => {
        const newList = [...currentList].sort((p1, p2) =>
          compareFn(criterion.beneficial ? SortByEnum.ASC : SortByEnum.DESC)(p1.value, p2.value)
        );

        let lastValue: number | null = null;
        let lastPos = 0;

        newList.forEach(productCriterionValue => {
          if (productCriterionValue.criterionUuid === criterion.uuid) {
            const pos =
              productCriterionValue.value !== null && productCriterionValue.value !== lastValue ? lastPos + 1 : lastPos;

            const criterionRankPts =
              productCriterionValue.value !== null && criterion.weight !== null ? criterion.weight * pos : 0;

            lastPos = pos;
            lastValue = productCriterionValue.value;

            productCriterionValue.criterionRankPts = criterionRankPts;
          }
        });

        return newList;
      });
    };

    EventService.subscribe(ProductCriterionValueUpdatedEvent.name, handle);

    return () => EventService.unsubscribe(ProductCriterionValueUpdatedEvent.name, handle);
  }, [getCriterionFromUuid, setProductCriterionValueList]);
}
