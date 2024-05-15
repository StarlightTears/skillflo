import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { isMobile } from '@day1co/browser-util';
import type { Tab } from '@fastcampus/fastcomponents';

import {
  ClassroomContentIndex,
  ClassroomMeetContentIndex,
  TabList,
  ClassroomQuestionAnswer,
  ClassroomAIChatWrapper,
} from '@/components';
import { useAppSelector, useViewport } from '@/shared/hooks';
import { useClassroomCourse, useClassroomNoteList, useClassroomParams } from '@/shared/hooks/classroom';
import { useProduct } from '@/shared/hooks/useProduct';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia } from '@/styles/mixins';
import CodeEditor from '@/views/classroom/CodeEditor/Layout';
import JupyterLab from '@/views/classroom/JupyterLab/Layout';
import Note from '@/views/classroom/Note/Layout';

interface AsideProps {
  className?: string;
}

interface ClassroomAsideBlockStyleProps {
  selectedTab: Tab;
}

const ClassroomAsideBlock = styled.aside<ClassroomAsideBlockStyleProps>`
  position: relative;
  flex: 0 0 ${({ selectedTab }) => (selectedTab.id === JUPYTER_TAB.id ? '60vw' : '44rem')};
  overflow: hidden;
  padding: 2.4rem 0 5.2rem;
  background-color: var(--legacy-color-gray-900);

  ${classroomMedia('small', 'medium')} {
    flex: 0 0 auto;
    border-top: 0.1rem solid var(--legacy-color-gray-800);
  }

  ${classroomMedia('medium')} {
    width: 41.4rem;
    margin: 0 auto;
  }

  ${classroomMedia('large')} {
    border: 0.1rem solid var(--legacy-color-gray-800);
  }
`;

const ClassroomAsideHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 1.6rem;
`;

const ClassroomAsideWrapper = styled.div`
  display: flex;
`;

const ClassroomAsideContent = styled.div<{ isFloatingChatOpened: boolean }>`
  padding: 2rem 0;

  ${classroomMedia('large')} {
    overflow-y: ${({ isFloatingChatOpened }) => (isFloatingChatOpened ? 'hidden' : 'auto')};
    height: calc(100vh - 7.6rem);
  }
`;

const NoteCountBadge = styled.span`
  ${legacyTypographyMixin('label')};
  margin-left: 0.4rem;
  font-weight: 700;
`;

const INDEX_TAB = {
  id: 'part-list',
  name: '강의목차',
};

const EDITOR_TAB = {
  id: 'code-editor',
  name: '코드에디터',
};

const NOTE_TAB = {
  id: 'note',
  name: '강의노트',
};

const JUPYTER_TAB = {
  id: 'jupyter-lab',
  name: '주피터랩',
};

const ClassroomAside = ({ className }: AsideProps) => {
  const { productId } = useClassroomParams();
  const { isLargeViewport } = useViewport('classroom');
  const isFloatingChatOpened = useAppSelector((state) => state.classroom.isFloatingChatOpened);
  const { data: course, isLoading, isMeetCourse } = useClassroomCourse();

  const isCodeEditorActive = course?.extras.isUseCodeRunner;
  // TODO: course api 업데이트 시 주피터랩 활성화 여부 대입 필요
  const isJupyterLabActive = false;

  const tabList = (() => {
    if (!isCodeEditorActive && !isJupyterLabActive) {
      return [INDEX_TAB, NOTE_TAB];
    }
    if (isCodeEditorActive && !isJupyterLabActive) {
      return [INDEX_TAB, EDITOR_TAB, NOTE_TAB];
    }
    if (!isCodeEditorActive && isJupyterLabActive) {
      return [INDEX_TAB, JUPYTER_TAB, NOTE_TAB];
    }
    if (isCodeEditorActive && isJupyterLabActive) {
      return [INDEX_TAB, EDITOR_TAB, JUPYTER_TAB, NOTE_TAB];
    }
    return [INDEX_TAB, EDITOR_TAB, NOTE_TAB];
  })();

  const filteredTabByDevice = tabList
    .filter((tab) => (tab.id !== INDEX_TAB.id ? !isLoading && !isMeetCourse : true))
    .filter((tab) => {
      if (tab.id === EDITOR_TAB.id || tab.id === JUPYTER_TAB.id) {
        const isDesktop = !isMobile;
        return isDesktop && isLargeViewport;
      }
      return true;
    });

  const [selectedTab, setSelectedTab] = useState<Tab>(filteredTabByDevice[0]);
  const noteList = useClassroomNoteList();
  const { data: product } = useProduct(productId);

  useEffect(() => {
    if (selectedTab.id === EDITOR_TAB.id || selectedTab.id === JUPYTER_TAB.id) {
      setSelectedTab(INDEX_TAB);
    }
  }, [isLargeViewport]);

  return (
    <ClassroomAsideBlock className={className} selectedTab={selectedTab}>
      <ClassroomAsideHeader>
        <ClassroomAsideWrapper>
          <TabList
            tabList={filteredTabByDevice}
            selectedTab={selectedTab}
            onTabClick={(tab: Tab) => {
              setSelectedTab(tab);
            }}
          />
          {!isMeetCourse && <NoteCountBadge>{noteList.length}</NoteCountBadge>}
        </ClassroomAsideWrapper>
        <ClassroomAIChatWrapper isJupyterTab={selectedTab.id === JUPYTER_TAB.id} />
      </ClassroomAsideHeader>
      <ClassroomAsideContent isFloatingChatOpened={isFloatingChatOpened}>
        {selectedTab.id === INDEX_TAB.id && (
          <>{isMeetCourse ? <ClassroomMeetContentIndex /> : <ClassroomContentIndex />}</>
        )}
        {selectedTab.id === EDITOR_TAB.id && <CodeEditor />}
        {selectedTab.id === NOTE_TAB.id && <Note />}
        {selectedTab.id === JUPYTER_TAB.id && <JupyterLab />}
      </ClassroomAsideContent>
      {isLargeViewport && selectedTab.id === INDEX_TAB.id && product?.extras.isQnaBoardExposure && (
        <ClassroomQuestionAnswer />
      )}
    </ClassroomAsideBlock>
  );
};

export default ClassroomAside;
