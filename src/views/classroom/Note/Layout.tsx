import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { Note } from '@/types/note.interface';

import { Button, Plus, ClassroomEmptyNote, NoteList, NoteEditor } from '@/components';
import { useClassroomNoteList, useClassroomParams } from '@/shared/hooks/classroom';
import { usePlayerCommand } from '@/shared/hooks/classroom/player';
import { classroomMedia } from '@/styles/mixins';

const NoteBtnStyle = css`
  display: flex;
  align-items: center;

  svg {
    margin-right: 9.6rem;
  }
`;

const NoteHeader = styled.header`
  padding: 0 1.6rem 2rem;
  border-bottom: 0.1rem solid var(--legacy-color-gray-800);
`;

const NoteContent = styled.div`
  padding: 0 1.6rem;

  ${classroomMedia('large')} {
    overflow-y: auto;
    height: calc(100vh - 14.4rem);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NoteDimmed = styled.div<{ isOpenNoteEditor: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ isOpenNoteEditor }) => (isOpenNoteEditor ? 'var(--z-classroom-note-dimmed);' : '-1')};
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: ${({ isOpenNoteEditor }) => (isOpenNoteEditor ? '0.8' : '0')};
  transition: opacity ease 300ms;

  ${classroomMedia('small', 'medium')} {
    position: fixed;
  }
`;

const NoteLayout = () => {
  const [isOpenNoteEditor, setIsOpenNoteEditor] = useState(false);
  const [editNote, setEditNote] = useState<Note | undefined>(undefined);
  const noteList = useClassroomNoteList();
  const { courseId, productId, courseContentId } = useClassroomParams();
  const { setPlayerCommand } = usePlayerCommand();

  const closeNoteEditor = () => {
    setIsOpenNoteEditor(false);
    setEditNote(undefined);
  };

  useEffect(() => {
    if (editNote) {
      setIsOpenNoteEditor(true);
    } else {
      setIsOpenNoteEditor(false);
    }
  }, [editNote]);

  return (
    <section>
      <NoteHeader>
        <Button
          css={NoteBtnStyle}
          theme="primary"
          size="xmedium"
          onClick={() => {
            if (!courseContentId) return;
            setIsOpenNoteEditor(!isOpenNoteEditor);
            setPlayerCommand({ type: 'pause' });
          }}
        >
          <Plus />
          노트 새로 추가하기
        </Button>
      </NoteHeader>
      <NoteContent>
        {noteList.length > 0 ? (
          <NoteList
            noteList={noteList}
            courseId={courseId}
            productId={productId}
            isShowPlayBtn={true}
            setEditNote={setEditNote}
          />
        ) : (
          <ClassroomEmptyNote />
        )}
      </NoteContent>
      <NoteDimmed isOpenNoteEditor={isOpenNoteEditor} onClick={closeNoteEditor} />
      <NoteEditor isOpenNoteEditor={isOpenNoteEditor} onCloseNoteEditor={closeNoteEditor} editNote={editNote} />
    </section>
  );
};

export default NoteLayout;
