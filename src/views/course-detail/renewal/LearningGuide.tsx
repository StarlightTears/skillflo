import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { PropsWithStyle } from '@/types/component.interface';
import type { CourseDetail, RequiredCourse } from '@/types/course.interface';

import { Download, Warning } from '@/components';
import Button from '@/components/common-renewal/Button';
import { useCurrentMemberGroup } from '@/shared/hooks';
import { useCourseDetailParams, useCourseDetailState } from '@/shared/hooks/course-detail';
import { useExportCertificate } from '@/shared/hooks/useExport';
import { dateFormat } from '@/shared/utils/date';
import { homeMedia, typographyMixin } from '@/styles/mixins';

interface CourseDetailLearningGuideProps {
  courseDetailData: CourseDetail;
}

const CourseDetailLearningGuideBlock = styled.section<{
  requiredCourse?: RequiredCourse | undefined;
  isWeekBeforeCourseEndedAt: boolean;
  isExpiredCourseEndedAt: boolean;
  isCompletionCertification?: boolean;
}>`
  padding: 1.6rem;
  border-radius: 0.6rem;
  background-color: ${({
    requiredCourse,
    isWeekBeforeCourseEndedAt,
    isExpiredCourseEndedAt,
    isCompletionCertification,
  }) => {
    if (isExpiredCourseEndedAt) return `var(--color-gray-600-transparency-10)`;
    if (isWeekBeforeCourseEndedAt && !isCompletionCertification) return `var(--color-semantic-red-transparency-10)`;
    if (requiredCourse) return `var(--color-primary-700-transparency-5)`;
    return `rgba(38, 107, 255, 0.05)`;
  }};

  .message {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    color: var(--color-gray-500);
    ${typographyMixin('p3', 'bold')};

    svg {
      margin-right: 0.8rem;
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    .period {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      margin-bottom: 2rem;
      ${typographyMixin('p2')};

      p {
        .label {
          margin-right: 1.2rem;
          ${typographyMixin('p2', 'bold')};
        }

        .date {
          color: ${({ isExpiredCourseEndedAt }) =>
            isExpiredCourseEndedAt ? 'var(--color-gray-400)' : 'var(--color-gray-600)'};
        }

        ${({ isExpiredCourseEndedAt }) => isExpiredCourseEndedAt && `color: var(--color-gray-400)`};
      }

      .required {
        ${({ isWeekBeforeCourseEndedAt, isExpiredCourseEndedAt, isCompletionCertification }) => {
          if (isExpiredCourseEndedAt) return ``;
          if (isWeekBeforeCourseEndedAt && !isCompletionCertification)
            return `
              color: var(--color-semantic-red);

              .date {
                color: var(--color-semantic-red);
              }
            `;
          return `
            color: var(--color-primary-700);

            .date {
              color:var(--color-primary-700);
            }
          `;
        }};
      }
    }

    .button-group {
      display: flex;
      gap: 1.2rem;
      justify-content: flex-end;
    }
  }

  ${homeMedia('large', 'xlarge')} {
    margin: 0 auto;

    .message {
      margin-bottom: 1.2rem;
    }

    .info {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .period {
        flex-direction: row;
        gap: 2rem;
        margin-bottom: 0;
      }
    }
  }
`;

const LearningGuide = ({
  className,
  courseDetailData: { courseDetail, courseScore, requiredCourseScore },
}: PropsWithStyle<CourseDetailLearningGuideProps>) => {
  const { courseId } = useCourseDetailParams();
  const navigate = useNavigate();
  const { data: currentMemberGroup } = useCurrentMemberGroup();
  const { isCompletionCertification, exportCertificate } = useExportCertificate({
    course: courseDetail,
    courseScore,
    requiredCourseScore,
  });
  const { isWeekBeforeCourseEndedAt, isExpiredCourseEndedAt, isEnrollmentApplying } = useCourseDetailState();

  const requiredCourse = courseDetail.requiredCourse;

  return (
    <CourseDetailLearningGuideBlock
      className={className}
      requiredCourse={courseDetail.requiredCourse}
      isWeekBeforeCourseEndedAt={isWeekBeforeCourseEndedAt}
      isExpiredCourseEndedAt={isExpiredCourseEndedAt}
      isCompletionCertification={isCompletionCertification}
    >
      {(isExpiredCourseEndedAt || isEnrollmentApplying) && (
        <p className="message">
          {isExpiredCourseEndedAt ? (
            <>
              <Warning />
              학습기간이 만료된 강의입니다.
            </>
          ) : (
            isEnrollmentApplying && '수강 신청 접수되어 승인 대기 중입니다.'
          )}
        </p>
      )}
      <div className="info">
        <div className="period">
          {requiredCourse && (
            <p className="required">
              <span className="label">필수학습 기간</span>
              <span className="date">{`${dateFormat(requiredCourse.extras.requiredCourseStartedAt)} ~ ${dateFormat(
                requiredCourse.extras.requiredCourseEndedAt
              )}`}</span>
            </p>
          )}
          <p className="required">
            <span className="label">필수학습 기간</span>
            <span className="date">{`${dateFormat(courseDetail.product.extras.courseStartedAt)} ~ ${dateFormat(
              courseDetail.product.extras.courseEndedAt
            )}`}</span>
          </p>
          <p>
            <span className="label">학습 가능 기간</span>
            <span className="date">{`${dateFormat(courseDetail.product.extras.courseStartedAt)} ~ ${dateFormat(
              courseDetail.product.extras.courseEndedAt
            )}`}</span>
          </p>
        </div>
        <div className="button-group">
          <Button size="small" theme="outline" onClick={() => navigate(`/course/${courseId}`)}>
            강의 내용 보기
          </Button>
          {currentMemberGroup?.extras.isShowCertificationButton && (
            <Button
              size="small"
              theme="outline"
              rightIcon={<Download />}
              disabled={!isCompletionCertification}
              onClick={exportCertificate}
            >
              수료증 발급
            </Button>
          )}
        </div>
      </div>
    </CourseDetailLearningGuideBlock>
  );
};

export default LearningGuide;
