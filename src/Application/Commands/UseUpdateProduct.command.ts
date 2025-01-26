import { useCallback } from "react";
import UseSetProductListCommand from "./UseSetProductList.command";
import { ProductDto } from "../Dtos/Product.dto";

export default function UseUpdateProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const updateProductCommand = useCallback(
    (product: ProductDto) => {
      setProductListCommand((prev) => {
        const index = prev.findIndex((c) => c.uuid === product.uuid);

        if (index === -1) {
          throw Error("Product not found");
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
