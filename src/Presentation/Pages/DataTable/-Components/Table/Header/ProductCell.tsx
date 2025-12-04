import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { type PrimitiveAtom, useAtom, useAtomValue } from "jotai";

import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { AppSettingsAtoms } from "@/Application/Atoms/AppSettings.atom";
import type { ProductDto } from "@/Application/Dtos/Product.dto";
import { Cell } from "../Cell";
import EditProductButton from "./EditProductButton";

type Props = {
  columnIdx: number;
  productAtom: PrimitiveAtom<ProductDto>;
};

export function ProductCell({ columnIdx, productAtom }: Props) {
  const [product] = useAtom(productAtom);

  const debugMode = useAtomValue(AppSettingsAtoms.debugMode);

  const isItemTopRanked = product.rank
    ? [1, 2, 3].includes(product.rank)
    : false;

  return (
    <Cell>
      <VStack
        className="CellContainer"
        alignItems="stretch"
        justifyContent="flex-start"
        h="full"
        p={2}
      >
        <HStack>
          <Box flex={1}>
            <Text
              whiteSpace="break-spaces"
              wordBreak="break-word"
              fontWeight="semibold"
              {...(!isValidNotEmptyString(product.name) && {
                fontStyle: "italic",
                fontWeight: "medium",
                color: "gray.600"
              })}
            >
              {isValidNotEmptyString(product.name)
                ? product.name
                : `Item ${columnIdx + 1}`}
            </Text>

            {debugMode ? (
              <Text fontSize="xs" opacity={0.5} mt={-1}>
                [{product.defaultColumnIdx}] {columnIdx} -{" "}
                {product.uuid.slice(0, 8)}
              </Text>
            ) : null}
          </Box>

          <EditProductButton productAtom={productAtom} />
        </HStack>

        {product.rank === null ? null : (
          <Center
            position="relative"
            w="full"
            h="full"
            bg="gray.100"
            color="gray.600"
            fontSize="sm"
            fontWeight="medium"
            p={1}
            rounded="lg"
            {...(isItemTopRanked
              ? {
                  bg: "gray.200",
                  color: "gray.700"
                }
              : null)}
          >
            <Text as="span">#{product.rank}</Text>

            <Text
              as="span"
              position="absolute"
              right={2}
              fontSize="xs"
              color="gray.500"
            >
              ({product.rankPts ?? 0} pts)
            </Text>
          </Center>
        )}
      </VStack>
    </Cell>
  );
}
