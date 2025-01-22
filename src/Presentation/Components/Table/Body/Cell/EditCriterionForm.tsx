import { isValidNotEmptyString } from "@/@Shared/@Utils/String";
import { DataContext } from "@/context/DataContext";
import TextInput from "@/Presentation/Components/Form/TextInput";
import { Criterion } from "@/types/Criterion";
import { DeleteIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type EditCriterionFormProps = {
  firstFieldRef: any;
  setParentIsDirty: Dispatch<SetStateAction<boolean>>;
  onParentClose: VoidFunction;
  criterion: Criterion;
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

  const [confirmDelete, setConfirmDelete] = useState(false);

  const isDirty =
    name !== criterion.name ||
    unit !== criterion.unit ||
    beneficial !== criterion.beneficial;

  /**
   * * Update parent props
   */
  useEffect(() => {
    setParentIsDirty(isDirty);
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
    setConfirmDelete(false);
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

              <Button
                flex={1}
                variant="outline"
                onClick={() => setConfirmDelete(false)}
              >
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
                onClick={() =>
                  !isValidNotEmptyString(name) && !isValidNotEmptyString(unit)
                    ? // * If fields are empty then delete criterion
                      onDelete()
                    : // * Else go through confirm process
                      setConfirmDelete(true)
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
