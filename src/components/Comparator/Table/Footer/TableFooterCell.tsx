import { HStack, Tag, Td, Text } from "@chakra-ui/react";

import { isDefined } from "../../../../utils/objects";

type TableFooterCellProps = {
  productRank: number | undefined;
};

const TableFooterCell = ({ productRank }: TableFooterCellProps) => {
  return (
    <Td textAlign="center" border="1px" borderColor="gray.100">
      {isDefined(productRank) ? (
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
      ) : (
        "-"
      )}
    </Td>
  );
};

export default TableFooterCell;
