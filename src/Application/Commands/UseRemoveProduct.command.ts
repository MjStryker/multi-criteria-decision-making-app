import { useCallback } from "react";
import UseSetProductListCommand from "./UseSetProductList.command";
import { ProductDto } from "../Dtos/Product.dto";

export default function UseRemoveProductCommand() {
  const setProductListCommand = UseSetProductListCommand();

  const removeProduct = useCallback(
    (product: ProductDto) => {
      setProductListCommand((productList) =>
        productList.filter((p) => p.uuid !== product.uuid)
      );
    },
    [setProductListCommand]
  );

  return removeProduct;
}
