import styled from '@emotion/styled';
import React from 'react';

import type { OriginCourse } from '@/types/course.interface';
import type { MyNote } from '@/types/note.interface';

import thumbNailEmpty from '@/assets/images/thumbnail_empty.png';
import { NewPlayIcon, NoteIcon } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia, textEllipsis } from '@/styles/mixins';

export interface MyPageCourse extends OriginCourse {
  myNote?: MyNote;
}
type typeCourse = 'default' | 'note';

interface CourseBlock {
  course: MyPageCourse;
  type: typeCourse;
  onThumbnailClick: () => void;
  onDescriptionClick: () => void;
}

const CourseBlockWrapper = styled.li<{ type: typeCourse }>`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  margin-bottom: 25px;
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
      ${({ type }) => {
        return type === 'default' ? `width: 44px;  height: 44px;` : `width: 72px;  height: 72px; filter: blur(2px);`;
      }}
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
      top: 50%;
      left: 50%;
      display: flex;
      gap: 5px;
      align-items: center;
      transform: translate(-50%, -50%);
    }

    .note-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      gap: 5px;
      align-items: center;
      padding: 5px;
      border-radius: 16px;
      background: #00000080;
      transform: translate(-50%, -50%);

      svg {
        width: 16px;
        height: 16px;
      }

      .number-note {
        ${legacyTypographyMixin('XXSmall')};
        font-weight: 600;
        color: var(--color-white);
      }
    }
  }

  .right-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

const CourseBlock = ({ course, type, onThumbnailClick, onDescriptionClick }: CourseBlock) => {
  return (
    <CourseBlockWrapper key={course.id} data-e2e="recent-course" type={type}>
      <div className="thumbnail-wrapper" onClick={onThumbnailClick} data-e2e="recent-course-thumbnail">
        <div className="dimmed">
          <img
            src={course.extras.thumbnail?.url || thumbNailEmpty}
            alt={course.publicName || 'course image'}
            className="thumbnail"
          />
        </div>
        {course.myNote && course.myNote.extras.note.length ? (
          <div className="note-icon">
            <NoteIcon />
            <span className="number-note">
              {course.myNote.extras.note.length > 1000 ? '999+' : course.myNote.extras.note.length}
            </span>
          </div>
        ) : (
          <NewPlayIcon className="play-icon" />
        )}
      </div>
      <div className="right-content" onClick={onDescriptionClick} data-e2e="recent-course-description">
        <CourseTitle ellipsisLine={course.requiredCourse ? 1 : 2}>{course.publicName}</CourseTitle>
      </div>
    </CourseBlockWrapper>
  );
};

export default CourseBlock;
