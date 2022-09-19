import { CSSProperties, useRef, useState } from "react";
import {
  clampCriteriaWeightValue,
  compareCriteriaByDefaultRowIdxFn,
  createEmptyCriteria,
} from "../utils/criterias/criterias";
import {
  compareProductsByDefaultColumnIdxFn,
  createEmptyProduct,
  getProductsWithCriteriasNormalizedWeightedValues,
} from "../utils/products/products";

import { COLORS } from "../constants/colors";
import { CRITERIA } from "../constants/criterias";
import { SORT_BY } from "../constants/arrays";
import { TCriteria } from "../types/criterias";
import { TProduct } from "../types/products";
import { TProductWithCriteria } from "../types/productsWithCriterias";
import { capitalize } from "../utils/strings";
import cordlessVacuumCleaner from "../data/cordlessVacuumCleaner";
import { createEmptyProductCriteriaValue } from "../utils/productsWithCriterias/productsWithCriterias";
import { isDefined } from "../utils/objects";
import useClickOutside from "../hooks/useClickOutside";
import useRankProducts from "../hooks/data/useRankProducts";

const width = 120;
const border = "1px solid #7c7c7c";

const STYLES = {
  TEXT: {
    MORE_INFO_CONTAINER: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    } as CSSProperties,
    MORE_INFO: {
      marginLeft: 8,
      fontSize: 12,
      color: COLORS.GREY,
    },
  },
  INPUT: {
    TEXT: {
      fontSize: 16,
      textAlign: "inherit",
    } as CSSProperties,
  },
  TD: {
    BORDER: {
      border,
    } as CSSProperties,
    CELL_VALUE: {
      border,
      textAlign: "right",
    } as CSSProperties,
    PRODUCT: {
      width: "fit-content",
      minWidth: width,
      maxWidth: width,
      border,
    } as CSSProperties,
    PRODUCTS_VALUE_TOTAL: {
      textAlign: "right",
      fontWeight: "bold",
      border,
    } as CSSProperties,
    CRITERIA: {
      width: "fit-content",
      minWidth: 200,
      border,
    } as CSSProperties,
    CRITERIA_BENEFICIAL: {
      minWidth: 36,
      border,
    } as CSSProperties,
    CRITERIA_WEIGHT: {
      border,
      textAlign: "right",
      width: 40,
    } as CSSProperties,
    CRITERIA_WEIGHT_TOTAL: {
      border,
      textAlign: "right",
      fontWeight: "bold",
    } as CSSProperties,
    RES_ARRAY_POS: {
      border,
      textAlign: "right",
      fontWeight: "bold",
    } as CSSProperties,
  },
} as const;

type DataTableProps = {};

const DataTable = (props: DataTableProps) => {
  const inputRef = useRef(null);

  const [criteriasFromDB, setCriteriasFromDB] = useState(
    cordlessVacuumCleaner.criterias
  );
  const [productsFromDB, setProductsFromDB] = useState(
    cordlessVacuumCleaner.products
  );
  const [productsWithCriteriasFromDB, setProductsWithCriteriasFromDB] =
    useState(cordlessVacuumCleaner.productsWithCriterias);

  const { productsWithCriteriasNormalizedWeightedValues } =
    getProductsWithCriteriasNormalizedWeightedValues(
      productsFromDB,
      criteriasFromDB,
      productsWithCriteriasFromDB
    );

  const { rankedProducts } = useRankProducts(
    productsFromDB,
    criteriasFromDB,
    productsWithCriteriasFromDB
  );

  const criterias = criteriasFromDB;
  const products = rankedProducts;
  const productsWithCriterias = productsWithCriteriasNormalizedWeightedValues;

  const [cellId, setCellId] = useState<string | null>(null);
  const [cellValue, setCellValue] = useState<string | number | boolean | null>(
    null
  );

  useClickOutside(inputRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCellValue(null);
  });

  const nbCriteria = criterias.length;
  const nbProducts = products.length;

  const weightTotal = criterias.reduce(
    (total, criteria) => total + (criteria.weight ?? 0),
    0
  );

  const productsSorted = products.sort(
    compareProductsByDefaultColumnIdxFn(SORT_BY.ASC)
  );

  const criteriasSorted = criterias.sort(
    compareCriteriaByDefaultRowIdxFn(SORT_BY.ASC)
  );

  const addCriteria = (criteria: TCriteria) => {
    setCriteriasFromDB((prev) => [...prev, criteria]);
    products.forEach((product) => {
      addProductWithCriteria(
        createEmptyProductCriteriaValue(product, criteria)
      );
    });
  };

  const addProduct = (product: TProduct) => {
    setProductsFromDB((prev) => [...prev, product]);
    criterias.forEach((criteria) => {
      addProductWithCriteria(
        createEmptyProductCriteriaValue(product, criteria)
      );
    });
  };

  const addProductWithCriteria = (
    productWithCriteria: TProductWithCriteria
  ) => {
    setProductsWithCriteriasFromDB((prev) => [...prev, productWithCriteria]);
  };

  const updateProduct = (product: TProduct) =>
    setProductsFromDB((prev) => {
      const newProductIdx = prev.findIndex((p) => product.id === p.id);
      prev[newProductIdx] = product;
      return [...prev];
    });

  const updateCriteria = (criteria: TCriteria) =>
    setCriteriasFromDB((prev) => {
      const newCriteriaIdx = prev.findIndex((p) => criteria.id === p.id);
      prev[newCriteriaIdx] = criteria;
      return [...prev];
    });

  const removeCriteria = ({ id }: TCriteria) =>
    setCriteriasFromDB((prev) => prev.filter((c) => c.id !== id));

  const removeProduct = ({ id }: TProduct) =>
    setProductsFromDB((prev) => prev.filter((p) => p.id !== id));

  const setProductCriteriaValue = (
    product: TProduct,
    criteria: TCriteria,
    value: number | null
  ) => {
    const productWithCriteria =
      productsWithCriterias.find(
        (e) => e.productId === product.id && e.criteriaId === criteria.id
      ) ?? createEmptyProductCriteriaValue(product, criteria);

    productWithCriteria.value = value ?? undefined;

    setProductsWithCriteriasFromDB((prev) => [...prev, productWithCriteria]);
  };

  return (
    <table
      cellSpacing={0}
      cellPadding={8}
      style={{ height: "fit-content", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          {/*
           * --------
           */}
          <td />

          {/*
           * --------
           */}
          <td />

          {/*
           * CRITERIAS - MIN/MAX WEIGHT INFO
           */}
          <td>
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                fontSize: 14,
                color: COLORS.GREY,
              }}
            >{`${CRITERIA.WEIGHT.MIN} - ${CRITERIA.WEIGHT.MAX}`}</div>
          </td>

          {/*
           * PRODUCTS
           */}
          {products.map((p, idx) => {
            const isCellInEditMode = p.id === cellId;

            return (
              <td key={p.id} style={STYLES.TD.PRODUCT}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    ref={isCellInEditMode ? inputRef : undefined}
                    onClick={() => {
                      if (isCellInEditMode) {
                        return;
                      }
                      console.log(`[ Cell ] Selected ${p.id}`);
                      setCellId(p.id);
                      setCellValue(p.name ?? null);
                    }}
                    onBlur={() => {
                      updateProduct({
                        ...p,
                        name: cellValue ? `${cellValue}` : undefined,
                      });
                      setCellId(null);
                      setCellValue(null);
                    }}
                    style={{
                      margin: -8,
                      padding: isCellInEditMode ? 0 : 8,
                      width: "100%",
                    }}
                  >
                    {isCellInEditMode ? (
                      <input
                        type="text"
                        value={cellValue ? `${cellValue}` : ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newValue =
                            value && value.length > 0 ? value : null;

                          setCellValue(newValue);
                          updateProduct({
                            ...p,
                            name: newValue ? `${newValue}` : undefined,
                          });
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            updateProduct({
                              ...p,
                              name: cellValue ? `${cellValue}` : undefined,
                            });
                            setCellId(null);
                            setCellValue(null);
                          }
                        }}
                        style={{
                          ...STYLES.INPUT.TEXT,
                          width,
                          padding: "7px 6px",
                        }}
                      />
                    ) : (
                      <div style={{ marginRight: 8 }}>
                        {p.name ?? `Produit ${idx + 1}`}
                      </div>
                    )}
                  </div>

                  {!isCellInEditMode && (
                    <button onClick={() => removeProduct(p)}>-</button>
                  )}
                </div>
              </td>
            );
          })}

          {/*
           * PRODUCTS - ADD BUTTON
           */}
          <td>
            <button onClick={() => addProduct(createEmptyProduct(nbProducts))}>
              +
            </button>
          </td>
        </tr>
      </thead>

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
              <td style={STYLES.TD.CRITERIA}>
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
                          ...STYLES.INPUT.TEXT,
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
              <td style={STYLES.TD.CRITERIA_BENEFICIAL}>
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
                    ...STYLES.INPUT.TEXT,
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
              <td style={STYLES.TD.CRITERIA_WEIGHT}>
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
                        ...STYLES.INPUT.TEXT,
                        width: "100%",
                        padding: "7px 6px",
                      }}
                    />
                  ) : (
                    <div style={STYLES.TEXT.MORE_INFO_CONTAINER}>
                      <div>
                        {isDefined(c.weight) && !isNaN(c.weight)
                          ? c.weight
                          : "-"}
                      </div>
                      <div style={STYLES.TEXT.MORE_INFO}>
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
                  <td key={v.id} style={STYLES.TD.CELL_VALUE}>
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
                            ...STYLES.INPUT.TEXT,
                            width,
                            padding: "7px 6px",
                          }}
                        />
                      ) : (
                        <div style={STYLES.TEXT.MORE_INFO_CONTAINER}>
                          <div>{value ?? "-"}</div>
                          {isDefined(v.weightedValue) ? (
                            <div style={STYLES.TEXT.MORE_INFO}>
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

        <tr>
          {/*
           * CRITERIA - ADD BUTTON
           */}
          <td>
            <button
              onClick={() => addCriteria(createEmptyCriteria(nbCriteria))}
            >
              +
            </button>
          </td>

          {/*
           * --------
           */}
          <td />

          {/*
           * CRITERIA - WEIGHT TOTAL
           */}
          <td style={STYLES.TD.CRITERIA_WEIGHT_TOTAL}>{weightTotal}</td>

          {/*
           * PRODUCTS - RANK
           */}
          {productsSorted.map((p) => (
            <td key={p.id} style={STYLES.TD.RES_ARRAY_POS}>
              #{p.rank ?? " -"}
            </td>
          ))}

          {/*
           * --------
           */}
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default DataTable;
