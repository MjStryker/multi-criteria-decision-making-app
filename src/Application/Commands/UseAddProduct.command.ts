import { Product } from "@/types/Product";
import { useCallback } from "react";
import UseSetProductListCommand from "./UseSetProductList.command";

export default function UseAddProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const addProduct = useCallback(
    (product: Product) => {
      setProductListCommand((products) => [...products, product]);
    },
    [setProductListCommand]
  );

  return addProduct;
}
