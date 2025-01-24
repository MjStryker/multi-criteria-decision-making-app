import { Product } from "@/types/Product";
import { useCallback } from "react";
import UseSetProductListCommand from "./UseSetProductList.command";

export default function UseUpdateProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const updateProductCommand = useCallback(
    (product: Product) => {
      setProductListCommand((prev) => {
        const index = prev.findIndex((c) => c.id === product.id);
        if (index === -1) {
          return prev;
        }

        const newProductList = [...prev];
        newProductList[index] = product;

        return newProductList;
      });
    },
    [setProductListCommand]
  );

  return updateProductCommand;
}
