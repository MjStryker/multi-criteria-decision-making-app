import { HStack, Tag, Td, Text } from "@chakra-ui/react";

import { DEBUG } from "../../../../constants/global";
import DebugValue from "../../global/table/DebugValue";
import { TProduct } from "../../../../types/products";
import { isDefined } from "../../../../utils/objects";

type TableFooterCellProps = {
  product: TProduct;
};

const TableFooterCell = ({ product }: TableFooterCellProps) => {
  const productRank = product.rank;
  const productRankPts = product.rankPts;

  return (
    <Td textAlign="center" px={2} border="1px" borderColor="gray.100">
      {isDefined(productRank) ? (
        <HStack justifyContent={DEBUG ? "flex-end" : "center"}>
          <Tag
            as={HStack}
            spacing={1}
            size="md"
            justifyContent="space-between"
            variant="outline"
            colorScheme="black"
            boxShadow="none"
            {...([1, 2, 3].includes(productRank)
              ? {
                  variant: "solid",
                  colorScheme: "teal",
                  boxShadow: "base",
                  bgColor:
                    productRank === 1
                      ? "teal.600"
                      : productRank === 2
                      ? "teal.500"
                      : productRank === 3
                      ? "teal.400"
                      : "inherit",
                }
              : undefined)}
          >
            <Text as="span">#</Text>
            <Text as="span">{productRank}</Text>
          </Tag>

          {DEBUG ? (
            <DebugValue
              value={`${productRankPts} pts`}
              bgColor="gray.600"
              color="white"
            />
          ) : null}
        </HStack>
      ) : (
        ""
      )}
    </Td>
  );
};

export default TableFooterCell;
