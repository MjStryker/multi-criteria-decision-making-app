import { DEBUG } from '@/@Config/Global';
import { HStack, Tag, Td, Text } from '@chakra-ui/react';
import DebugValue from '../DebugValue';
import { ProductDto } from '@/Application/Product/Dtos/Product.dto';

type Props = {
  product: ProductDto;
};

export default function TableFooterCell({ product }: Props) {
  return (
    <Td textAlign="center" px={2} border="1px" borderColor="gray.100">
      {product.rank === null ? null : (
        <HStack justifyContent={DEBUG ? 'flex-end' : 'center'}>
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
                  variant: 'solid',
                  colorScheme: 'teal',
                  boxShadow: 'base',
                  bgColor:
                    product.rank === 1
                      ? 'teal.600'
                      : product.rank === 2
                        ? 'teal.500'
                        : product.rank === 3
                          ? 'teal.400'
                          : 'inherit'
                }
              : null)}
          >
            <Text as="span">#</Text>
            <Text as="span">{product.rank}</Text>
          </Tag>

          {DEBUG ? <DebugValue value={`${product.rankPts} pts`} bgColor="gray.600" color="white" /> : null}
        </HStack>
      )}
    </Td>
  );
}
