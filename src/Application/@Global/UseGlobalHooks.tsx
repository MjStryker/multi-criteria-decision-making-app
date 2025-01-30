import UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener from '../Criterion/Listeners/UseOnCriterionAddedEventAddDefaultProductCriterionValues.listener';
import UseOnProductAddedEventAddDefaultProductCriterionValuesListener from '../ProductCriterionValue/Listeners/UseOnProductAddedEventAddDefaultProductCriterionValues.listener';

export default function UseGlobalHooks() {
  /**
   * Listeners
   */
  UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener();
  UseOnProductAddedEventAddDefaultProductCriterionValuesListener();
}
