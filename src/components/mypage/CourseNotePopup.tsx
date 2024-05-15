import styled from '@emotion/styled';
import React from 'react';

import type { Note } from '@/types/note.interface';

import { NoteList } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface MypageCourseNotePopupProps {
  courseTitle: string;
  noteList: Note[];
  courseId: number;
  productId: number;
  isShowPlayBtn: boolean;
}

const MypageCourseNotePopupBlock = styled.div`
  overflow: auto;
  max-height: 50rem;

  &::-webkit-scrollbar {
    display: none;
  }

  & > ul > li {
    &:last-child {
      border-bottom: none;
    }
  }

  .course-note-header {
    margin: 2rem 0;

    .course-title {
      margin: 1.2rem 0 0;

      ${legacyTypographyMixin('body1')}
      font-weight: 700;
      color: var(--legacy-color-gray-900);
    }

    .note-count {
      ${legacyTypographyMixin('caption')}
      .title {
        margin: 0 0.8rem 0 0;
        color: var(--legacy-color-gray-500);
      }

      .count {
        font-weight: 700;
        color: var(--color-blue-600);
      }
    }
  }
`;

const MypageCourseNotePopup = ({
  courseTitle,
  noteList,
  courseId,
  productId,
  isShowPlayBtn,
}: MypageCourseNotePopupProps) => {
  return (
    <MypageCourseNotePopupBlock>
      <div className="course-note-header">
        <p className="course-title">{courseTitle}</p>
        <div className="note-count">
          <span className="title">작성노트</span>
          <span className="count">{noteList.length}개</span>
        </div>
      </div>
      <NoteList
        noteList={noteList}
        courseId={courseId}
        productId={productId}
        isShowPlayBtn={isShowPlayBtn}
        theme="white"
      />
    </MypageCourseNotePopupBlock>
  );
};

export default MypageCourseNotePopup;
