import { Center, HStack, Text } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtomValue } from "jotai";

import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { Cell } from "../Cell";

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function TableFooterCell({ productAtom }: Props) {
  const product = useAtomValue(productAtom);

  const debugMode = useAtomValue(AppSettingsAtoms.debugMode);

  const isItemTopRanked = product.rank
    ? [1, 2, 3].includes(product.rank)
    : false;

  return (
    <Cell textAlign="center" position="relative" border="none" bg="transparent">
      {debugMode ? (
        <Center position="absolute" top={0} bottom={0} left={4}>
          <Text fontSize="xs" color="blackAlpha.600">
            {product.rankPts ?? 0} pts
          </Text>
        </Center>
      ) : null}

      {product.rank === null ? null : (
        <HStack h="full" justifyContent="center" px={0.5} py={1}>
          <Center
            w="full"
            h="full"
            bg="gray.50"
            color="blackAlpha.600"
            // border="1px solid"
            // borderColor="blackAlpha.100"
            rounded="full"
            fontWeight="regular"
            fontSize="md"
            {...(isItemTopRanked
              ? {
                  color: "blackAlpha.700",
                  fontWeight: "bold",
                  fontSize: "xl",
                  bg:
                    product.rank === 1
                      ? "green.500"
                      : product.rank === 2
                        ? "green.200"
                        : product.rank === 3
                          ? "green.100"
                          : "inherit"
                }
              : null)}
          >
            <Text as="span">{product.rank}</Text>
          </Center>
        </HStack>
      )}
    </Cell>
  );
}
