import { useState } from 'react';

import { useCurrentMember } from '../useCurrentMember';

import { useAssessmentsQuery } from './assessment';
import { useMemberAssessmentsQuery } from './memberAssessment';

export const useOnboardingModal = () => {
  // 최초로 /match/home을 호출하면 memberAssessment 데이터가 생성됨
  // 따라서 memberAssessment가 빈 배열이면 진단 홈에 접속한 이력이 없는 것으로 간주
  // /member-assessments를 호출하여 memberAssessment 데이터 확인 후 온보딩 모달을 띄울지 결정

  const { member } = useCurrentMember();
  const { data: assessmentList } = useAssessmentsQuery();
  const { data: memberAssessmentsData, isSuccess: isMemberAssessmentFetchingSuccess } = useMemberAssessmentsQuery({
    memberId: member?.id ?? 0,
    assessmentId: assessmentList?.length ? assessmentList[0]?.id : 0,
  });

  const [draftOnboardingModalOpen, setDraftOnboardingModalOpen] = useState<boolean>();

  const closeOnboardingModal = () => setDraftOnboardingModalOpen(false);

  return {
    isOnboardingModalOpen: draftOnboardingModalOpen ?? memberAssessmentsData?.length === 0,
    setIsOnboardingModalOpen: setDraftOnboardingModalOpen,
    closeOnboardingModal,
    isOnboardingDataFetchingSuccess: isMemberAssessmentFetchingSuccess,
  };
};
