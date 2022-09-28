import { CSSProperties, useRef, useState } from "react";
import { border, minWidth } from "../../../../styles/tables/tableCell";

import { COLORS } from "../../../../constants/colors";
import { CRITERIA } from "../../../../constants/criterias";
import { TProduct } from "../../../../types/products";
import { createEmptyProduct } from "../../../../utils/products/products";
import useClickOutside from "../../../../hooks/useClickOutside";

const STYLES = {
  INPUT: {
    TEXT: {
      fontSize: 16,
      textAlign: "inherit",
    } as CSSProperties,
  },
  TD: {
    PRODUCT: {
      width: "fit-content",
      minWidth: minWidth,
      maxWidth: minWidth,
      border,
    } as CSSProperties,
  },
} as const;

type TableHeaderProps = {
  products: TProduct[];
  addProduct: Function;
  updateProduct: Function;
  removeProduct: Function;
};

const TableHeader = (props: TableHeaderProps) => {
  const inputRef = useRef(null);

  const [cellId, setCellId] = useState<string | null>(null);
  const [cellValue, setCellValue] = useState<string | number | boolean | null>(
    null
  );

  useClickOutside(inputRef, () => {
    console.log(`[ Cell ] Clicked away from ${cellId}..`);
    setCellId(null);
    setCellValue(null);
  });

  return (
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
        {props.products.map((p, idx) => {
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
                    props.updateProduct({
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
                        props.updateProduct({
                          ...p,
                          name: newValue ? `${newValue}` : undefined,
                        });
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          props.updateProduct({
                            ...p,
                            name: cellValue ? `${cellValue}` : undefined,
                          });
                          setCellId(null);
                          setCellValue(null);
                        }
                      }}
                      style={{
                        ...STYLES.INPUT.TEXT,
                        width: minWidth,
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
                  <button onClick={() => props.removeProduct(p)}>-</button>
                )}
              </div>
            </td>
          );
        })}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <td>
          <button
            onClick={() =>
              props.addProduct(createEmptyProduct(props.products.length))
            }
          >
            +
          </button>
        </td>
      </tr>
    </thead>
  );
};

export default TableHeader;
