import UseOnCriterionAddedEventListener from '../Listeners/UseOnCriterionAddedEvent.listener';
import UseOnProductAddedEventListener from '../Listeners/UseOnProductAddedEvent.listener';

export default function UseGlobalHooks() {
  /**
   * Listeners
   */
  UseOnCriterionAddedEventListener();
  UseOnProductAddedEventListener();
}
