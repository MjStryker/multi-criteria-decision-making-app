import { computeProductCriterionValueRankPts } from '@/@Compute/ComputeProductCriterionValueRankPoints';
import { EventService } from '@/@Event/EventService';
import UseGetCriterionFromUuidQuery from '@/Application/Criterion/Queries/UseGetCriterionFromUuid.query';
import { useEffect } from 'react';
import UseSetProductCriterionValueListCommand from '../Commands/UseSetProductCriterionValueList.command';
import { ProductCriterionValueUpdatedEvent } from '../Events/ProductCriterionValueUpdated.event';

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

      setProductCriterionValueList(currentList => computeProductCriterionValueRankPts([criterion], [...currentList]));
    };

    EventService.subscribe(ProductCriterionValueUpdatedEvent.name, handle);

    return () => EventService.unsubscribe(ProductCriterionValueUpdatedEvent.name, handle);
  }, [getCriterionFromUuid, setProductCriterionValueList]);
}
