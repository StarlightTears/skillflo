import styled from '@emotion/styled';
import React, { FC } from 'react';

import type { OriginCourse } from '@/types/course.interface';

import { Badge, CircleNoticeCheck, Clock, ProgressGraph } from '@/components';
import { dateFormat } from '@/shared/utils/date';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface MypageSummaryRequiredProgressCourseProps {
  courseProgress: OriginCourse;
}

const MypageSummaryRequiredProgressCourseBlock = styled.li`
  display: flex;
  gap: 2rem;
  justify-content: space-between;

  padding: 0 0 1.6rem;

  .badge-icon {
    margin: 0 0.4rem 0 0;
  }

  .course-info {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }

  .course-title {
    ${legacyTypographyMixin('body2')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);
  }

  .product-title {
    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-500);
  }

  &:not(:last-child) {
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);
  }

  ${media('large')} {
    gap: 14rem;
    padding: 2.4rem 1.6rem;

    &:last-child {
      padding: 2.4rem 1.6rem 0;
    }

    .course-title {
      min-height: 4rem;
    }
  }
`;

const MypageSummaryRequiredProgressCourse: FC<MypageSummaryRequiredProgressCourseProps> = ({ courseProgress }) => {
  const isCompleted = courseProgress?.enrollment?.extras?.courseCompletion;

  return (
    <MypageSummaryRequiredProgressCourseBlock>
      <div className="course-info">
        <Badge theme={isCompleted ? 'lightgreen' : 'lightred'} size="medium">
          {isCompleted ? <CircleNoticeCheck className="badge-icon" /> : <Clock className="badge-icon" />}
          {dateFormat(courseProgress.requiredCourse?.extras.requiredCourseEndedAt || '')}까지
        </Badge>
        <div className="course-title">{courseProgress.publicName}</div>
        <div className="product-title">{courseProgress.product.extras.publicName}</div>
      </div>
      <div className="graph-wrapper">
        <ProgressGraph
          color={isCompleted ? 'green' : 'red'}
          value={courseProgress?.enrollment?.extras?.progressRate || 0}
          maxValue={100}
        />
      </div>
    </MypageSummaryRequiredProgressCourseBlock>
  );
};

export default MypageSummaryRequiredProgressCourse;
