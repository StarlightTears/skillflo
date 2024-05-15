import styled from '@emotion/styled';
import React from 'react';

import Badge from '../Badge';

import type { OriginCourse } from '@/types/course.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { useViewport } from '@/shared/hooks';
import { useCourseCategory } from '@/shared/hooks/category';
import { EXTRAS_TAGS } from '@/shared/policy';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { writePlayTime } from '@/shared/utils/time';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface CourseCardProps {
  course: OriginCourse;
  className?: string;
  thumbnailAlt?: string;
  onClick: () => void;
}

const CourseCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.6rem;
  box-shadow: inset 0 0 0 0.1rem rgb(0 0 0 / 7%);
  cursor: pointer;
`;

const Info = styled.div`
  padding: 1.6rem 1.2rem;

  ${media('large')} {
    padding: 2.4rem 1.6rem;
  }
`;

const InfoTitle = styled.h5`
  ${legacyTypographyMixin('body2')}
  display: -webkit-box;
  overflow: hidden;
  height: 4rem;
  font-weight: 700;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${media('large')} {
    ${legacyTypographyMixin('body1')}
    height: 4.8rem;
  }
`;

const SubInfo = styled.div`
  ${legacyTypographyMixin('caption')}
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
  color: var(--legacy-color-gray-600);

  .vertical-line {
    margin: 0 0.4rem;
    color: var(--legacy-color-gray-100);
  }

  ${media('large')} {
    flex-direction: row;
  }
`;

const BadgeBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.6rem;
`;

const Thumbnail = styled.img`
  object-fit: cover;

  width: 100%;
  max-height: 14.4rem;
  border-radius: 0 0 0.6rem 0.6rem;
`;

const CourseCard = ({ className, course, onClick }: CourseCardProps) => {
  const category = useCourseCategory(course);
  const { isLargeViewport } = useViewport();
  const { isOngoingCourse, isEnrollableCourse, isEnrollmentApplying } = getCourseEnrollmentState(course);

  return (
    <CourseCardBlock className={className} onClick={onClick}>
      <Info>
        <InfoTitle>{course.publicName}</InfoTitle>
        <SubInfo>
          <div>{category?.name || ''}</div>
          <div>
            {isLargeViewport && <span className="vertical-line">|</span>}
            <span>강의 {course?.extras?.totalCourseContentCount || 0}개</span>
            <span className="vertical-line">|</span>
            <span>{writePlayTime(course.extras.totalPlayTime || 0)}</span>
          </div>
        </SubInfo>
        <BadgeBlock>
          {course.requiredCourse && <Badge theme="blue">필수강의</Badge>}
          {course.extras.tags?.includes(EXTRAS_TAGS.COMPLETION_CERTIFICATE) && (
            <Badge theme="whiteblue">수료인정</Badge>
          )}
          {isOngoingCourse && <Badge theme="lightblue">수강중</Badge>}
          {isEnrollableCourse && (
            <Badge theme="gray" colorScale={400}>
              수강가능
            </Badge>
          )}
          {isEnrollmentApplying && (
            <Badge theme="gray" colorScale={400}>
              수강신청 접수
            </Badge>
          )}
        </BadgeBlock>
      </Info>
      <Thumbnail
        src={course.extras.thumbnail?.url || thumbNailEmpty}
        alt={course.publicName || 'course image'}
      ></Thumbnail>
    </CourseCardBlock>
  );
};

export default CourseCard;
