import { Button, Flex, Td, Thead, Tr } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { CRITERION } from "../../../../constants/criteria";
import EditProductButton from "./EditProductButton";
import { TProduct } from "../../../../types/products";
import { createEmptyProduct } from "../../../../utils/products/products";
import useClickOutside from "../../../../hooks/useClickOutside";

type TableHeaderProps = {
  products: TProduct[];
  addProduct: (product: TProduct) => void;
  updateProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
};

const TableHeader = ({
  products,
  addProduct,
  updateProduct,
  removeProduct,
}: TableHeaderProps) => {
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
    <Thead>
      <Tr>
        {/*
         * --------
         */}
        <Td />

        {/*
         * --------
         */}
        <Td />

        {/*
         * CRITERIONS - MIN/MAX WEIGHT INFO
         */}
        <Td textAlign="center">
          <Flex
            h="full"
            direction="column"
            fontSize="xs"
            color="gray"
          >{`${CRITERION.WEIGHT.MIN} - ${CRITERION.WEIGHT.MAX}`}</Flex>
        </Td>

        {/*
         * PRODUCTS
         */}
        {products.map((product, idx) => {
          const isCellInEditMode = product.id === cellId;

          return (
            <Td key={product.id}>
              <div
                className="HeadCellProductContainer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Flex
                  className="FirstRowContainer"
                  flex={1}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div
                    ref={isCellInEditMode ? inputRef : undefined}
                    onClick={() => {
                      if (isCellInEditMode) {
                        return;
                      }
                      console.log(`[ Cell ] Selected ${product.id}`);
                      setCellId(product.id);
                      setCellValue(product.name ?? null);
                    }}
                    onBlur={() => {
                      updateProduct({
                        ...product,
                        name: cellValue ? `${cellValue}` : undefined,
                      });
                      setCellId(null);
                      setCellValue(null);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "stretch",
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
                            ...product,
                            name: newValue ? `${newValue}` : undefined,
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateProduct({
                              ...product,
                              name: cellValue ? `${cellValue}` : undefined,
                            });
                            setCellId(null);
                            setCellValue(null);
                          }
                        }}
                        style={{
                          width: "100%",
                          padding: "7px 6px",
                        }}
                      />
                    ) : (
                      <div
                        className="ProductName"
                        style={{ flex: 1, alignSelf: "center", marginRight: 8 }}
                      >
                        {product.name ?? `Produit ${idx + 1}`}
                      </div>
                    )}
                  </div>

                  {!isCellInEditMode && (
                    <EditProductButton
                      product={product}
                      updateProduct={updateProduct}
                      removeProduct={removeProduct}
                    />
                  )}
                </Flex>

                <div
                  className="HeadCellProductRow-2"
                  style={{
                    padding: "6px 8px",
                    fontSize: "12px",
                    color: "#5a5a5a",
                    backgroundColor: "rgba(0, 0, 0, 0.02",
                  }}
                >
                  Column idx: <b>{product.defaultColumnIdx}</b>
                </div>
              </div>
            </Td>
          );
        })}

        {/*
         * PRODUCTS - ADD BUTTON
         */}
        <Td>
          <Button
            onClick={() => addProduct(createEmptyProduct(products.length))}
          >
            +
          </Button>
        </Td>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
