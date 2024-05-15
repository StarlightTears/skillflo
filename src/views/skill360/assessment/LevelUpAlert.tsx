import { css } from '@emotion/react';
import React from 'react';

import { AlertModal, CircleNoticeCheck, WhiteArrowRight } from '@/components';
import { useLevelUpAlert } from '@/shared/hooks/skill360';

const iconStyle = css`
  width: 3.2rem;
  height: 3.2rem;
`;

const confirmButtonStyle = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const SkillAssessmentLevelUpAlert = () => {
  const { shouldQuestionLevelUpAlert, currentQuestionLevel, upQuestionLevel } = useLevelUpAlert();

  if (!shouldQuestionLevelUpAlert) return null;

  return (
    <AlertModal
      image={<CircleNoticeCheck css={iconStyle} />}
      title={`레벨 ${currentQuestionLevel} 통과 완료!`}
      description="제출하신 답안이 기준 정답률을 달성하여 다음 레벨로 넘어갑니다."
      confirmButtonText={
        <span css={confirmButtonStyle}>
          다음 레벨
          <WhiteArrowRight />
        </span>
      }
      onConfirm={upQuestionLevel}
    />
  );
};

export default SkillAssessmentLevelUpAlert;
