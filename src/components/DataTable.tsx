import { CSSProperties, useRef, useState } from "react";
import {
  compareProductsByDefaultIdxFn,
  createEmptyProduct,
} from "../utils/products/products";

import { SORT_BY } from "../constants/arrays";
import { TCriteria } from "../types/criterias";
import { TProduct } from "../types/products";
import { TProductWithCriteria } from "../types/productsWithCriterias";
import cordlessVacuumCleaner from "../data/cordlessVacuumCleaner";
import { createEmptyCriteria } from "../utils/criterias/criterias";
import { createEmptyProductCriteriaValue } from "../utils/productsWithCriterias/productsWithCriterias";
import useClickOutside from "../hooks/useClickOutside";

const width = 120;
const border = "1px solid #7c7c7c";

type TNestedStyles = Record<string, CSSProperties>;

const STYLES: Record<string, TNestedStyles> = {
  TD: {
    BORDER: {
      border,
    },
    PRODUCT: {
      width: "fit-content",
      minWidth: width,
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
      width: 20,
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
};

type DataTableProps = {};

const DataTable = (props: DataTableProps) => {
  const inputRef = useRef(null);

  const [criterias, setCriterias] = useState(cordlessVacuumCleaner.criterias);
  const [products, setProducts] = useState(cordlessVacuumCleaner.products);
  const [productsWithCriteria, setProductsWithCriteria] = useState(
    cordlessVacuumCleaner.productsWithCriterias
  );

  const [cellId, setCellId] = useState<string | null>(null);
  const [cellValue, setCellValue] = useState<number | null>(null);

  useClickOutside(inputRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCellValue(null);
  });

  const nbCriteria = criterias.length;
  const nbProducts = products.length;

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
          <td />
          {products.map((p) => (
            <td key={p.id} style={STYLES.TD.PRODUCT}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ marginRight: 8 }}>{p.name}</span>
                <button onClick={() => removeProduct(p)}>-</button>
              </div>
            </td>
          ))}
          <td>
            <button onClick={() => addProduct(createEmptyProduct(nbProducts))}>
              +
            </button>
          </td>
        </tr>
      </thead>

      <tbody>
        {criterias.map((c) => (
          <tr key={c.id}>
            <td style={STYLES.TD.CRITERIA}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ marginRight: 8 }}>
                  {c.name} {c.unit && `(${c.unit})`}{" "}
                </div>
                <button onClick={() => removeCriteria(c)}>-</button>
              </div>
            </td>

            <td style={STYLES.TD.CRITERIA_WEIGHT}>{c.weight}</td>

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
                      setProductCriteriaValue(p, c, cellValue);
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
                        value={cellValue ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newValue =
                            value && value.length > 0 ? Number(value) : null;

                          setCellValue(newValue);
                          setProductCriteriaValue(p, c, newValue);
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            setProductCriteriaValue(p, c, cellValue);
                            setCellId(null);
                            setCellValue(null);
                          }
                        }}
                        style={{ width, fontSize: 16, padding: "7px 6px" }}
                      />
                    ) : (
                      v?.value ?? "-"
                    )}
                  </div>
                </td>
              );
            })}

            <td />
          </tr>
        ))}

        <tr>
          <td>
            <button onClick={() => addCriteria(createEmptyCriteria())}>
              +
            </button>
          </td>

          <td style={STYLES.TD.CRITERIA_WEIGHT_TOTAL}>
            {criterias
              .map((c) => c.weight ?? 0)
              .reduce((prev, current) => prev + current, 0)}
          </td>

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
