import { Uuid } from "@/@Shared/@Utils/Uuid";

export type CriterionDto = {
  uuid: string;
  name: string | null;
  weight: number;
  normalizedWeight: number | null;
  unit: string | null;
  beneficial: boolean | null;
  defaultRowIdx: number;
};

export const CriterionDto = {
  newEmpty(defaultRowIdx: number): CriterionDto {
    return {
      uuid: Uuid.newRandom(),
      name: null,
      weight: 1,
      normalizedWeight: null,
      unit: null,
      beneficial: true,
      defaultRowIdx
    };
  }
};
