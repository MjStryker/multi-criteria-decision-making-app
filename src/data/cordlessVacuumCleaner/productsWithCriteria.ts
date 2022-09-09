import { TProductWithCriteria } from "../../types/productWithCriteria";

const productsWithCriteria: TProductWithCriteria[] = [
  /**
   * Prix
   */
  {
    id: "prixDyson123",
    criteriaId: "prix123",
    productId: "dyson123",
    value: 800,
  },
  {
    id: "prixDreame123",
    criteriaId: "prix123",
    productId: "dreame123",
    value: 300,
  },
  {
    id: "prixRowenta123",
    criteriaId: "prix123",
    productId: "rowenta123",
    value: 400,
  },

  /**
   * Puissance aspiration
   */
  {
    id: "puissanceAspirationDyson123",
    criteriaId: "puissanceAspiration123",
    productId: "dyson123",
    value: 210,
  },
  {
    id: "puissanceAspirationDreame123",
    criteriaId: "puissanceAspiration123",
    productId: "dreame123",
    value: 180,
  },
  {
    id: "puissanceAspirationRowenta123",
    criteriaId: "puissanceAspiration123",
    productId: "rowenta123",
    value: 160,
  },

  /**
   * Autonomie
   */
  {
    id: "autonomieDyson123",
    criteriaId: "autonomie123",
    productId: "dyson123",
    value: 60,
  },
  {
    id: "autonomieDreame123",
    criteriaId: "autonomie123",
    productId: "dreame123",
    value: 60,
  },
  {
    id: "autonomieRowenta123",
    criteriaId: "autonomie123",
    productId: "rowenta123",
    value: 70,
  },

  /**
   * Capacité réservoir
   */
  {
    id: "capaciteReservoirDyson123",
    criteriaId: "capaciteReservoir123",
    productId: "dyson123",
    value: 0.75,
  },
  {
    id: "capaciteReservoirDreame123",
    criteriaId: "capaciteReservoir123",
    productId: "dreame123",
    value: 0.7,
  },
  {
    id: "capaciteReservoirRowenta123",
    criteriaId: "capaciteReservoir123",
    productId: "rowenta123",
    value: 0.8,
  },

  /**
   * Nb accessoires
   */
  {
    id: "nbAccessoiresDyson123",
    criteriaId: "nbAccessoires123",
    productId: "dyson123",
    value: 4,
  },
  {
    id: "nbAccessoiresDreame123",
    criteriaId: "nbAccessoires123",
    productId: "dreame123",
    value: 7,
  },
  {
    id: "nbAccessoiresRowenta123",
    criteriaId: "nbAccessoires123",
    productId: "rowenta123",
    value: 6,
  },

  /**
   * Batterie amovible
   */
  {
    id: "batterieAmovibleDyson123",
    criteriaId: "batterieAmovible123",
    productId: "dyson123",
    value: 0,
  },
  {
    id: "batterieAmovibleDreame123",
    criteriaId: "batterieAmovible123",
    productId: "dreame123",
    value: undefined,
  },
  {
    id: "batterieAmovibleRowenta123",
    criteriaId: "batterieAmovible123",
    productId: "rowenta123",
    value: 1,
  },
];

export default productsWithCriteria;
