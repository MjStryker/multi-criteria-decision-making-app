import { Product } from "@/types/Product";
import { useCallback } from "react";
import UseSetProductListCommand from "./UseSetProductList.command";

export default function UseRemoveProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const removeProduct = useCallback(
    (product: Product) => {
      setProductListCommand((products) =>
        products.filter((p) => p.id !== product.id)
      );
    },
    [setProductListCommand]
  );

  return removeProduct;
}
