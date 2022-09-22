import {
  clampCriteriaWeightValue,
  compareCriteriaByDefaultRowIdxFn,
  sumCriteriasWeight,
} from "../../utils/criterias/criterias";
import { useRef, useState } from "react";

import { CRITERIA } from "../../constants/criterias";
import { DATA_TABLE_STYLES } from "./DataTable.styles";
import { SORT_BY } from "../../constants/arrays";
import TableFooter from "./Table/TableFooter";
import TableHeader from "./Table/TableHeader";
import { capitalize } from "../../utils/strings";
import { compareProductsByDefaultColumnIdxFn } from "../../utils/products/products";
import cordlessVacuumCleaner from "../../data/cordlessVacuumCleaner";
import { createEmptyProductCriteriaValue } from "../../utils/productsWithCriterias/productsWithCriterias";
import { isDefined } from "../../utils/objects";
import { minWidth } from "../../styles/tables/tableCell";
import useClickOutside from "../../hooks/useClickOutside";
import useHandleCriterias from "../../hooks/data/useHandleCriterias";
import useHandleProducts from "../../hooks/data/useHandleProducts";
import useHandleProductsWithCriterias from "../../hooks/data/useHandleProductsWithCriterias";

const criteriasFromDB = cordlessVacuumCleaner.criterias;
const productsFromDB = cordlessVacuumCleaner.products;
const productsWithCriteriasFromDB = cordlessVacuumCleaner.productsWithCriterias;

type DataTableProps = {};

const DataTable = (props: DataTableProps) => {
  const inputRef = useRef(null);

  const [criterias, setCriterias] = useState(criteriasFromDB);
  const [products, setProducts] = useState(productsFromDB);
  const [productsWithCriterias, setProductsWithCriterias] = useState(
    productsWithCriteriasFromDB
  );

  const { addProductWithCriteria, setProductCriteriaValue } =
    useHandleProductsWithCriterias(
      productsWithCriterias,
      setProductsWithCriterias,
      products,
      criterias
    );

  const { addCriteria, updateCriteria, removeCriteria } = useHandleCriterias(
    setCriterias,
    products,
    addProductWithCriteria
  );

  const { addProduct, updateProduct, removeProduct } = useHandleProducts(
    products,
    setProducts,
    criterias,
    productsWithCriterias,
    addProductWithCriteria
  );

  const [cellId, setCellId] = useState<string | null>(null);
  const [cellValue, setCellValue] = useState<string | number | boolean | null>(
    null
  );

  useClickOutside(inputRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCellValue(null);
  });

  const weightTotal = sumCriteriasWeight(criterias);

  const productsSorted = products.sort(
    compareProductsByDefaultColumnIdxFn(SORT_BY.ASC)
  );

  const criteriasSorted = criterias.sort(
    compareCriteriaByDefaultRowIdxFn(SORT_BY.ASC)
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

      <tbody>
        {/*
         * CRITERIAS
         */}
        {criteriasSorted.map((c, criteriaRowIdx) => {
          const isCriteriaNameCellInEditMode = `${c.id}-name` === cellId;
          const isCriteriaBeneficialCellInEditMode =
            `${c.id}-beneficial` === cellId;
          const isCriteriaWeightCellInEditMode = `${c.id}-weight` === cellId;

          return (
            <tr key={c.id}>
              {/*
               * CRITERIA - NAME
               */}
              <td style={DATA_TABLE_STYLES.TD.CRITERIA}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    ref={isCriteriaNameCellInEditMode ? inputRef : undefined}
                    onClick={() => {
                      if (isCriteriaNameCellInEditMode) {
                        return;
                      }
                      console.log(`[ Cell ] Selected ${c.id}-name`);
                      setCellId(`${c.id}-name`);
                      setCellValue(c.name ?? null);
                    }}
                    onBlur={() => {
                      updateCriteria({ ...c, name: `${cellValue}` });
                      setCellId(null);
                      setCellValue(null);
                    }}
                    style={{
                      margin: -8,
                      padding: isCriteriaNameCellInEditMode ? 0 : 8,
                      width: "100%",
                    }}
                  >
                    {isCriteriaNameCellInEditMode ? (
                      <input
                        type="text"
                        value={cellValue ? `${cellValue}` : ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newValue =
                            value && value.length > 0 ? value : null;

                          setCellValue(newValue);
                          updateCriteria({ ...c, name: `${newValue}` });
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            updateCriteria({ ...c, name: `${cellValue}` });
                            setCellId(null);
                            setCellValue(null);
                          }
                        }}
                        style={{
                          ...DATA_TABLE_STYLES.INPUT.TEXT,
                          width: "100%",
                          padding: "7px 6px",
                        }}
                      />
                    ) : (
                      <div style={{ marginRight: 8 }}>
                        {c.name
                          ? capitalize(c.name)
                          : `Critère ${criteriaRowIdx + 1}`}{" "}
                        {c.unit && `(${c.unit})`}
                      </div>
                    )}
                  </div>

                  {!isCriteriaNameCellInEditMode && (
                    <button onClick={() => removeCriteria(c)}>-</button>
                  )}
                </div>
              </td>

              {/*
               * CRITERIA - BENEFICIAL
               */}
              <td style={DATA_TABLE_STYLES.TD.CRITERIA_BENEFICIAL}>
                <div
                  ref={
                    isCriteriaBeneficialCellInEditMode ? inputRef : undefined
                  }
                  onClick={() => {
                    if (isCriteriaBeneficialCellInEditMode) {
                      return;
                    }
                    console.log(`[ Cell ] Selected ${c.id}-beneficial`);
                    setCellId(`${c.id}-beneficial`);
                    setCellValue(c.beneficial ?? null);
                  }}
                  onBlur={() => {
                    updateCriteria({ ...c, beneficial: cellValue === true });
                    setCellId(null);
                    setCellValue(null);
                  }}
                  style={{
                    ...DATA_TABLE_STYLES.INPUT.TEXT,
                    width: "100%",
                    margin: -8,
                    padding: 8,
                  }}
                >
                  {isCriteriaBeneficialCellInEditMode ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: 4, fontSize: 14 }}>
                        Bénéfique (
                        {c.beneficial === true
                          ? "oui"
                          : c.beneficial === false
                          ? "non"
                          : "??"}
                        )
                      </div>
                      <input
                        type="checkbox"
                        checked={c.beneficial === true}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          setCellValue(checked);
                          updateCriteria({ ...c, beneficial: checked });
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      {c.beneficial === true
                        ? "+"
                        : c.beneficial === false
                        ? "-"
                        : "??"}
                    </div>
                  )}
                </div>
              </td>

              {/*
               * CRITERIA - WEIGHT
               */}
              <td style={DATA_TABLE_STYLES.TD.CRITERIA_WEIGHT}>
                <div
                  ref={isCriteriaWeightCellInEditMode ? inputRef : undefined}
                  onClick={() => {
                    if (isCriteriaWeightCellInEditMode) {
                      return;
                    }
                    console.log(`[ Cell ] Selected ${c.id}-weight`);
                    setCellId(`${c.id}-weight`);
                    setCellValue(c.weight ?? null);
                  }}
                  onBlur={() => {
                    updateCriteria({
                      ...c,
                      weight: clampCriteriaWeightValue(Number(cellValue)),
                    });
                    setCellId(null);
                    setCellValue(null);
                  }}
                  style={{
                    margin: -8,
                    padding: isCriteriaWeightCellInEditMode ? 0 : 8,
                    width: "100%",
                  }}
                >
                  {isCriteriaWeightCellInEditMode ? (
                    <input
                      type="number"
                      min={CRITERIA.WEIGHT.MIN}
                      max={CRITERIA.WEIGHT.MAX}
                      value={
                        isDefined(cellValue) &&
                        typeof cellValue === "number" &&
                        !isNaN(cellValue)
                          ? cellValue
                          : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        const newValue =
                          value && value.length > 0
                            ? clampCriteriaWeightValue(Number(value))
                            : null;

                        setCellValue(newValue);
                        updateCriteria({
                          ...c,
                          weight: newValue ?? undefined,
                        });
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          updateCriteria({
                            ...c,
                            weight: clampCriteriaWeightValue(Number(cellValue)),
                          });
                          setCellId(null);
                          setCellValue(null);
                        }
                      }}
                      style={{
                        ...DATA_TABLE_STYLES.INPUT.TEXT,
                        width: "100%",
                        padding: "7px 6px",
                      }}
                    />
                  ) : (
                    <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO_CONTAINER}>
                      <div>
                        {isDefined(c.weight) && !isNaN(c.weight)
                          ? c.weight
                          : "-"}
                      </div>
                      <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
                        {isDefined(c.weight) && !isNaN(c.weight)
                          ? `(${(c.weight / weightTotal).toFixed(3)})`
                          : ""}
                      </div>
                    </div>
                  )}
                </div>
              </td>

              {/*
               * PRODUCTS - CRITERIA VALUES
               */}
              {productsSorted.map((p, productColumnIdx) => {
                const v =
                  productsWithCriterias.find(
                    ({ criteriaId, productId }) =>
                      criteriaId === c.id && productId === p.id
                  ) ?? createEmptyProductCriteriaValue(p, c);

                const isCellInEditMode = v.id === cellId;

                const value =
                  isDefined(v.value) && !isNaN(v.value)
                    ? Number(v.value)
                    : null;

                return (
                  <td key={v.id} style={DATA_TABLE_STYLES.TD.CELL_VALUE}>
                    <div
                      ref={isCellInEditMode ? inputRef : undefined}
                      onClick={() => {
                        if (isCellInEditMode) {
                          return;
                        }
                        console.log(`[ Cell ] Selected ${v.id}`);
                        setCellId(v.id);
                        setCellValue(v.value ?? null);
                      }}
                      onBlur={() => {
                        setProductCriteriaValue(p, c, Number(cellValue));
                        setCellId(null);
                        setCellValue(null);
                      }}
                      style={{
                        margin: -8,
                        padding: isCellInEditMode ? 0 : 8,
                      }}
                    >
                      {isCellInEditMode ? (
                        <input
                          type="number"
                          value={
                            isDefined(cellValue) &&
                            typeof cellValue === "number" &&
                            !isNaN(cellValue)
                              ? cellValue
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            const newValue =
                              value && value.length > 0 ? Number(value) : null;

                            setCellValue(newValue);
                            setProductCriteriaValue(p, c, newValue);
                          }}
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              setProductCriteriaValue(p, c, Number(cellValue));
                              setCellId(null);
                              setCellValue(null);
                            }
                          }}
                          style={{
                            ...DATA_TABLE_STYLES.INPUT.TEXT,
                            width: minWidth,
                            padding: "7px 6px",
                          }}
                        />
                      ) : (
                        <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO_CONTAINER}>
                          <div>{value ?? "-"}</div>
                          {isDefined(v.weightedValue) ? (
                            <div style={DATA_TABLE_STYLES.TEXT.MORE_INFO}>
                              ({v.weightedValue?.toFixed(3) ?? "-"})
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>

      <TableFooter
        criterias={criterias}
        products={products}
        addCriteria={addCriteria}
      />
    </table>
  );
};

export default DataTable;
