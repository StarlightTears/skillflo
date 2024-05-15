import styled from '@emotion/styled';
import React from 'react';

import type { OriginCourse } from '@/types/course.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { Badge, NewPlayIcon } from '@/components';
import { dateFormat } from '@/shared/utils/date';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia, textEllipsis } from '@/styles/mixins';

interface RecentCourseCard {
  course: OriginCourse;
  onThumbnailClick: () => void;
  onDescriptionClick: () => void;
}

const RecentCourseCardWrapper = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  height: 7.2rem;
  cursor: pointer;

  .thumbnail-wrapper {
    position: relative;

    :hover {
      svg {
        fill: var(--color-surface-white);

        path {
          fill: var(--color-object-black);
        }
      }
    }

    .dimmed {
      position: relative;
      display: flex;

      :hover {
        ::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          inset: 0;
          border-radius: 0.6rem;
          background: var(--color-surface-black-20);
        }
      }
    }

    .thumbnail {
      object-fit: cover;
      width: 12.8rem;
      height: 7.2rem;
      border-radius: 0.6rem;

      ${homeMedia('large')} {
        width: 100%;
        height: 15.5rem;
      }

      ${homeMedia('medium')} {
        width: 100%;
        height: 100%;
      }
    }

    .play-icon {
      position: absolute;
      bottom: 10%;
      left: 5%;
    }
  }

  .right-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 14rem;

    span {
      align-self: flex-start;
    }

    ${homeMedia('large', 'medium')} {
      width: 100%;
    }

    ${homeMedia('small')} {
      width: 100%;
      min-width: 18rem;
    }
  }

  .date {
    ${legacyTypographyMixin('XSmall')};
    color: var(--color-text-gray);
    letter-spacing: -0.04rem;
  }

  ${homeMedia('large')} {
    flex-direction: column;
    width: 27.6rem;
    height: 23.7rem;
  }

  ${homeMedia('medium')} {
    flex-direction: column;
    width: calc((100% - 2.6rem) / 3);
    height: 100%;
  }
`;

const CourseTitle = styled.div<{ ellipsisLine: number }>`
  ${({ ellipsisLine }) => textEllipsis(ellipsisLine)}
  ${legacyTypographyMixin('Medium')};
  padding-bottom: 0.4rem;
  font-weight: 500;
  color: var(--color-text-black);

  :hover {
    text-decoration-line: underline;
  }
`;

const RecentCourseCard = ({ course, onThumbnailClick, onDescriptionClick }: RecentCourseCard) => {
  return (
    <RecentCourseCardWrapper key={course.id} data-e2e="recent-course">
      <div className="thumbnail-wrapper" onClick={onThumbnailClick} data-e2e="recent-course-thumbnail">
        <div className="dimmed">
          <img
            src={course.extras.thumbnail?.url || thumbNailEmpty}
            alt={course.publicName || 'course image'}
            className="thumbnail"
          />
        </div>
        <NewPlayIcon className="play-icon" />
      </div>
      <div className="right-content" onClick={onDescriptionClick} data-e2e="recent-course-description">
        {course.requiredCourse && <Badge>필수강의</Badge>}
        <CourseTitle ellipsisLine={course.requiredCourse ? 1 : 2}>{course.publicName}</CourseTitle>
        <div className="date">
          {dateFormat(
            course.requiredCourse
              ? course.requiredCourse.extras.requiredCourseEndedAt
              : course.product.extras.courseEndedAt
          )}
          까지 수강 가능
        </div>
      </div>
    </RecentCourseCardWrapper>
  );
};

export default RecentCourseCard;
