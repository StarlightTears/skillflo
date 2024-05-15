import { useQuery } from '@tanstack/react-query';

import { getMemberClipProgressList } from '../api/member';
import { QUERY_KEYS } from '../policy';

interface MemberClipProgressParams {
  productId: number;
  courseId: number;
  courseContentId: number;
  memberId: number | undefined;
}

export const useMemberClipProgress = ({ productId, courseId, courseContentId, memberId }: MemberClipProgressParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBER_CLIP_PROGRESS_LIST(productId, courseId, courseContentId, memberId),
    queryFn: () =>
      getMemberClipProgressList({ productId, courseId, courseContentId, memberId }).then((data) => data.data),
    enabled: !!(productId && courseId && courseContentId && memberId),
  });
};
