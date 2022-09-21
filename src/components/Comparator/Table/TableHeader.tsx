import { COLORS } from "../../../constants/colors";
import { CRITERIA } from "../../../constants/criterias";
import { TProduct } from "../../../types/products";
import { createEmptyProduct } from "../../../utils/products/products";

type TableHeaderProps = {
  products: TProduct[];
};

const TableHeader = (props: TableHeaderProps) => {
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
  );
};

export default TableHeader;
