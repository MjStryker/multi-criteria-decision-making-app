export type CriterionDto = {
  uuid: string;
  name: string | null;
  weight: number | null;
  normalizedWeight: number | null;
  unit: string | null;
  beneficial: boolean | null;
  defaultRowIdx: number;
};
