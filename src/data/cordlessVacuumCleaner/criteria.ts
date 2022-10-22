import { TCriterion } from "../../types/criteria";

const criteria: TCriterion[] = [
  {
    id: "prix123",
    name: "prix",
    unit: "€",
    weight: 2,
    normalizedWeight: 0.5,
    beneficial: false,
    defaultRowIdx: 0,
  },
  {
    id: "puissanceAspiration123",
    name: "puissance d'aspiration max",
    unit: "AW",
    weight: 1,
    normalizedWeight: 0.25,
    beneficial: true,
    defaultRowIdx: 1,
  },
  {
    id: "autonomie123",
    name: "autonomie",
    unit: "min",
    weight: 1,
    normalizedWeight: 0.25,
    beneficial: true,
    defaultRowIdx: 2,
  },
  // {
  //   id: "capaciteReservoir123",
  //   name: "capacité du réservoir",
  //   unit: "L",
  //   weight: 1,
  //   normalizedWeight: undefined,
  //   beneficial: true,
  //   defaultRowIdx: 3,
  // },
  // {
  //   id: "nbAccessoires123",
  //   name: "nb accessoires",
  //   unit: "-",
  //   weight: 1,
  //   normalizedWeight: undefined,
  //   beneficial: true,
  //   defaultRowIdx: 4,
  // },
  // {
  //   id: "batterieAmovible123",
  //   name: "batterie amovible",
  //   unit: "-",
  //   weight: 1,
  //   normalizedWeight: undefined,
  //   beneficial: true,
  //   defaultRowIdx: 5,
  // },
];

export default criteria;
