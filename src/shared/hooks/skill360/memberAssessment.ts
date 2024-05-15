import { useQuery } from '@tanstack/react-query';

import type { MemberAssessment } from '@/types/skill360.interface';

import { getMemberAssessments } from '@/shared/api/skill360/home';
import { QUERY_KEYS } from '@/shared/policy';

const fetchMemberAssessment = () => {
  const memberAssessment: MemberAssessment = {
    id: 10000,
    state: 'COMPLETED',
    memberId: 10000,
    assessmentId: 10000,
    startedAt: new Date(),
    completedAt: new Date(),
    limitedAt: new Date(),
  };

  return new Promise<MemberAssessment>((resolve) => {
    setTimeout(() => {
      resolve(memberAssessment);
    }, 1000);
  });
};

export const useMemberAssessmentQuery = (skillId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBER_ASSESSMENT_PROGRESS({ skillId, examId: 0, memberAssessmentId: 0 }),
    queryFn: () => fetchMemberAssessment(),
  });
};

export const useMemberAssessmentsQuery = ({
  limit = 20,
  memberId,
  assessmentId,
}: {
  limit?: number;
  memberId: number;
  assessmentId: number;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBER_ASSESSMENTS(limit, memberId, assessmentId),
    queryFn: () => getMemberAssessments(limit, memberId, assessmentId).then((res) => res.data),
    enabled: !!memberId && !!assessmentId,
  });
};
