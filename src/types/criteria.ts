export type TCriterion = {
  id: string;
  name: string | undefined;
  weight: number | undefined;
  unit: string | undefined;
  beneficial: boolean | undefined;
  defaultRowIdx: number;
};
