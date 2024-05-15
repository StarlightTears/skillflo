import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import { DateUtil } from '@day1co/pebbles';

import SkillCategoryBadge from '../../../components/skill360/SkillCategoryBadge';

import { AlertModal, Button } from '@/components';
import {
  useAssessmentProgressState,
  useExitAssessment,
  useExpireTest,
  useSkillQueryOnPage,
} from '@/shared/hooks/skill360';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const SkillAssessmentHeaderBlock = styled.header`
  border-bottom: 0.1rem solid var(--color-semantic-divider-default);
  background-color: var(--color-white);

  .container {
    display: flex;
    align-items: center;
    max-width: 120rem;
    height: 6rem;
    margin: 0 auto;
    padding: 0 1.2rem;

    .skill-badge {
      flex: 0 0 auto;
      margin: 0 1.2rem 0 0;
    }

    .skill-name {
      flex: 1 1 auto;
      overflow: hidden;
      margin: 0 3.2rem 0 0;
      text-overflow: ellipsis;
      white-space: nowrap;

      ${renewalTypographyMixin('body', 2, true)}
    }

    .time-limit {
      display: flex;
      flex: 0 0 14rem;
      gap: 0.6rem;
      align-items: center;
      margin: 0 3.2rem 0 0;

      .label {
        color: var(--color-gray-700);
        ${renewalTypographyMixin('body', 4)};
      }

      .time {
        color: var(--color-gray-800);
        ${renewalTypographyMixin('body', 3, true)}
      }
    }

    .exit-button {
      flex: 0 0 auto;
      width: auto;
      padding: 0 1rem;
      border: 0.1rem solid var(--color-gray-100);

      color: var(--color-gray-800);
      ${renewalTypographyMixin('label', 3, true)}
    }
  }
`;

const SkillAssessmentHeader = () => {
  const { data: skillDetailData } = useSkillQueryOnPage();

  const [isRenderExitModal, setRenderExitModal] = useState(false);
  const { exitAssessment } = useExitAssessment();

  const { expireTime } = useAssessmentProgressState();
  const [limitSecond, setLimitSecond] = useState(0);
  const limitTimerRef = useRef<number>(-1);
  const { expireTest } = useExpireTest();
  const computeLimitSecond = () => {
    const currentLimitSecond = Math.round((expireTime - Date.now()) / 1000);
    if (currentLimitSecond < 0) {
      clearInterval(limitTimerRef.current);
      expireTest();
      setLimitSecond(0);
      return;
    }
    setLimitSecond(currentLimitSecond);
  };

  useEffect(() => {
    if (!expireTime) return;

    const currentLimitSecond = Math.round((expireTime - Date.now()) / 1000);
    computeLimitSecond();

    limitTimerRef.current = setTimeout(() => {
      computeLimitSecond();
      limitTimerRef.current = setInterval(() => computeLimitSecond(), 1000) as unknown as number;
    }, currentLimitSecond % 1000) as unknown as number;

    return () => {
      clearTimeout(limitTimerRef.current);
      clearInterval(limitTimerRef.current);
    };
  }, [expireTime]);

  return (
    <SkillAssessmentHeaderBlock>
      <div className="container">
        {skillDetailData?.skill.type && (
          <SkillCategoryBadge className="skill-badge" category={skillDetailData?.skill.type} size="medium" />
        )}
        <div className="skill-name">{skillDetailData?.skill.name}</div>
        <div className="time-limit">
          <span className="label">남은 시간</span>
          <span className="time">{DateUtil.getTimeStringFromSeconds(limitSecond)}</span>
        </div>
        <Button type="button" theme="white" className="exit-button" onClick={() => setRenderExitModal(true)}>
          진단 종료
        </Button>
      </div>
      {isRenderExitModal && (
        <AlertModal
          title="진단 종료"
          description="진단을 종료하면 동일 스킬에 재응시 할 수 없습니다. 진단을 종료하고 최종 나의 스킬 레벨을 확인하시겠습니까?"
          confirmButtonText="진단 종료"
          isCriticalAction
          onConfirm={() => exitAssessment()}
          cancleButtonText="취소"
          onClose={() => setRenderExitModal(false)}
        />
      )}
    </SkillAssessmentHeaderBlock>
  );
};

export default SkillAssessmentHeader;
