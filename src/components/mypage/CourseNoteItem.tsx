import { css } from '@emotion/react';
import React, { MouseEventHandler } from 'react';

import type { CourseNote, Note } from '@/types/note.interface';

import { ArrowRight, CourseIntroWithExtra } from '@/components';
import { useCourseCategory } from '@/shared/hooks/category';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface MypageCourseNoteItemProps {
  title: string;
  thumbnailUrl: string;
  productName: string;
  noteList: Note[];
  course: CourseNote;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const mypageCourseNoteItemStyle = css`
  .note-popup-opener {
    width: 100%;
    height: 100%;
    cursor: pointer;

    .text {
      display: flex;
      align-items: center;
      ${legacyTypographyMixin('body2')}
    }
  }
`;

const MypageCourseNoteItem = ({
  title,
  thumbnailUrl,
  productName,
  noteList,
  course,
  onClick,
}: MypageCourseNoteItemProps) => {
  const courseCategory = useCourseCategory(course);

  return (
    <CourseIntroWithExtra
      title={title}
      thumbnailUrl={thumbnailUrl}
      categoryName={courseCategory?.name || ''}
      productName={productName}
      course={course}
      extraSlot={
        <div className="note-popup-opener">
          <span className="text">
            작성 노트 수: {noteList.length}개
            <ArrowRight />
          </span>
        </div>
      }
      onClick={onClick}
      css={mypageCourseNoteItemStyle}
    />
  );
};

export default MypageCourseNoteItem;
