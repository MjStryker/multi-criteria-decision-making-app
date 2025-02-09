import { Box, SimpleGrid, Td, Text, VStack } from '@chakra-ui/react';

import EditProductButton from './EditProductButton';

import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { PrimitiveAtom, useAtom } from 'jotai';

const CELL_WIDTH = '150px';

type Props = {
  columnIdx: number;
  productAtom: PrimitiveAtom<ProductDto>;
  remove: () => void;
};

export default function TableHeaderCell({ columnIdx, productAtom, remove }: Props) {
  const [product] = useAtom(productAtom);

  return (
    <Td
      position="relative"
      w={CELL_WIDTH}
      minW={CELL_WIDTH}
      maxW={CELL_WIDTH}
      px={2}
      border="1px"
      borderColor="gray.100"
    >
      <Text position="absolute" top={0} left={0} fontSize="xs" opacity={0.5}>
        {columnIdx} - {product.uuid.slice(0, 8)}
      </Text>

      <VStack className="CellContainer" alignItems="stretch" justifyContent="space-between" minH="70px">
        <SimpleGrid className="FirstRowContainer" templateColumns="1fr auto" alignItems="center" gap={1}>
          <Text whiteSpace="break-spaces" wordBreak="break-word" fontWeight="semibold">
            {isValidNotEmptyString(product.name) ? product.name : `Product ${columnIdx + 1}`}
          </Text>

          <Box>
            <EditProductButton productAtom={productAtom} remove={remove} />
          </Box>
        </SimpleGrid>

        <Text color="gray.500" fontSize="xs">
          {product.reference}
        </Text>
      </VStack>
    </Td>
  );
}
