import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Stack,
  VStack
} from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";
import type { PrimitiveAtom } from "jotai";
import { type Dispatch, type SetStateAction, useEffect } from "react";

import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
import { useCriterionForm } from "@/Application/Hooks/useCriterionForm";
import TextInput from "@/Presentation/Components/Form/TextInput";

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
  setParentIsDirty: Dispatch<SetStateAction<boolean>>;
  onParentClose: VoidFunction;
};

export default function EditCriterionForm({
  criterionAtom,
  setParentIsDirty,
  onParentClose
}: Props) {
  const {
    name,
    unit,
    beneficial,
    isDirty,
    onNameChange,
    onUnitChange,
    toggleBeneficial,
    onDelete,
    onSubmit
  } = useCriterionForm({ criterionAtom, onClose: onParentClose });

  /**
   * * Update parent props
   */
  useEffect(() => {
    setParentIsDirty(isDirty);
  }, [isDirty, setParentIsDirty]);

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={4}>
        <TextInput
          label="Name"
          id="criterion-name"
          type="text"
          value={name}
          onChange={onNameChange}
        />

        <TextInput
          label="Unit"
          id="criterion-unit"
          type="text"
          value={unit}
          onChange={onUnitChange}
        />

        <FormControl as={VStack} gap={0} alignItems="stretch">
          <FormLabel>Best value</FormLabel>

          <ButtonGroup
            colorScheme={beneficial === false ? "orange" : "blue"}
            isAttached
          >
            <Button
              flex={1}
              aria-label="Non beneficial"
              variant={beneficial === false ? "solid" : "outline"}
              onClick={toggleBeneficial}
            >
              Lowest
            </Button>
            <Button
              flex={1}
              aria-label="Beneficial"
              variant={beneficial === true ? "solid" : "outline"}
              onClick={toggleBeneficial}
            >
              Highest
            </Button>
          </ButtonGroup>
        </FormControl>

        <HStack>
          <IconButton
            colorScheme="red"
            icon={
              <Icon boxSize="20px">
                <IconTrash />
              </Icon>
            }
            aria-label="Delete criterion"
            onClick={onDelete}
          />

          <Button flex={1} variant="outline" onClick={onParentClose}>
            Cancel
          </Button>

          <Button
            flex={1}
            type="submit"
            colorScheme="teal"
            isDisabled={!isDirty}
          >
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
