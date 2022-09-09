import { TCriteria } from "../../types/criteria";

const criteria: TCriteria[] = [
  {
    id: "prix123",
    name: "prix",
    unit: "€",
    weight: 1,
    higherTheBetter: false,
  },
  {
    id: "puissanceAspiration123",
    name: "puissance d'aspiration max",
    unit: "AW",
    weight: 1,
    higherTheBetter: true,
  },
  {
    id: "autonomie123",
    name: "autonomie",
    unit: "min",
    weight: 1,
    higherTheBetter: true,
  },
  {
    id: "capaciteReservoir123",
    name: "capacité du réservoir",
    unit: "L",
    weight: 1,
    higherTheBetter: true,
  },
  {
    id: "nbAccessoires123",
    name: "nb accessoires",
    unit: "-",
    weight: 1,
    higherTheBetter: true,
  },
  {
    id: "batterieAmovible123",
    name: "batterie amovible",
    unit: "-",
    weight: 1,
    higherTheBetter: true,
  },
];

export default criteria;
