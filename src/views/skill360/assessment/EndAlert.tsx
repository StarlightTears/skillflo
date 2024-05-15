import { css } from '@emotion/react';
import React from 'react';

import { AlertModal, CircleNoticeCheck } from '@/components';
import { useExitAssessment, useAssessmentProgressState, useSkillQueryOnPage } from '@/shared/hooks/skill360';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const iconStyle = css`
  width: 3.2rem;
  height: 3.2rem;
`;

const skillNameStyle = css`
  ${renewalTypographyMixin('body', 3, true)}
`;

const SkillAssessmentEndAlert = () => {
  const { data: skillDetail } = useSkillQueryOnPage();
  const { isCompleted } = useAssessmentProgressState();

  const { exitAssessment } = useExitAssessment();

  if (!isCompleted) return null;

  return (
    <AlertModal
      image={<CircleNoticeCheck css={iconStyle} />}
      title="스킬 진단 종료"
      description={
        <>
          <span css={skillNameStyle}>{skillDetail?.skill.name}</span> 진단이 종료되었습니다.
          <br />
          아래 버튼을 클릭하여 진단결과를 확인해주세요.
        </>
      }
      confirmButtonText="나의 진단 분석 결과 확인"
      onConfirm={exitAssessment}
    />
  );
};

export default SkillAssessmentEndAlert;
