import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
  useBoolean,
} from "@chakra-ui/react";
import { DeleteIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { FormEvent, useContext, useEffect, useState } from "react";

import { DataContext } from "../../../../../context/DataContext";
import { TCriterion } from "../../../../../types/criteria";
import TextInput from "../../../global/form/TextInput";
import { isValidNonEmptyString } from "../../../../../utils/strings";
import { useBooleanSetState } from "../../../../../types/chakra";

type EditCriterionFormProps = {
  firstFieldRef: any;
  setParentIsDirty: useBooleanSetState;
  onParentClose: VoidFunction;
  criterion: TCriterion;
};

const EditCriterionForm = ({
  firstFieldRef,
  setParentIsDirty,
  criterion,
  onParentClose,
}: EditCriterionFormProps) => {
  const { updateCriterion, removeCriterion } = useContext(DataContext);

  const [name, setName] = useState<string | undefined>(criterion.name);
  const [unit, setUnit] = useState<string | undefined>(criterion.unit);
  const [beneficial, setBeneficial] = useState<boolean | undefined>(
    criterion.beneficial
  );

  const [confirmDelete, setConfirmDelete] = useBoolean();

  const isDirty =
    name !== criterion.name ||
    unit !== criterion.unit ||
    beneficial !== criterion.beneficial;

  /**
   * * Update parent props
   */
  useEffect(() => {
    isDirty ? setParentIsDirty.on() : setParentIsDirty.off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(criterion.name);
    return () => setName(undefined);
  }, [criterion.name]);

  useEffect(() => {
    setUnit(criterion.unit);
    return () => setUnit(undefined);
  }, [criterion.unit]);

  useEffect(() => {
    setBeneficial(criterion.beneficial);
    return () => setBeneficial(undefined);
  }, [criterion.beneficial]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);

  const onUnitChange = (e: FormEvent<HTMLInputElement>) =>
    setUnit(e.currentTarget.value);

  const toggleBeneficial = () => {
    setBeneficial((prev) => !prev);
  };

  /**
   * * Dialog actions
   */
  const onClose = () => {
    setConfirmDelete.off();
    onParentClose();
  };

  const onSave = () => {
    updateCriterion({ ...criterion, name, unit, beneficial });
    onClose();
  };

  const onDelete = () => {
    removeCriterion(criterion);
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
      <Stack spacing={4}>
        <TextInput
          label="Name"
          id="criterion-name"
          ref={firstFieldRef}
          type="text"
          value={name}
          onChange={onNameChange}
          isDisabled={confirmDelete}
        />

        <TextInput
          label="Unit"
          id="criterion-unit"
          type="text"
          value={unit}
          onChange={onUnitChange}
          isDisabled={confirmDelete}
        />

        <FormControl as={VStack} spacing={0} alignItems="stretch">
          <FormLabel>Best value</FormLabel>

          <ButtonGroup
            colorScheme={beneficial === false ? "orange" : "blue"}
            isAttached
            isDisabled={confirmDelete}
          >
            <Button
              flex={1}
              aria-label="Non beneficial"
              variant={beneficial === false ? "solid" : "outline"}
              rightIcon={
                beneficial === false ? <TriangleDownIcon /> : undefined
              }
              onClick={toggleBeneficial}
            >
              Lowest
            </Button>
            <Button
              flex={1}
              aria-label="Beneficial"
              variant={beneficial === true ? "solid" : "outline"}
              rightIcon={beneficial === true ? <TriangleUpIcon /> : undefined}
              onClick={toggleBeneficial}
            >
              Highest
            </Button>
          </ButtonGroup>
        </FormControl>

        <HStack>
          {confirmDelete ? (
            <>
              <Text flex={2} fontSize="md">
                Delete?
              </Text>

              <Button flex={1} variant="outline" onClick={setConfirmDelete.off}>
                No
              </Button>

              <Button flex={1} colorScheme="red" onClick={onDelete}>
                Yes
              </Button>
            </>
          ) : (
            <>
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                aria-label="Delete criterion"
                onClick={
                  !isValidNonEmptyString(name) && !isValidNonEmptyString(unit)
                    ? // * If fields are empty then delete criterion
                      onDelete
                    : // * Else go through confirm process
                      setConfirmDelete.on
                }
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
            </>
          )}
        </HStack>
      </Stack>
    </form>
  );
};

export default EditCriterionForm;
