import { useCallback, useState } from "react";

import { TCriteria } from "../../types/criterias";
import { TProduct } from "../../types/products";
import { TProductWithCriteria } from "../../types/productsWithCriterias";
import TableBody from "./Table/TableBody";
import TableFooter from "./Table/TableFooter";
import TableHeader from "./Table/TableHeader";
import cordlessVacuumCleaner from "../../data/cordlessVacuumCleaner";
import useHandleCriterias from "../../hooks/data/useHandleCriterias";
import useHandleProducts from "../../hooks/data/useHandleProducts";
import useHandleProductsWithCriterias from "../../hooks/data/useHandleProductsWithCriterias";
import useRankProducts from "../../hooks/data/useRankProducts";

const criteriasFromDB = cordlessVacuumCleaner.criterias;
const productsFromDB = cordlessVacuumCleaner.products;
const productsWithCriteriasFromDB = cordlessVacuumCleaner.productsWithCriterias;

type DataTableProps = {};

const DataTable = (props: DataTableProps) => {
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

  useRankProducts(products, criterias, productsWithCriterias, onSetProducts);

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

  return (
    <table
      cellSpacing={0}
      cellPadding={8}
      style={{ height: "fit-content", borderCollapse: "collapse" }}
    >
      <TableHeader
        products={products}
        addProduct={addProduct}
        updateProduct={updateProduct}
        removeProduct={removeProduct}
      />

      <TableBody
        criterias={criterias}
        products={products}
        updateCriteria={updateCriteria}
        removeCriteria={removeCriteria}
        setProductCriteriaValue={setProductCriteriaValue}
      />

      <TableFooter
        criterias={criterias}
        products={products}
        addCriteria={addCriteria}
      />
    </table>
  );
};

export default DataTable;
