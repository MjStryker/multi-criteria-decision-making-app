import UseOnCriterionAddedEventListener from '../Criterion/Listeners/UseOnCriterionAddedEvent.listener';
import UseOnProductAddedEventListener from '../Product/Listeners/UseOnProductAddedEvent.listener';

export default function UseGlobalHooks() {
  /**
   * Listeners
   */
  UseOnCriterionAddedEventListener();
  UseOnProductAddedEventListener();
}
