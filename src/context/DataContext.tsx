import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import useHandleCriteria, {
  useHandleCriteriaFunctions,
} from "../hooks/data/useHandleCriteria";
import useHandleProducts, {
  useHandleProductsFunctions,
} from "../hooks/data/useHandleProducts";
import useHandleProductsWithCriteria, {
  useHandleProductsWithCriteriaFunctions,
} from "../hooks/data/useHandleProductsWithCriteria";

import { SORT_BY } from "../constants/arrays";
import { TCriterion } from "../types/criteria";
import { TProduct } from "../types/products";
import { TProductWithCriterion } from "../types/productsWithCriteria";
import { compareCriteriaByDefaultRowIdxFn } from "../utils/criteria/criteria";
import { compareProductsByDefaultColumnIdxFn } from "../utils/products/products";
import cordlessVacuumCleaner from "../data/cordlessVacuumCleaner";

/**
 * * 0 - Example data
 */
const criteriaFromDB = cordlessVacuumCleaner.criteria;
const productsFromDB = cordlessVacuumCleaner.products;
const productsWithCriteriaFromDB = cordlessVacuumCleaner.productsWithCriteria;

/**
 * * 1 - Type
 */
type ContextType = {
  criteria: TCriterion[];
  products: TProduct[];
  productsWithCriteria: TProductWithCriterion[];
  setCriteria: Dispatch<SetStateAction<TCriterion[]>>;
  setProducts: Dispatch<SetStateAction<TProduct[]>>;
  setProductsWithCriteria: Dispatch<SetStateAction<TProductWithCriterion[]>>;
} & useHandleCriteriaFunctions &
  useHandleProductsFunctions &
  useHandleProductsWithCriteriaFunctions;

/**
 * * 2 - Default value
 */
const defaultValue: ContextType = {
  // --
  criteria: [],
  addCriterion: () => {},
  updateCriterion: () => {},
  removeCriterion: () => {},
  setCriteria: () => {},
  // --
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
  setProducts: () => {},
  // --
  productsWithCriteria: [],
  addProductWithCriteria: () => {},
  setProductCriterionValue: () => {},
  removeProductWithCriteria: () => {},
  setProductsWithCriteria: () => {},
};

/**
 * * 3 - Context
 */
export const DataContext = createContext<ContextType>(defaultValue);

/**
 * * 4 - Provider
 */
export const DataContextProvider = (props: { children: ReactNode }) => {
  const [criteria, setCriteria] = useState(criteriaFromDB);
  const [products, setProducts] = useState(productsFromDB);
  const [productsWithCriteria, setProductsWithCriteria] = useState(
    productsWithCriteriaFromDB
  );

  const onSetCriteria: Dispatch<SetStateAction<TCriterion[]>> = useCallback(
    (newState) => {
      // TODO
      // .sort(
      //   compareCriteriaByDefaultRowIdxFn(SORT_BY.ASC)
      // )
      setCriteria(newState);
    },
    []
  );

  const onSetProducts: Dispatch<SetStateAction<TProduct[]>> = useCallback(
    (newState) => {
      // TODO
      // .sort(
      //   compareProductsByDefaultColumnIdxFn(SORT_BY.ASC)
      // )
      setProducts(newState);
    },
    []
  );

  const onSetProductsWithCriteria: Dispatch<
    SetStateAction<TProductWithCriterion[]>
  > = useCallback((newState) => {
    setProductsWithCriteria(newState);
  }, []);

  const {
    addProductWithCriteria,
    setProductCriterionValue,
    removeProductWithCriteria,
  } = useHandleProductsWithCriteria(
    productsWithCriteria,
    onSetProductsWithCriteria
  );

  const { addCriterion, updateCriterion, removeCriterion } = useHandleCriteria(
    onSetCriteria,
    products,
    addProductWithCriteria
  );

  const { addProduct, updateProduct, removeProduct } = useHandleProducts(
    onSetProducts,
    criteria,
    addProductWithCriteria
  );

  return (
    <DataContext.Provider
      value={{
        // --
        criteria,
        addCriterion,
        updateCriterion,
        removeCriterion,
        setCriteria: onSetCriteria,
        // --
        products,
        addProduct,
        updateProduct,
        removeProduct,
        setProducts: onSetProducts,
        // --
        productsWithCriteria,
        addProductWithCriteria,
        setProductCriterionValue,
        removeProductWithCriteria,
        setProductsWithCriteria: onSetProductsWithCriteria,
      }}
      {...props}
    />
  );
};
