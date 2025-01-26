import { useCallback } from "react";
import UseSetProductListCommand from "./UseSetProductList.command";
import {
  PRODUCTS_MAX_ITEMS,
  PRODUCTS_ITEMS_REMAINING_WARNING,
} from "@/@Config/Product";
import UseGetProductListQuery from "../Queries/UseGetProductList.query";
import { useToast } from "@chakra-ui/react";
import { ProductDto } from "../Dtos/Product.dto";

export default function UseAddProductCommand() {
  const productList = UseGetProductListQuery();
  const setProductListCommand = UseSetProductListCommand();

  const toast = useToast();

  const nbProducts = productList.length;
  const nbProductsRemaining = PRODUCTS_MAX_ITEMS - nbProducts;

  const addProduct = useCallback(
    (product: ProductDto) => {
      if (nbProductsRemaining === 0) {
        toast({
          status: "error",
          title: "Cannot add another product",
          description: `Maximum number of products reached (${PRODUCTS_MAX_ITEMS}/${PRODUCTS_MAX_ITEMS})`,
        });
        return;
      }

      if (nbProductsRemaining - 1 <= PRODUCTS_ITEMS_REMAINING_WARNING) {
        const label = nbProductsRemaining - 1 === 1 ? "product" : "products";

        toast({
          status: "warning",
          title: `${nbProductsRemaining - 1} ${label} remaining`,
        });
      }

      setProductListCommand((products) => [...products, product]);
    },
    [nbProductsRemaining, setProductListCommand, toast]
  );

  return addProduct;
}
