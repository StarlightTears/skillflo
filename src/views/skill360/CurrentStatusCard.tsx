import styled from '@emotion/styled';
import React from 'react';

import { DateUtil } from '@day1co/pebbles';

import { CheckOutlined, ClockOutlined } from '@/components';
import SkillAssessmentProgressGauge from '@/components/skill360/SkillAssessmentProgressGauge';
import { dateFormat } from '@/shared/utils/date';
import { textEllipsis } from '@/styles/mixins';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { Assessment, CoworkerCount, MemberAssessment } from '@/types/skill360.interface';

interface CurrentStatusCardProps {
  data: Assessment;
  memberAssessment: MemberAssessment;
  totalCount: number;
  skillCompletionProgress: number;
  coworkerCount: CoworkerCount;
}

const AssessmentInfoBlock = styled.section`
  display: flex;
  gap: 4rem;
  align-items: center;
  max-width: 81.2rem;
  padding: 4rem 4rem 2.4rem 2.4rem;

  .assessment-info {
    padding-right: 4rem;
    border-right: 0.1rem solid var(--color-semantic-divider-default);

    > h1 {
      ${renewalTypographyMixin('title', 1)};
      ${textEllipsis(2)};
      margin-bottom: 1rem;
    }

    .assessment-description {
      width: 50.7rem;
      ${renewalTypographyMixin('body', 3, false)}
      ${textEllipsis(4)}
    }

    .assessment-period {
      margin-top: 2.4rem;

      > h3 {
        ${renewalTypographyMixin('body', 2, true)}
      }

      .assessment-period-wrapper {
        display: flex;
        align-items: center;

        .assessment-period-value {
          margin: 0.8rem 0;
          padding: 1rem;
          border: 0.1rem solid var(--color-semantic-divider-default);
          border-radius: 0.4rem;
          ${renewalTypographyMixin('label', 3)}
        }

        .limit-day {
          display: flex;
          gap: 0.8rem;
          align-items: center;
          margin-left: 0.6rem;
          padding: 1rem;
          border: 0.1rem solid var(--color-semantic-divider-default);
          border-radius: 0.4rem;
          ${renewalTypographyMixin('label', 3)}
        }
      }

      .period-limit-warning {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        ${renewalTypographyMixin('caption', 1)}
        color: var(--color-semantic-informative-secondary);
      }
    }
  }
`;

const AssessmentInfoBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.6rem;
  padding: 0.8rem 1.2rem;
  background-color: var(--color-semantic-informative-accent-low);
  color: var(--color-semantic-informative-accent);
  ${renewalTypographyMixin('caption', 1)};
`;

const CurrentStatusCard = ({
  data,
  memberAssessment,
  totalCount,
  skillCompletionProgress,
  coworkerCount,
}: CurrentStatusCardProps) => {
  const now = new Date();
  let bannerMessage = '';
  if (now < new Date(data.beginAt)) {
    bannerMessage = `스킬 진단을 통해 나를 위한 맞춤 서비스를 경험해보세요.`;
  } else if (
    (memberAssessment.limitedAt && now > new Date(memberAssessment.limitedAt)) ||
    (!memberAssessment.limitedAt && now > new Date(data.endAt))
  ) {
    bannerMessage = '진단이 종료되었습니다. 나를 위한 맞춤 서비스를 경험해보세요.';
  } else {
    //진단 기간 중
    if (memberAssessment.completedAt) {
      bannerMessage = '진단을 완료하시느라 고생 많으셨습니다. 나를 위한 맞춤 서비스를 경험해 보세요.';
    } else {
      if (coworkerCount.memberCountInMemberGroup > 1) {
        if (coworkerCount.NormalOrCompletedMemberCount >= 1) {
          bannerMessage = `${coworkerCount.NormalOrCompletedMemberCount} 명의 동료가 진단을 진행했습니다. 모든 진단을 완료하고 맞춤 서비스를 경험해보세요.`;
        } else {
          bannerMessage = `${coworkerCount.memberCountInMemberGroup} 명의 동료가 스킬 진단 서비스를 함께하고 있습니다. 모든 진단을 완료하고 맞춤 서비스를 경험해보세요.`;
        }
      } else {
        bannerMessage = '진단을 시작해 나를 위한 맞춤 서비스를 경험해보세요.';
      }
    }
  }

  let periodValue = `${dateFormat(data.beginAt, 'YYYY년 MM월 DD일 HH:mm')} ~ ${dateFormat(
    data.endAt,
    'YYYY년 MM월 DD일 HH:mm'
  )}`;
  let warningMessage = `해당 기간 안에 진단을 시작해 주세요. 시작된 진단은 ${
    data.duration / (60 * 24)
  }일 내에 완료해야 합니다.`;

  const assessmentEndAt = dateFormat(
    DateUtil.startOf(DateUtil.calcDatetime(memberAssessment.limitedAt, { day: +1 }), 'day'),
    'YYYY-MM-DD'
  );
  const dDay = DateUtil.diff(assessmentEndAt, new Date(), 'day');

  if (memberAssessment.state === 'NORMAL') {
    warningMessage = '해당 기간 안에 진단을 완료해 주세요. 이후에는 진단이 불가능합니다.';
    periodValue = `${dateFormat(assessmentEndAt, 'YYYY년 MM월 DD일 00:00')} 까지`;
  }
  if (memberAssessment.state === 'COMPLETED') {
    warningMessage = '모든 진단이 완료되었습니다. 핵심 스킬 분석 결과를 확인해보세요.';
    periodValue = `${dateFormat(assessmentEndAt, 'YYYY년 MM월 DD일 00:00')} 까지`;
  }

  return (
    <>
      <AssessmentInfoBlock>
        <div className="assessment-info">
          <h1>{data.name}</h1>
          <p className="assessment-description">{data.description}</p>
          <div className="assessment-period">
            <h3>진단 기간</h3>
            <div className="assessment-period-wrapper">
              <div className="assessment-period-value">{periodValue}</div>
              {memberAssessment.state === 'NORMAL' && (
                <div className="limit-day">
                  <ClockOutlined />
                  <div>D{dDay > 0 ? `+${dDay}` : dDay}</div>
                </div>
              )}
            </div>
            <div className="period-limit-warning">
              <CheckOutlined />
              {warningMessage}
            </div>
          </div>
        </div>
        <SkillAssessmentProgressGauge progressed={skillCompletionProgress} total={totalCount} />
      </AssessmentInfoBlock>
      <AssessmentInfoBanner>{bannerMessage}</AssessmentInfoBanner>
    </>
  );
};

export default CurrentStatusCard;
