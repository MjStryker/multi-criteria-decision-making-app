import { TCriteria } from "../../types/criterias";
import { nanoid } from "nanoid";

export const createEmptyCriteria = (): TCriteria => ({
  id: nanoid(),
  name: undefined,
  weight: 1,
  unit: undefined,
  higherTheBetter: undefined,
});
