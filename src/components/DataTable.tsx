import { CSSProperties, useRef, useState } from "react";
import {
  clampCriteriaWeightValue,
  createEmptyCriteria,
} from "../utils/criterias/criterias";
import {
  compareProductsByDefaultIdxFn,
  createEmptyProduct,
} from "../utils/products/products";

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

const width = 120;
const border = "1px solid #7c7c7c";

type TNestedStyles = Record<string, CSSProperties>;

const STYLES: Record<string, TNestedStyles> = {
  INPUT: {
    TEXT: {
      fontSize: 16,
      textAlign: "inherit",
    },
  },
  TD: {
    BORDER: {
      border,
    },
    PRODUCT: {
      width: "fit-content",
      minWidth: width,
      maxWidth: width,
      border,
    },
    CRITERIA: {
      width: "fit-content",
      minWidth: 200,
      border,
    },
    CELL_VALUE: {
      border,
      textAlign: "right",
    },
    CRITERIA_WEIGHT: {
      border,
      textAlign: "right",
      width: 40,
    },
    CRITERIA_WEIGHT_TOTAL: {
      border,
      textAlign: "right",
      fontWeight: "bold",
    },
    RES_ARRAY_POS: {
      border,
      textAlign: "right",
      fontWeight: "bold",
    },
  },
} as const;

type DataTableProps = {};

const DataTable = (props: DataTableProps) => {
  const inputRef = useRef(null);

  const [criterias, setCriterias] = useState(cordlessVacuumCleaner.criterias);
  const [products, setProducts] = useState(cordlessVacuumCleaner.products);
  const [productsWithCriteria, setProductsWithCriteria] = useState(
    cordlessVacuumCleaner.productsWithCriterias
  );

  const [cellId, setCellId] = useState<string | null>(null);
  const [cellValue, setCellValue] = useState<string | number | null>(null);

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
    compareProductsByDefaultIdxFn(SORT_BY.ASC)
  );

  const addCriteria = (criteria: TCriteria) => {
    setCriterias((prev) => [...prev, criteria]);
    products.forEach((product) => {
      addProductWithCriteria(
        createEmptyProductCriteriaValue(product, criteria)
      );
    });
  };

  const addProduct = (product: TProduct) => {
    setProducts((prev) => [...prev, product]);
    criterias.forEach((criteria) => {
      addProductWithCriteria(
        createEmptyProductCriteriaValue(product, criteria)
      );
    });
  };

  const addProductWithCriteria = (
    productWithCriteria: TProductWithCriteria
  ) => {
    setProductsWithCriteria((prev) => [...prev, productWithCriteria]);
  };

  const updateProduct = (product: TProduct) =>
    setProducts((prev) => {
      const newProductIdx = prev.findIndex((p) => product.id === p.id);
      prev[newProductIdx] = product;
      return [...prev];
    });

  const updateCriteria = (criteria: TCriteria) =>
    setCriterias((prev) => {
      const newCriteriaIdx = prev.findIndex((p) => criteria.id === p.id);
      prev[newCriteriaIdx] = criteria;
      return [...prev];
    });

  const removeCriteria = ({ id }: TCriteria) =>
    setCriterias((prev) => prev.filter((c) => c.id !== id));

  const removeProduct = ({ id }: TProduct) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const setProductCriteriaValue = (
    product: TProduct,
    criteria: TCriteria,
    value: number | null
  ) => {
    const productWithCriteria =
      productsWithCriteria.find(
        (e) => e.productId === product.id && e.criteriaId === criteria.id
      ) ?? createEmptyProductCriteriaValue(product, criteria);

    productWithCriteria.value = value ?? undefined;

    setProductsWithCriteria((prev) => [...prev, productWithCriteria]);
  };

  return (
    <table
      cellSpacing={0}
      cellPadding={8}
      style={{ height: "fit-content", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <td />
          <td>
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >{`${CRITERIA.WEIGHT.MIN} - ${CRITERIA.WEIGHT.MAX}`}</div>
          </td>
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
                        value={cellValue ?? ""}
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
          <td>
            <button onClick={() => addProduct(createEmptyProduct(nbProducts))}>
              +
            </button>
          </td>
        </tr>
      </thead>

      <tbody>
        {criterias.map((c, idx) => {
          const isCriteriaNameCellInEditMode = `${c.id}-name` === cellId;
          const isCriteriaWeightCellInEditMode = `${c.id}-weight` === cellId;

          return (
            <tr key={c.id}>
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
                        value={cellValue ?? ""}
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
                        {c.name ? capitalize(c.name) : `Critère ${idx + 1}`}{" "}
                        {c.unit && `(${c.unit})`}
                      </div>
                    )}
                  </div>

                  {!isCriteriaNameCellInEditMode && (
                    <button onClick={() => removeCriteria(c)}>-</button>
                  )}
                </div>
              </td>

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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {isDefined(c.weight) && !isNaN(c.weight)
                          ? c.weight
                          : "-"}
                      </div>
                      <div
                        style={{
                          marginLeft: 8,
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        {isDefined(c.weight) && !isNaN(c.weight)
                          ? (c.weight / weightTotal).toFixed(2)
                          : "-"}
                      </div>
                    </div>
                  )}
                </div>
              </td>

              {productsSorted.map((p) => {
                const v =
                  productsWithCriteria.find(
                    ({ criteriaId, productId }) =>
                      criteriaId === c.id && productId === p.id
                  ) ?? createEmptyProductCriteriaValue(p, c);

                const isCellInEditMode = v.id === cellId;

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
                        <div>
                          {isDefined(v.value) && !isNaN(v.value)
                            ? v.value
                            : "-"}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}

              <td />
            </tr>
          );
        })}

        <tr>
          <td>
            <button onClick={() => addCriteria(createEmptyCriteria())}>
              +
            </button>
          </td>

          <td style={STYLES.TD.CRITERIA_WEIGHT_TOTAL}>{weightTotal}</td>

          {productsSorted.map((p) => (
            <td key={p.id} style={STYLES.TD.RES_ARRAY_POS}>
              #{p.resArrayIdx ?? " -"}
            </td>
          ))}

          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default DataTable;
