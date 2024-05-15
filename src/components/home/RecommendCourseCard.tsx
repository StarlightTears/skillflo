import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { OriginCourse } from '@/types/course.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { useCourseCategory } from '@/shared/hooks/category';
import { writePlayTime } from '@/shared/utils/time';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis, homeMedia } from '@/styles/mixins';

interface RecommendCourseCardProps {
  course: OriginCourse;
}

const RecommendCourseCardBlock = styled.div`
  position: relative;
  top: 0;
  width: 15.4rem;
  height: 18.7rem;
  margin-top: 1.2rem;
  cursor: pointer;
  transition: top 0.15s ease-in-out;

  :hover {
    top: -0.8rem;
  }

  ${homeMedia('medium')} {
    width: 16rem;
    height: 19rem;
  }

  ${homeMedia('large', 'xlarge')} {
    width: 20.3rem;
    height: 21.4rem;
  }

  img {
    width: 100%;
    border-radius: 0.8rem;
  }

  .content {
    padding-top: 1.2rem;
    padding-right: 1.2rem;

    .category {
      margin-bottom: 0.4rem;
      color: var(--color-text-gray);
      ${legacyTypographyMixin('XXSmall')};
    }

    .name {
      margin-bottom: 1.2rem;
      font-weight: 500;
      ${legacyTypographyMixin('Small')};
      ${textEllipsis(2)};
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

const RecommendCourseCard = ({ course }: RecommendCourseCardProps) => {
  const navigate = useNavigate();
  const courseCategory = useCourseCategory(course);

  return (
    <RecommendCourseCardBlock onClick={() => navigate(`/course/${course.id}`)} data-e2e="recommend">
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
    </RecommendCourseCardBlock>
  );
};

export default RecommendCourseCard;
