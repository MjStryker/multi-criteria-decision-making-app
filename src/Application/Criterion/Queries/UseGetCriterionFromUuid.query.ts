import UseGetCriterionListQuery from './UseGetCriterionList.query';

export default function UseGetCriterionFromUuidQuery() {
  const criterionList = UseGetCriterionListQuery();

  const getCriterionFromUuid = (uuid: string) => criterionList.find(criterion => criterion.uuid === uuid);

  return getCriterionFromUuid;
}
