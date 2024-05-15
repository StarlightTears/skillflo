import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { Note } from '@/types/note.interface';

import { Button, CloseLarge, Input, TextArea } from '@/components';
import { useAppSelector } from '@/shared/hooks';
import { useClassroomNoteEditor } from '@/shared/hooks/classroom';
import { useChannelTalk } from '@/shared/hooks/useChannelTalk';
import { secondsToTime } from '@/shared/utils/time';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia } from '@/styles/mixins';

interface NoteEditorProps {
  isOpenNoteEditor: boolean;
  editNote: Note | undefined;
  onCloseNoteEditor: () => void;
}

const NoteEditorBlock = styled.div<{ isOpenNoteEditor: boolean }>`
  position: absolute;
  top: ${({ isOpenNoteEditor }) => (isOpenNoteEditor ? '7.2rem' : '100vh')};
  left: 0;
  z-index: var(--z-classroom-note-editor);
  width: 100%;
  height: calc(var(--vh) - 7.2rem);
  padding: 2.4rem 1.6rem 2.8rem;
  border-radius: 1rem 1rem 0 0;
  background-color: var(--color-white);
  color: var(--color-black);
  transition: top ease 300ms;

  ${classroomMedia('small', 'medium')} {
    position: fixed;
  }
`;

const NoteEditorHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  ${legacyTypographyMixin('headline5')}
  font-weight: 700;

  svg {
    cursor: pointer;
  }
`;

const NoteEditorContent = styled.section`
  overflow-y: auto;
  height: calc(100% - 12.8rem);
  padding: 0.1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  textarea {
    min-height: 12.8rem;
    margin-top: 1.6rem;
  }
`;

const NoteEditorFooter = styled.footer`
  position: absolute;
  bottom: 2.8rem;
  width: calc(100% - 3.2rem);
`;

const NoteEditor = ({ isOpenNoteEditor, editNote, onCloseNoteEditor }: NoteEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createNote, modifyNote } = useClassroomNoteEditor();
  const { position } = useAppSelector((state) => state.classroom.playerProgress);
  const noteCreatedAt = secondsToTime(Math.floor(position));
  const { showChannelTalkButton, hideChannelTalkButton } = useChannelTalk();

  const clearNoteForm = () => {
    setTitle('');
    setContent('');
  };

  const closeNoteEditor = () => {
    clearNoteForm();
    onCloseNoteEditor();
  };

  const setNote = () => {
    if (editNote) {
      modifyNote({ ...editNote, title, content, updatedAt: new Date() }, closeNoteEditor);
      return;
    }
    createNote(title, content, position, closeNoteEditor);
  };

  const setVhCssVariable = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', setVhCssVariable);
    setVhCssVariable();

    return () => window.removeEventListener('resize', setVhCssVariable);
  }, []);

  useEffect(() => {
    if (!editNote) return;

    setTitle(editNote.title);
    setContent(editNote.content);
  }, [editNote]);

  useEffect(() => {
    if (isOpenNoteEditor) {
      hideChannelTalkButton();
    } else {
      showChannelTalkButton();
    }
  }, [isOpenNoteEditor]);

  return (
    <NoteEditorBlock isOpenNoteEditor={isOpenNoteEditor}>
      {isOpenNoteEditor && (
        <Global
          styles={css`
            :root body {
              overflow: hidden;
              height: 100vh;
            }
          `}
        />
      )}
      <NoteEditorHeader>
        노트
        <CloseLarge onClick={closeNoteEditor} />
      </NoteEditorHeader>
      <NoteEditorContent>
        <Input
          placeholder="제목을 입력하세요 (30자 이내)"
          maxLength={30}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextArea
          placeholder="2000자까지 입력 가능합니다."
          maxLength={2000}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          autoresize
        />
      </NoteEditorContent>
      <NoteEditorFooter>
        <Button theme="primary" size="large" disabled={!(title && content)} onClick={setNote}>
          {editNote ? '저장하기' : `${noteCreatedAt}에 노트 작성하기`}
        </Button>
      </NoteEditorFooter>
    </NoteEditorBlock>
  );
};

export default NoteEditor;
