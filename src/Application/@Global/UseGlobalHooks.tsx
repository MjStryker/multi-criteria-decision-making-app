import UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener from '../Criterion/Listeners/UseOnCriterionAddedEventAddDefaultProductCriterionValues.listener';
import UseOnProductAddedEventListener from '../Product/Listeners/UseOnProductAddedEvent.listener';

export default function UseGlobalHooks() {
  /**
   * Listeners
   */
  UseOnCriterionAddedEventAddDefaultProductCriterionValuesListener();
  UseOnProductAddedEventListener();
}
