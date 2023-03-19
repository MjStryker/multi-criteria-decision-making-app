import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
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
import { compareCriteriaByDefaultRowIdxFn } from "../utils/criteria/criteria";
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
  isPending: boolean;
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
  isPending: false,
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

  const [rankedProducts, setRankedProducts] = useState(productsFromDB);
  const [productsWithCriteriaRankPts, setProductsWithCriteriaRankPts] =
    useState(productsWithCriteriaFromDB);

  const [isPending, startTransition] = useTransition();

  const compareProductsFn = compareProductsByDefaultColumnIdxFn();

  const compareCriteriaFn = compareCriteriaByDefaultRowIdxFn();

  /**
   * -- Ranking logic
   */

  useEffect(() => {
    console.log("Ranking products");

    const { rankedProducts, productsWithCriteriaRankPts } = rankProducts(
      [...products],
      [...criteria],
      [...productsWithCriteria]
    );

    startTransition(() => {
      setRankedProducts(rankedProducts);
      setProductsWithCriteriaRankPts(productsWithCriteriaRankPts);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, criteria, productsWithCriteria]);

  /**
   * -- Memoized setState functions
   */

  const onSetCriteria: Dispatch<SetStateAction<TCriterion[]>> = useCallback(
    (newState) => setCriteria(newState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSetProducts: Dispatch<SetStateAction<TProduct[]>> = useCallback(
    (newState) => setProducts(newState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSetProductsWithCriteria: Dispatch<
    SetStateAction<TProductWithCriterion[]>
  > = useCallback(
    (newState) => setProductsWithCriteria(newState),
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

  /**
   * -- Res
   */

  const sortedCriteria = criteria.sort(compareCriteriaFn);
  const sortedProducts = rankedProducts.sort(compareProductsFn);

  return (
    <DataContext.Provider
      value={{
        isPending,
        // --
        criteria: sortedCriteria,
        addCriterion,
        updateCriterion,
        removeCriterion,
        // --
        products: sortedProducts,
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
