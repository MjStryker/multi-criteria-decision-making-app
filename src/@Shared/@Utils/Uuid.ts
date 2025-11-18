import { v4 as uuidv4 } from "uuid";

export const Uuid = {
  newRandom(): string {
    return uuidv4();
  }
};
