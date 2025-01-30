import UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener from '@/Application/ProductCriterionValue/Listeners/UseOnCriterionAddedEventAddDefaultProductCriterionValues.listener';
import UseOnProductAddedEventAddDefaultProductCriterionValuesListener from '@/Application/ProductCriterionValue/Listeners/UseOnProductAddedEventAddDefaultProductCriterionValues.listener';

export default function UseGlobalHooks() {
  /**
   * Listeners
   */
  UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener();
  UseOnProductAddedEventAddDefaultProductCriterionValuesListener();
}
