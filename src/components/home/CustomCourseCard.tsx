import styled from '@emotion/styled';
import React from 'react';

import type { OriginCourse } from '@/types/course.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { useCourseCategory } from '@/shared/hooks/category';
import { useNavigateCourseDetailByEnrollment } from '@/shared/hooks/useNavigateCourseDetailByEnrollment';
import { writePlayTime } from '@/shared/utils/time';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

interface CustomCourseCardProps {
  course: OriginCourse;
}

const CustomCourseCardBlock = styled.div`
  position: relative;
  top: 0;
  width: 27.6rem;
  height: 31.5rem;
  margin-top: 1.2rem;
  border-radius: 1.2rem;
  background-color: var(--color-surface-black-5);
  cursor: pointer;
  transition: top 0.15s ease-in-out;

  :hover {
    top: -0.8rem;
  }

  img {
    width: 100%;
    border-radius: 0.8rem 0.8rem 0 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 2rem;

    .category {
      color: var(--color-text-gray);
      ${legacyTypographyMixin('XXSmall')};
    }

    .name {
      height: 8rem;
      font-weight: 500;
      ${legacyTypographyMixin('Small')};
      ${textEllipsis(3)};
    }

    .info {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      color: var(--color-text-gray);
      ${legacyTypographyMixin('XXSmall')};

      .dot {
        width: 0.2rem;
        height: 0.2rem;
        background-color: var(--color-text-gray);
      }
    }
  }
`;

const CustomCourseCard = ({ course }: CustomCourseCardProps) => {
  const courseCategory = useCourseCategory(course);
  const navigateCourseDetail = useNavigateCourseDetailByEnrollment();

  return (
    <CustomCourseCardBlock onClick={() => navigateCourseDetail(course)} data-e2e="custom-course">
      <img src={course.extras.thumbnail?.url || thumbNailEmpty} alt={course.publicName || 'course image'} />
      <div className="content">
        <div className="category">{courseCategory?.name}</div>
        <div className="name">{course.publicName}</div>
        <div className="info">
          <span>{course.extras.totalCourseContentCount || 0}강의</span>
          <span className="dot"></span>
          <span>{writePlayTime(course.extras.totalPlayTime || 0)}</span>
        </div>
      </div>
    </CustomCourseCardBlock>
  );
};

export default CustomCourseCard;
