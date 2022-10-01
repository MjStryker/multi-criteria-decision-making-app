import { useCallback, useEffect, useState } from "react";

import { SORT_BY } from "../../constants/arrays";
import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import TableBody from "./Table/Body/TableBody";
import TableFooter from "./Table/Footer/TableFooter";
import TableHeader from "./Table/Header/TableHeader";
import { compareCriteriaByDefaultRowIdxFn } from "../../utils/criterias/criterias";
import { compareProductsByDefaultColumnIdxFn } from "../../utils/products/products";
import cordlessVacuumCleaner from "../../data/cordlessVacuumCleaner";
import { deepEqual } from "../../utils/objects";
import useHandleCriterias from "../../hooks/data/useHandleCriterias";
import useHandleProducts from "../../hooks/data/useHandleProducts";
import useHandleProductsWithCriterias from "../../hooks/data/useHandleProductsWithCriterias";
import useRankProducts from "../../hooks/data/useRankProducts";

const criteriasFromDB = cordlessVacuumCleaner.criterias;
const productsFromDB = cordlessVacuumCleaner.products;
const productsWithCriteriasFromDB = cordlessVacuumCleaner.productsWithCriterias;

const DataTable = () => {
  const [criterias, setCriterias] = useState(criteriasFromDB);
  const [products, setProducts] = useState(productsFromDB);
  const [productsWithCriterias, setProductsWithCriterias] = useState(
    productsWithCriteriasFromDB
  );

  const onSetCriterias: React.Dispatch<React.SetStateAction<TCriteria[]>> =
    useCallback(
      (newState) => {
        setCriterias(newState);
      },
      [setCriterias]
    );

  const onSetProducts: React.Dispatch<React.SetStateAction<TProduct[]>> =
    useCallback(
      (newState) => {
        setProducts(newState);
      },
      [setProducts]
    );

  const onSetProductsWithCriterias: React.Dispatch<
    React.SetStateAction<TProductWithCriteria[]>
  > = useCallback(
    (newState) => {
      setProductsWithCriterias(newState);
    },
    [setProductsWithCriterias]
  );

  const { rankedProducts } = useRankProducts(
    products,
    criterias,
    productsWithCriterias
  );

  const applyRankProducts = useCallback(() => {
    if (rankedProducts.length > 0) {
      console.log({
        products,
        rankedProducts,
        equal: deepEqual(products, rankedProducts),
      });

      if (!deepEqual(products, rankedProducts)) {
        console.log("Saving new ranks..");
        setProducts(rankedProducts);
      }
    }
  }, [products, rankedProducts]);

  useEffect(() => {
    applyRankProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankedProducts]);

  const { addProductWithCriteria, setProductCriteriaValue } =
    useHandleProductsWithCriterias(
      productsWithCriterias,
      onSetProductsWithCriterias,
      products,
      criterias
    );

  const { addCriteria, updateCriteria, removeCriteria } = useHandleCriterias(
    onSetCriterias,
    products,
    addProductWithCriteria
  );

  const { addProduct, updateProduct, removeProduct } = useHandleProducts(
    onSetProducts,
    criterias,
    addProductWithCriteria
  );

  const criteriasSorted = criterias.sort(
    compareCriteriaByDefaultRowIdxFn(SORT_BY.ASC)
  );

  const productsSorted = products.sort(
    compareProductsByDefaultColumnIdxFn(SORT_BY.ASC)
  );

  return (
    <table
      cellSpacing={0}
      cellPadding={8}
      style={{ height: "fit-content", borderCollapse: "collapse" }}
    >
      <TableHeader
        products={productsSorted}
        addProduct={addProduct}
        updateProduct={updateProduct}
        removeProduct={removeProduct}
      />

      <TableBody
        criterias={criteriasSorted}
        products={productsSorted}
        updateCriteria={updateCriteria}
        removeCriteria={removeCriteria}
        setProductCriteriaValue={setProductCriteriaValue}
      />

      <TableFooter
        criterias={criteriasSorted}
        products={productsSorted}
        addCriteria={addCriteria}
      />
    </table>
  );
};

export default DataTable;
