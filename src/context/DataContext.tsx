import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
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

import { TCriterion } from "../types/criteria";
import { TProduct } from "../types/products";
import { TProductWithCriterion } from "../types/productsWithCriteria";
import { compareProductsByDefaultColumnIdxFn } from "../utils/products/products";
import cordlessVacuumCleaner from "../data/cordlessVacuumCleaner";
import { rankProducts } from "../utils/products/rankProducts";

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

  const compareProductsFn = compareProductsByDefaultColumnIdxFn();

  /**
   * -- Rank products on first render
   */

  // TODO: Fix & Apply
  const onRankProducts = useCallback(() => {
    console.log("Rank products");

    const { rankedProducts, productsWithCriteriaRankPts } = rankProducts(
      products,
      criteria,
      productsWithCriteria
    );

    const rankedProductsSorted = [...rankedProducts].sort(compareProductsFn);

    setProducts(rankedProductsSorted);

    setProductsWithCriteria(productsWithCriteriaRankPts);
  }, [compareProductsFn, criteria, products, productsWithCriteria]);

  useEffect(() => {
    onRankProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * -- Memoized setState functions
   */

  const onSetCriteria: Dispatch<SetStateAction<TCriterion[]>> = useCallback(
    (newState) => {
      setCriteria(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSetProducts: Dispatch<SetStateAction<TProduct[]>> = useCallback(
    (newState) => {
      setProducts(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSetProductsWithCriteria: Dispatch<
    SetStateAction<TProductWithCriterion[]>
  > = useCallback(
    (newState) => {
      setProductsWithCriteria(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * -- Handlers utils
   */

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
