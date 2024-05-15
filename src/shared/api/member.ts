import type { ApiData } from '@/types/api.interface';
import type { MemberClipProgress } from '@/types/clipPosition.interface';
import type { Member, MemberGroup, MemberTotalLearningTime } from '@/types/member.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getMemberListForLogin = (param: unknown) => {
  return CrudClientInstance.get<Member[]>('/member/login', param);
};

export const getSsoMemberListForLogin = (param: unknown) => {
  return CrudClientInstance.get<Member[]>('/member/external/login', param);
};

export const getMemberList = (param: unknown) => {
  return CrudClientInstance.get<Member[]>('/member', param);
};

export const getCurrentMember = (param: unknown) => {
  return CrudClientInstance.get<Member>('/member/info', param);
};

export const getCurrentMemberGroupList = async (memberGroupIdList: number[]) => {
  const response = await CrudClientInstance.get<ApiData<MemberGroup[]>>('/member-group/ids', {
    ids: memberGroupIdList.join(','),
  });

  return response.data.data;
};

export const putBookmark = (courseId: number, productId: number) => {
  return CrudClientInstance.put('/member/bookmark', {}, { courseId, productId });
};

export const deleteBookmark = (courseId: number, productId: number) => {
  return CrudClientInstance.delete('/member/bookmark', { courseId, productId });
};

export const getMemberClipProgressList = (param: unknown) => {
  return CrudClientInstance.get<MemberClipProgress[]>('/member-clip-progress', param);
};

export const setGoalTime = (param: unknown) => {
  return CrudClientInstance.post('/member/goal-time', {}, param);
};

export const getMemberTotalLearningTime = (param: unknown) => {
  return CrudClientInstance.get<MemberTotalLearningTime>('/statistic/member-course-play-time', param);
};
