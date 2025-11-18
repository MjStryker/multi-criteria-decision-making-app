import { HStack, Tag, Td, Text } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtomValue } from "jotai";

import { CELL_WIDTH } from "@/@Config/Table";
import type { ProductDto } from "@/Application/Dtos/Product.dto";

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function TableFooterCell({ productAtom }: Props) {
  const product = useAtomValue(productAtom);

  return (
    <Td
      textAlign="center"
      px={2}
      w={CELL_WIDTH}
      minW={CELL_WIDTH}
      maxW={CELL_WIDTH}
      border="1px"
      borderColor="gray.100"
    >
      {product.rank === null ? null : (
        <HStack justifyContent="center">
          <Tag
            as={HStack}
            spacing={1}
            size="md"
            justifyContent="space-between"
            variant="outline"
            colorScheme="black"
            boxShadow="none"
            {...([1, 2, 3].includes(product.rank)
              ? {
                  variant: "solid",
                  colorScheme: "teal",
                  boxShadow: "base",
                  bgColor:
                    product.rank === 1
                      ? "teal.600"
                      : product.rank === 2
                        ? "teal.500"
                        : product.rank === 3
                          ? "teal.400"
                          : "inherit"
                }
              : null)}
          >
            <Text as="span">#</Text>
            <Text as="span">{product.rank}</Text>
          </Tag>
        </HStack>
      )}
    </Td>
  );
}
