import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, SetStateAction } from 'react';

import type { Note } from '@/types/note.interface';

import { ArrowDown, Badge, Button, NoteSub, PartCourseContentActive } from '@/components';
import { useAppSelector, useCurrentMember, useErrorHandler, useModal } from '@/shared/hooks';
import { useClassroomNavigate, useClassroomNoteEditor, useClassroomParams } from '@/shared/hooks/classroom';
import { usePlayerCommand } from '@/shared/hooks/classroom/player';
import { getLogger } from '@/shared/utils/logger';
import { secondsToTime } from '@/shared/utils/time';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

const logger = getLogger('components', 'note-list-item');

interface NoteListItemProps {
  note: Note;
  theme?: ListItemTheme;
  courseId: number;
  productId: number;
  isShowPlayBtn?: boolean;
  setEditNote?: React.Dispatch<SetStateAction<Note | undefined>>;
}

type ListItemTheme = 'black' | 'white';

const NoteListItemBlock = styled.li<{ isOpenNote: boolean; listTheme: ListItemTheme }>`
  padding: 2rem 1.2rem;
  border-bottom: 0.1rem solid
    ${(props) => (props.listTheme === 'black' ? 'var(--legacy-color-gray-700)' : 'var(--legacy-color-gray-100)')};
  list-style: none;

  ${({ isOpenNote, listTheme }) => {
    if (!isOpenNote) return '';
    if (listTheme === 'black') return 'background-color: var(--legacy-color-gray-800)';
    if (listTheme === 'white') return 'background-color: var(--legacy-color-gray-50)';
    return '';
  }}
`;

const NoteListItemHeader = styled.header<{ listTheme: ListItemTheme }>`
  margin-bottom: 1rem;

  .part-info {
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
    ${legacyTypographyMixin('caption')}
    color: ${(props) =>
      props.listTheme === 'black' ? 'var(--legacy-color-gray-200)' : 'var(--legacy-color-gray-500)'};

    .part-title {
      ${textEllipsis()}
      width: calc(100% - 5.3rem);
      margin-left: 0.8rem;
    }
  }

  .grade-info {
    display: flex;
    ${legacyTypographyMixin('caption')}
    color: ${(props) =>
      props.listTheme === 'black' ? 'var(--legacy-color-gray-200)' : 'var(--legacy-color-gray-500)'};

    .sub-icon {
      margin-right: 0.4rem;
    }

    .grade-title {
      ${textEllipsis()}
    }
  }
`;

const NoteListItemContent = styled.div<{ listTheme: ListItemTheme }>`
  ${legacyTypographyMixin('body2')}

  .content-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    color: ${(props) => (props.listTheme === 'black' ? 'var(--color-white)' : 'var(--legacy-color-gray-900)')};
    cursor: pointer;

    svg {
      margin-left: 0.8rem;

      &.icon-on-unfloded {
        transform: rotate(180deg);
      }
    }
  }

  .content {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 0.1rem solid
      ${(props) => (props.listTheme === 'black' ? 'var(--legacy-color-gray-600)' : 'var(--legacy-color-gray-100)')};
    color: ${(props) =>
      props.listTheme === 'black' ? 'var(--legacy-color-gray-100)' : 'var(--legacy-color-gray-700)'};
    white-space: pre-wrap;
    word-break: break-all;

    .btn-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;

      .modify-btn-group {
        display: flex;
        gap: 0.4rem;
      }
    }
  }
`;

const badgeStyle = css`
  display: flex;
  justify-content: center;
  width: 4.5rem;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  width: auto;
`;

const ModifyButton = styled.div`
  width: 4.9rem;
  height: 3.2rem;
  padding: 0.8rem 1.4rem;
  font-weight: 700;
  color: var(--color-white);
  cursor: pointer;
  ${legacyTypographyMixin('caption')}
`;

const NoteListItem = ({
  note,
  courseId,
  productId,
  theme = 'black',
  isShowPlayBtn,
  setEditNote,
}: NoteListItemProps) => {
  const [isOpenNote, setIsOpenNote] = useState(false);
  const classroomNavigate = useClassroomNavigate();
  const { courseContentId } = useClassroomParams();
  const { setPlayerCommand } = usePlayerCommand();
  const videoProgressInstance = useAppSelector((state) => state.classroom.videoProgressInstance);
  const { member } = useCurrentMember();
  const { openModal, closeModal } = useModal();
  const { deleteNote } = useClassroomNoteEditor();
  const errorHandler = useErrorHandler();

  const confirmDeletionNote = () => {
    openModal({
      title: '노트 삭제',
      content: '노트를 삭제하시겠습니까?',
      onConfirm: async () => {
        await deleteNote(note);
        closeModal();
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return (
    <NoteListItemBlock isOpenNote={isOpenNote} listTheme={theme}>
      <NoteListItemHeader listTheme={theme}>
        <div className="part-info">
          <Badge css={badgeStyle} theme={theme === 'black' ? 'gray' : 'lightblue'} bgColorScale={600}>
            파트 {(note.partIndex || 0) + 1}
          </Badge>
          <div className="part-title">{note.partTitle}</div>
        </div>
        <div className="grade-info">
          <NoteSub className="sub-icon" />
          <div className="grade-title">{note.courseContentTitle}</div>
        </div>
      </NoteListItemHeader>
      <NoteListItemContent listTheme={theme}>
        <div className="content-info" onClick={() => setIsOpenNote(!isOpenNote)} data-e2e="note-item">
          {note.title}
          <ArrowDown className={isOpenNote ? 'icon-on-unfloded' : ''} />
        </div>
        {isOpenNote && (
          <div className="content">
            {note.content}
            <div className="btn-group">
              {isShowPlayBtn && (
                <Button
                  css={buttonStyle}
                  theme="primary"
                  onClick={() => {
                    if (courseContentId !== note.courseContentId) {
                      classroomNavigate({
                        productId,
                        courseId,
                        courseContentId: note.courseContentId,
                        query: {
                          position: note.position,
                        },
                      });
                    } else {
                      videoProgressInstance?.updateLastVideoProgress({
                        errorCallback: (error) => {
                          logger.error(
                            '노트의 저장위치로 재생시 시청기록 업데이트를 실패했습니다.',
                            { memberId: member?.id, productId, courseId, courseContentId },
                            error
                          );
                          errorHandler(error);
                        },
                      });
                      setPlayerCommand({ type: 'play', position: note.position });
                    }
                  }}
                  data-e2e="note-play-btn"
                >
                  {secondsToTime(Math.floor(note.position))}
                  <PartCourseContentActive />
                </Button>
              )}
              {theme === 'black' && (
                <div className="modify-btn-group">
                  <ModifyButton onClick={() => setEditNote?.(note)}>수정</ModifyButton>
                  <ModifyButton onClick={confirmDeletionNote}>삭제</ModifyButton>
                </div>
              )}
            </div>
          </div>
        )}
      </NoteListItemContent>
    </NoteListItemBlock>
  );
};

export default NoteListItem;
