import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
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
  // --
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
  // --
  productsWithCriteria: [],
  addProductWithCriteria: () => {},
  setProductCriterionValue: () => {},
  removeProductWithCriteria: () => {},
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
   * -- Ranking logic
   */

  // const { rankedProducts, productsWithCriteriaRankPts } = useMemo(
  //   () => rankProducts(products, criteria, productsWithCriteria),
  //   [criteria, products, productsWithCriteria]
  // );

  // const rankProductsCallback = useCallback(() => {
  //   console.log("Rank products");

  //   const { rankedProducts, productsWithCriteriaRankPts } = rankProducts(
  //     [...products],
  //     [...criteria],
  //     [...productsWithCriteria]
  //   );

  //   const rankedProductsSorted = [...rankedProducts].sort(compareProductsFn);

  //   setProducts(rankedProductsSorted);

  //   setProductsWithCriteria(productsWithCriteriaRankPts);
  // }, [compareProductsFn, criteria, products, productsWithCriteria]);

  // useEffect(() => {
  //   rankProductsCallback();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

  const { rankedProducts, productsWithCriteriaRankPts } = useMemo(() => {
    console.log("Ranking products");

    return rankProducts(
      [...products],
      [...criteria],
      [...productsWithCriteria]
    );
  }, [products, criteria, productsWithCriteria]);

  return (
    <DataContext.Provider
      value={{
        // --
        criteria,
        addCriterion,
        updateCriterion,
        removeCriterion,
        // --
        products: rankedProducts,
        addProduct,
        updateProduct,
        removeProduct,
        // --
        productsWithCriteria: productsWithCriteriaRankPts,
        addProductWithCriteria,
        setProductCriterionValue,
        removeProductWithCriteria,
      }}
      {...props}
    />
  );
};
