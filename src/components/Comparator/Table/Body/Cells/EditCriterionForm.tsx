import {
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

import { DeleteIcon } from "@chakra-ui/icons";
import { TCriterion } from "../../../../../types/criteria";
import TextInput from "../../../global/form/TextInput";
import { isValidNonEmptyString } from "../../../../../utils/strings";

type EditCriterionFormProps = {
  firstFieldRef: any;
  onClose: VoidFunction;
  criterion: TCriterion;
  updateCriterion: (criterion: TCriterion) => void;
  removeCriterion: (criterion: TCriterion) => void;
};

const EditCriterionForm = ({
  firstFieldRef,
  criterion,
  onClose: onPropsClose,
  updateCriterion,
  removeCriterion,
}: EditCriterionFormProps) => {
  const [name, setName] = useState<string | undefined>(criterion.name);

  const [unit, setUnit] = useState<string | undefined>(criterion.unit);

  const [confirmDelete, setConfirmDelete] = useBoolean();

  const hasChanges = name !== criterion.name || unit !== criterion.unit;

  /**
   * * Sync local state on props change
   */
  useEffect(() => {
    setName(criterion.name);
    return () => setName("");
  }, [criterion.name]);

  useEffect(() => {
    setUnit(criterion.unit);
    return () => setUnit("");
  }, [criterion.unit]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);

  const onUnitChange = (e: FormEvent<HTMLInputElement>) =>
    setUnit(e.currentTarget.value);

  /**
   * * Dialog actions
   */
  const onClose = () => {
    setConfirmDelete.off();
    onPropsClose();
  };

  const onSave = () => {
    updateCriterion({ ...criterion, name, unit });
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
                isDisabled={!hasChanges}
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
