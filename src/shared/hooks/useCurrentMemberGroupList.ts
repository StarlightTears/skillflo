import { getCurrentMemberGroupList } from '../api/member';
import { QUERY_KEYS } from '../policy';

import { useAppSelector } from './useAppSelector';
import { useBpoQuery } from './useBpoApi';
import { useCurrentMember } from './useCurrentMember';

export const useCurrentMemberGroupList = () => {
  const members = useAppSelector((state) => state.members.members);
  const memberGroupIdList = members.map((member) => Number(member.extras.groupId));

  return useBpoQuery(
    QUERY_KEYS.MEMBER_GROUP_LIST(memberGroupIdList),
    () => getCurrentMemberGroupList(memberGroupIdList),
    {
      enabled: !!members?.length,
    }
  );
};

export const useCurrentMemberGroup = () => {
  const { member: currentMember } = useCurrentMember();
  const memberGroupId = Number(currentMember?.extras.groupId);

  const { data, ...queryResult } = useBpoQuery(
    QUERY_KEYS.MEMBER_GROUP_LIST([memberGroupId]),
    () => getCurrentMemberGroupList([memberGroupId]),
    {
      enabled: !!memberGroupId,
    }
  );

  const memberGroup = data && data[0];
  const isSkill360MemberGroup = memberGroup?.extras.isDiagnosisGroupTemporary;

  return { ...queryResult, data: memberGroup, isSkill360MemberGroup };
};
