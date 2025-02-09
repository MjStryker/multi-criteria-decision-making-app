import { ProductDto } from '@/Application/Product/Dtos/Product.dto';
import { HStack, Tag, Td, Text } from '@chakra-ui/react';
import { PrimitiveAtom, useAtomValue } from 'jotai';

type Props = {
  productAtom: PrimitiveAtom<ProductDto>;
};

export default function TableFooterCell({ productAtom }: Props) {
  const product = useAtomValue(productAtom);

  return (
    <Td textAlign="center" px={2} border="1px" borderColor="gray.100">
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
        </HStack>
      )}
    </Td>
  );
}
