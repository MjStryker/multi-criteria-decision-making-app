import { useSetAtom } from 'jotai';
import { CriterionListAtom } from '../Queries/UseGetCriterionList.query';

export default function UseSetCriterionListCommand() {
  const setCriterionList = useSetAtom(CriterionListAtom);
  return setCriterionList;
}
