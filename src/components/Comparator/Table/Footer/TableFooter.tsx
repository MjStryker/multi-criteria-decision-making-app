import { Button, HStack, Tag, Td, Text, Tfoot, Tr } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { TCriterion } from "../../../../types/criteria";
import { TProduct } from "../../../../types/products";
import { createEmptyCriterion } from "../../../../utils/criteria/criteria";
import { isDefined } from "../../../../utils/objects";

type TableFooterProps = {
  criteria: TCriterion[];
  products: TProduct[];
  addCriterion: Function;
};

const TableFooter = ({
  criteria,
  products,
  addCriterion,
}: TableFooterProps) => {
  const handleAddCriterion = () => {
    addCriterion(createEmptyCriterion(criteria.length));
  };

  return (
    <Tfoot>
      <Tr>
        {/*
         * CRITERION - ADD BUTTON
         */}
        <Td border="none" px={0.5}>
          <Button
            w="full"
            size="sm"
            colorScheme="blue"
            onClick={handleAddCriterion}
            leftIcon={<AddIcon fontSize="xs" />}
            boxShadow="base"
          >
            Add
          </Button>
        </Td>

        {/*
         * --------
         */}
        <Td border="none" />

        {/*
         * PRODUCTS - RANK
         */}
        {products.map(({ id, rank }) => (
          <Td key={id} textAlign="center" border="none">
            {isDefined(rank) ? (
              <Tag
                as={HStack}
                spacing={1}
                size="md"
                justifyContent="space-between"
                variant={[1, 2, 3].includes(rank) ? "solid" : "outline"}
                colorScheme={[1, 2, 3].includes(rank) ? "teal" : "black"}
                boxShadow={[1, 2, 3].includes(rank) ? "base" : "none"}
              >
                <Text as="span">#</Text>
                <Text as="span">{rank}</Text>
              </Tag>
            ) : (
              "-"
            )}
          </Td>
        ))}

        {/*
         * --------
         */}
        <Td border="none" />
      </Tr>
    </Tfoot>
  );
};

export default TableFooter;
