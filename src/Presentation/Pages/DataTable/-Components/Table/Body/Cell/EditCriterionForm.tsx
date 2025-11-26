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
import { type PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useEffect,
  useState
} from "react";

import { CriterionListAtom } from "@/Application/Atoms/CriterionList.atom";
import { ProductCriterionValueListAtom } from "@/Application/Atoms/ProductCriterionValueList.atom";
import type { CriterionDto } from "@/Application/Dtos/Criterion.dto";
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
  const [criterion, setCriterion] = useAtom(criterionAtom);
  const setCriterionList = useSetAtom(CriterionListAtom);
  const setProductCriterionValueList = useSetAtom(
    ProductCriterionValueListAtom
  );

  const [name, setName] = useState<string>(criterion.name || "");
  const [unit, setUnit] = useState<string>(criterion.unit || "");
  const [beneficial, setBeneficial] = useState<boolean | null>(
    criterion.beneficial
  );

  const isDirty =
    name !== criterion.name ||
    unit !== criterion.unit ||
    beneficial !== criterion.beneficial;

  /**
   * * Update parent props
   */
  useEffect(() => {
    setParentIsDirty(isDirty);
  }, [isDirty, setParentIsDirty]);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(criterion.name || "");
  }, [criterion.name]);

  useEffect(() => {
    setUnit(criterion.unit || "");
  }, [criterion.unit]);

  useEffect(() => {
    setBeneficial(criterion.beneficial);
  }, [criterion.beneficial]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const onUnitChange = (e: FormEvent<HTMLInputElement>) =>
    setUnit(e.currentTarget.value);

  const toggleBeneficial = () => {
    setBeneficial(prev => !prev);
  };

  /**
   * * Dialog actions
   */
  const onClose = () => {
    onParentClose();
  };

  const onSave = () => {
    setCriterion(prev => ({ ...prev, name, unit, beneficial }));
    onClose();
  };

  const onDelete = () => {
    // Remove criterion from list
    setCriterionList(prev => prev.filter(c => c.uuid !== criterion.uuid));
    // Remove product criterion values
    setProductCriterionValueList(prev =>
      prev.filter(p => p.criterionUuid !== criterion.uuid)
    );
    // Close dialog
    onClose();
  };

  /**
   * * Form
   */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

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

          <Button flex={1} variant="outline" onClick={onClose}>
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
