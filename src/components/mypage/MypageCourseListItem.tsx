import { css } from '@emotion/react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import type { OriginCourse, RequiredCourse } from '@/types/course.interface';

import { ProgressGraph, Badge, Download, CourseIntroWithExtra } from '@/components';
import { useCourseCategory } from '@/shared/hooks/category';
import { useClassroomNavigate } from '@/shared/hooks/classroom';
import { useVerificationEnrollment } from '@/shared/hooks/enrollment';
import { useExportCertificate } from '@/shared/hooks/useExport';
import { useNavigateCourseDetailByEnrollment } from '@/shared/hooks/useNavigateCourseDetailByEnrollment';
import { isRequiredCourse } from '@/shared/utils/course';
import { dateFormat } from '@/shared/utils/date';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';
interface MypageCourseListItemProps {
  courseProgress: OriginCourse;
  isShowCertificationButton: boolean;
}

const MypageCourseListItemStyle = css`
  .info-column {
    .course-title {
      margin: 0 0 0.4rem;
      ${legacyTypographyMixin('body2')}
    }
  }

  .date-list {
    ${legacyTypographyMixin('caption')}
  }

  .date {
    margin: 0 0 0 0.4rem;
    font-weight: 700;
  }

  .badge-wrapper {
    display: flex;
    gap: 0.4rem;
    padding: 1.2rem 0 0;
  }

  .extra-column {
    display: none;
  }

  .certificate-link {
    display: flex;
    align-items: center;
    margin: 1.2rem 0 0;
    padding: 0.4rem 0.4rem 0.4rem 1.2rem;

    ${legacyTypographyMixin('caption')}
    font-weight: 700;
    color: var(--color-blue-600);
    cursor: pointer;
  }

  ${media('small', 'medium')} {
    .info-column {
      .course-infos {
        .vertical-line,
        .course-info:not(.product) {
          display: none;
        }
      }
    }

    .date-item {
      &:not(:first-of-type) {
        display: none;
      }
    }
  }

  ${media('large')} {
    .date-list {
      display: flex;
      gap: 1.2rem;
    }

    .badge-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0;
    }

    .extra-column {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .progress {
      width: 100%;
    }
  }
`;

const MypageCourseListItem: FC<MypageCourseListItemProps> = ({ courseProgress, isShowCertificationButton }) => {
  const navigate = useNavigate();
  const navigateCourseDetail = useNavigateCourseDetailByEnrollment();
  const classroomNavigate = useClassroomNavigate();
  const product = courseProgress.product;
  const isEndedCourse =
    product.state === 'ENDED' ||
    courseProgress.state === 'ENDED' ||
    new Date(product.extras.courseEndedAt) < new Date();
  const shouldRenderPlayIcon = courseProgress.state !== 'STAY' && !isEndedCourse;
  const { verification } = useVerificationEnrollment(courseProgress.product.id, courseProgress.id);

  const thisIsRequiredCourse = isRequiredCourse(courseProgress);
  const { exportCertificate } = useExportCertificate({ course: courseProgress });
  const courseCategory = useCourseCategory(courseProgress);

  const goToCourseClassroom = async () => {
    if (isEndedCourse) {
      navigate(`/course-detail/${courseProgress.product.id}/${courseProgress.id}`);
      return;
    }

    await verification();
    classroomNavigate({ productId: courseProgress.product.id, courseId: courseProgress.id });
  };

  const goToMyPageCourseDetail = () => {
    navigateCourseDetail(courseProgress);
  };

  const enrollmentNode = (() => {
    if (!courseProgress.enrollment || isEndedCourse) return null;
    if (courseProgress.enrollment?.state === 'COMPLETED') {
      return <Badge theme="lightblue">승인</Badge>;
    }

    return (
      <Badge theme="gray" colorScale={400}>
        수강신청 접수
      </Badge>
    );
  })();

  return (
    <CourseIntroWithExtra
      title={courseProgress.publicName}
      thumbnailUrl={courseProgress.extras.thumbnail?.url || ''}
      opacityThumbnail={isEndedCourse}
      playIconOnThumbnail={shouldRenderPlayIcon}
      categoryName={courseCategory?.name || ''}
      productName={courseProgress.product.extras.publicName}
      onClickThumnail={goToCourseClassroom}
      onClickInfoColumn={goToMyPageCourseDetail}
      course={courseProgress}
      courseIntroSlot={
        <>
          <ul className="date-list">
            {thisIsRequiredCourse && (
              <li className="date-item required">
                <span className="label">필수수강기간</span>
                <span className="date">
                  {dateFormat((courseProgress.requiredCourse as RequiredCourse).extras.requiredCourseEndedAt)} 까지
                </span>
              </li>
            )}
            <li className="date-item normal">
              <span className="label">수강가능기간</span>
              <span className="date">{dateFormat(courseProgress.product.extras.courseEndedAt.toString())} 까지</span>
            </li>
          </ul>
          <div className="badge-wrapper">
            {thisIsRequiredCourse && <Badge theme="blue">필수강의</Badge>}
            {enrollmentNode}
          </div>
        </>
      }
      extraSlot={
        <>
          <ProgressGraph
            color="blue"
            value={courseProgress?.enrollment?.extras?.progressRate || 0}
            maxValue={100}
            textAlign="right"
            className="progress"
          />
          {courseProgress?.enrollment?.extras?.courseCompletion && isShowCertificationButton && (
            <div className="certificate-link" onClick={exportCertificate}>
              수료증 발급
              <Download />
            </div>
          )}
        </>
      }
      css={MypageCourseListItemStyle}
    />
  );
};

export default MypageCourseListItem;
