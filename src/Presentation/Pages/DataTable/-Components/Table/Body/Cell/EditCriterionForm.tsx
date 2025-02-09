import { CriterionDto } from '@/Application/Criterion/Dtos/Criterion.dto';
import { CriterionListAtom } from '@/Application/Criterion/Atoms/CriterionList.atom';
import TextInput from '@/Presentation/Components/Form/TextInput';

import { DeleteIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, FormControl, FormLabel, HStack, IconButton, Stack, VStack } from '@chakra-ui/react';
import { PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';

type Props = {
  criterionAtom: PrimitiveAtom<CriterionDto>;
  setParentIsDirty: Dispatch<SetStateAction<boolean>>;
  onParentClose: VoidFunction;
};

export default function EditCriterionForm({ criterionAtom, setParentIsDirty, onParentClose }: Props) {
  const [criterion, setCriterion] = useAtom(criterionAtom);
  const setCriterionList = useSetAtom(CriterionListAtom);

  const [name, setName] = useState<string>(criterion.name || '');
  const [unit, setUnit] = useState<string>(criterion.unit || '');
  const [beneficial, setBeneficial] = useState<boolean | null>(criterion.beneficial);

  const isDirty = name !== criterion.name || unit !== criterion.unit || beneficial !== criterion.beneficial;

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
    setName(criterion.name || '');
  }, [criterion.name]);

  useEffect(() => {
    setUnit(criterion.unit || '');
  }, [criterion.unit]);

  useEffect(() => {
    setBeneficial(criterion.beneficial);
  }, [criterion.beneficial]);

  /**
   * * Handle Inputs change
   */
  const onNameChange = (e: FormEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const onUnitChange = (e: FormEvent<HTMLInputElement>) => setUnit(e.currentTarget.value);

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
    setCriterionList(prev => prev.filter(c => c.uuid !== criterion.uuid));
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
        <TextInput label="Name" id="criterion-name" type="text" value={name} onChange={onNameChange} />

        <TextInput label="Unit" id="criterion-unit" type="text" value={unit} onChange={onUnitChange} />

        <FormControl as={VStack} spacing={0} alignItems="stretch">
          <FormLabel>Best value</FormLabel>

          <ButtonGroup colorScheme={beneficial === false ? 'orange' : 'blue'} isAttached>
            <Button
              flex={1}
              aria-label="Non beneficial"
              variant={beneficial === false ? 'solid' : 'outline'}
              rightIcon={beneficial === false ? <TriangleDownIcon /> : undefined}
              onClick={toggleBeneficial}
            >
              Lowest
            </Button>
            <Button
              flex={1}
              aria-label="Beneficial"
              variant={beneficial === true ? 'solid' : 'outline'}
              rightIcon={beneficial === true ? <TriangleUpIcon /> : undefined}
              onClick={toggleBeneficial}
            >
              Highest
            </Button>
          </ButtonGroup>
        </FormControl>

        <HStack>
          <IconButton colorScheme="red" icon={<DeleteIcon />} aria-label="Delete criterion" onClick={onDelete} />

          <Button flex={1} variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button flex={1} type="submit" colorScheme="teal" isDisabled={!isDirty}>
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
