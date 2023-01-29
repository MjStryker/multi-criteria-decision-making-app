import { Table, TableContainer } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { IsAnyEditDialogOpenedContextProvider } from "../../context/IsAnyEditDialogOpened";
import { SORT_BY } from "../../constants/arrays";
import { TCriterion } from "../../types/criteria";
import { TProduct } from "../../types/products";
import { TProductWithCriterion } from "../../types/productsWithCriteria";
import TableBody from "./Table/Body/TableBody";
import TableFooter from "./Table/Footer/TableFooter";
import TableHeader from "./Table/Header/TableHeader";
import { compareCriteriaByDefaultRowIdxFn } from "../../utils/criteria/criteria";
import { compareProductsByDefaultColumnIdxFn } from "../../utils/products/products";
import cordlessVacuumCleaner from "../../data/cordlessVacuumCleaner";
import { deepEqual } from "../../utils/objects";
import useHandleCriteria from "../../hooks/data/useHandleCriteria";
import useHandleProducts from "../../hooks/data/useHandleProducts";
import useHandleProductsWithCriteria from "../../hooks/data/useHandleProductsWithCriteria";
import useRankProducts from "../../hooks/data/useRankProducts";

const criteriaFromDB = cordlessVacuumCleaner.criteria;
const productsFromDB = cordlessVacuumCleaner.products;
const productsWithCriteriaFromDB = cordlessVacuumCleaner.productsWithCriteria;

const DataTable = () => {
  const [criteria, setCriteria] = useState(criteriaFromDB);
  const [products, setProducts] = useState(productsFromDB);
  const [productsWithCriteria, setProductsWithCriteria] = useState(
    productsWithCriteriaFromDB
  );

  const onSetCriteria: React.Dispatch<React.SetStateAction<TCriterion[]>> =
    useCallback(
      (newState) => {
        setCriteria(newState);
      },
      [setCriteria]
    );

  const onSetProducts: React.Dispatch<React.SetStateAction<TProduct[]>> =
    useCallback(
      (newState) => {
        setProducts(newState);
      },
      [setProducts]
    );

  const onSetProductsWithCriteria: React.Dispatch<
    React.SetStateAction<TProductWithCriterion[]>
  > = useCallback(
    (newState) => {
      setProductsWithCriteria(newState);
    },
    [setProductsWithCriteria]
  );

  const { rankedProducts } = useRankProducts(
    products,
    criteria,
    productsWithCriteria
  );

  const updateProductsRanks = useCallback(() => {
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
    updateProductsRanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankedProducts]);

  const { addProductWithCriteria, setProductCriterionValue } =
    useHandleProductsWithCriteria(
      productsWithCriteria,
      onSetProductsWithCriteria
      // products,
      // criteria
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

  const criteriaSorted = criteria.sort(
    compareCriteriaByDefaultRowIdxFn(SORT_BY.ASC)
  );

  const productsSorted = products.sort(
    compareProductsByDefaultColumnIdxFn(SORT_BY.ASC)
  );

  return (
    <IsAnyEditDialogOpenedContextProvider>
      <TableContainer
        className="TableContainer"
        h="full"
        pl="12"
        pr="8"
        display="flex"
        alignItems="center"
      >
        <Table size="sm">
          <TableHeader
            products={productsSorted}
            addProduct={addProduct}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
          />

          <TableBody
            criteria={criteriaSorted}
            products={productsSorted}
            productsWithCriteria={productsWithCriteria}
            updateCriterion={updateCriterion}
            removeCriterion={removeCriterion}
            setProductCriterionValue={setProductCriterionValue}
          />

          <TableFooter
            criteria={criteriaSorted}
            products={productsSorted}
            addCriterion={addCriterion}
          />
        </Table>
      </TableContainer>
    </IsAnyEditDialogOpenedContextProvider>
  );
};

export default DataTable;
