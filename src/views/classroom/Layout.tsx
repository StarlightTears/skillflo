import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

import ClassroomAside from './Aside';

import { useAppSelector } from '@/shared/hooks';
import {
  useClassroomCourse,
  useClassroomParams,
  useClassroomReplaceCourseContentInUrl,
} from '@/shared/hooks/classroom';
import { classroomMedia } from '@/styles/mixins';
import ClassroomContentHeader from '@/views/classroom/ContentHeader';
import ClassroomContentInfo from '@/views/classroom/ContentInfo';
import ClassroomContentMain from '@/views/classroom/ContentMain';

const ClassroomLayoutBlock = styled.section<{ isFloatingChatOpened: boolean }>`
  display: flex;
  flex-direction: column;
  overflow-y: ${({ isFloatingChatOpened }) => (isFloatingChatOpened ? 'hidden' : 'auto')};

  width: 100vw;
  height: 100vh;

  background-color: var(--color-black);
  color: var(--color-white);

  ${classroomMedia('large')} {
    flex-direction: row;

    .aside:not(.opened) {
      display: none;
    }
  }
`;

const ClassroomContent = styled.div<{ isExamContent: boolean }>`
  position: relative;

  ${classroomMedia('large')} {
    flex: 1 1 auto;

    .content-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: transform 0.3s ease-out;
      transform: ${({ isExamContent }) => (isExamContent ? 'translateY(0)' : 'translateY(-100%);')};
    }

    &:hover,
    &.meet-classroom {
      .content-header {
        transform: translateY(0);
      }
    }
  }
`;

const globalStyleForChannelTalkInClassroom = css`
  #ch-plugin-entry {
    ${classroomMedia('small', 'medium')} {
      display: none;
    }
  }
`;

const ClassroomLayout = () => {
  const { examId } = useClassroomParams();
  const isOpenAside = useAppSelector((state) => state.classroom.isOpenAside);
  const isFloatingChatOpened = useAppSelector((state) => state.classroom.isFloatingChatOpened);
  useClassroomReplaceCourseContentInUrl();
  const { isMeetCourse } = useClassroomCourse();

  return (
    <>
      <Global styles={globalStyleForChannelTalkInClassroom} />
      <ClassroomLayoutBlock isFloatingChatOpened={isFloatingChatOpened}>
        <ClassroomContent isExamContent={!isNaN(examId)} className={isMeetCourse ? 'meet-classroom' : ''}>
          <ClassroomContentHeader className="content-header" />
          <ClassroomContentMain />
          <ClassroomContentInfo isOpenAside={isOpenAside} />
        </ClassroomContent>
        <ClassroomAside className={classNames('aside', { opened: isOpenAside })} />
      </ClassroomLayoutBlock>
    </>
  );
};

export default ClassroomLayout;
