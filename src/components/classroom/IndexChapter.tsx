import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import type { CourseChapter } from '@/types/course.interface';

import { ClassroomFold, ClassroomUnfold, ClassroomIndexContent, ClassroomIndexExamLink } from '@/components';
import { useToggle } from '@/shared/hooks';
import { useChapterExamList, useClassroomExamList, useClassroomParams } from '@/shared/hooks/classroom';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { textEllipsis } from '@/styles/mixins';

interface ClassroomIndexChapterProps {
  partId: string;
  chapter: CourseChapter;
}

const IndexChapterBlock = styled.div`
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 0.05rem solid var(--legacy-color-gray-600);
  }
`;

const ChapterInfo = styled.div<{ isOpenChapter: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  ${legacyTypographyMixin('body2')}
  font-weight: 700;

  ${({ isOpenChapter }) => {
    return isOpenChapter ? `color: var(--color-white);` : `color: var(--legacy-color-gray-300);`;
  }}

  div {
    ${textEllipsis()}
    width: calc(100% - 1.6rem);
  }
`;

const CourseContentListBlock = styled.div`
  padding: 0.8rem;
`;

const ClassroomIndexChapter = ({ partId, chapter }: ClassroomIndexChapterProps) => {
  const { courseContentId, examId } = useClassroomParams();

  const [isOpenChapter, toggleContentList] = useToggle();
  const chapterExamList = useChapterExamList(partId, chapter.id);

  const chapterContentIdList = chapter.CONTENT.map((content) => content.courseContentId);
  const { data: examList } = useClassroomExamList();
  // * part와 part의 서브 컨텐츠들의 exam id 목록
  const allChapterExamIdList =
    examList
      ?.filter(({ extras }) => extras.partId === partId && extras.chapterId === chapter.id)
      .map((exam) => exam.id) || [];

  useEffect(() => {
    if (isOpenChapter) return;

    if (chapterContentIdList.includes(courseContentId) || allChapterExamIdList.includes(examId)) {
      toggleContentList();
    }
  }, [courseContentId, examId, chapterContentIdList.join(','), allChapterExamIdList.join(',')]);

  return (
    <IndexChapterBlock>
      <ChapterInfo isOpenChapter={isOpenChapter} onClick={toggleContentList}>
        <div>{chapter.title}</div>
        {isOpenChapter ? <ClassroomFold /> : <ClassroomUnfold />}
      </ChapterInfo>
      {isOpenChapter && (
        <CourseContentListBlock>
          {chapter.CONTENT.map((content) => (
            <ClassroomIndexContent key={content.courseContentId} content={content} />
          ))}
          {!!chapterExamList.length &&
            chapterExamList.map((chapterExam) => <ClassroomIndexExamLink key={chapter.id} exam={chapterExam} />)}
        </CourseContentListBlock>
      )}
    </IndexChapterBlock>
  );
};

export default ClassroomIndexChapter;
