import { Box, SimpleGrid, Td, Text, VStack } from '@chakra-ui/react';

import EditProductButton from './EditProductButton';

import { isValidNotEmptyString } from '@/@Shared/@Utils/String';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

const CELL_WIDTH = '150px';

type Props = {
  columnIdx: number;
  product: ProductDto;
};

export default function TableHeaderCell({ columnIdx, product }: Props) {
  return (
    <Td w={CELL_WIDTH} minW={CELL_WIDTH} maxW={CELL_WIDTH} px={2} border="1px" borderColor="gray.100">
      <VStack className="CellContainer" alignItems="stretch" justifyContent="space-between" minH="70px">
        <SimpleGrid className="FirstRowContainer" templateColumns="1fr auto" alignItems="center" gap={1}>
          <Text whiteSpace="break-spaces" wordBreak="break-word" fontWeight="semibold">
            {isValidNotEmptyString(product.name) ? product.name : `Product ${columnIdx + 1}`}
          </Text>

          <Box>
            <EditProductButton product={product} />
          </Box>
        </SimpleGrid>

        <Text color="gray.500" fontSize="xs">
          {product.reference}
        </Text>
      </VStack>
    </Td>
  );
}
