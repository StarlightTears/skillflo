import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import type { CoursePart } from '@/types/course.interface';

import {
  Badge,
  ClassroomFold,
  ClassroomUnfold,
  ClassroomIndexChapter,
  ClassroomIndexContent,
  ClassroomIndexExamLink,
} from '@/components';
import { useToggle } from '@/shared/hooks';
import {
  useClassroomExamList,
  useClassroomParams,
  useCompletedContentList,
  usePartExamList,
} from '@/shared/hooks/classroom';
import { getPartContentIdList } from '@/shared/utils/course';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { classroomMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface IndexPartProps {
  part: CoursePart;
  index: number;
}

const IndexPartBlock = styled.div<{ isOpenList: boolean }>`
  border-radius: 1rem;
  cursor: pointer;

  ${({ isOpenList }) =>
    isOpenList
      ? `
    border: none;
    background-color: var(--legacy-color-gray-800);
  `
      : `
    border: 0.1rem solid var(--legacy-color-gray-700);
    background-color: var(--legacy-color-gray-900);
  `}

  ${classroomMedia('small', 'medium')} {
    max-width: 38.2rem;
  }
`;

const PartInfo = styled.header<{ isOpenList: boolean }>`
  padding: 1.6rem;
  border-bottom: ${({ isOpenList }) => (isOpenList ? '0.05rem solid var(--legacy-color-gray-600)' : 'none')};

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    ${typographyMixin('p3')}

    &-badge {
      margin-right: 0.8rem;
    }

    &-complete {
      margin-right: 0.8rem;
      margin-left: auto;
    }
  }

  .title {
    ${legacyTypographyMixin('button')}
    ${textEllipsis()}
    font-weight: 700;
  }
`;

const CourseContentListBlock = styled.div`
  padding: 0.8rem;

  & + & {
    padding-top: 0;
  }

  &:not(:last-of-type) {
    padding-bottom: 0;
  }
`;

const getStateLabel = (isWatching: boolean, isCompleted: boolean) => {
  if (isWatching) return '학습중';
  return isCompleted ? '학습완료' : '';
};

const usePartContentInfo = (part: CoursePart) => {
  const contentIdList = getPartContentIdList(part);
  const { data: completedContentList } = useCompletedContentList();
  const completedContentCount =
    completedContentList?.filter(
      (completedContent) =>
        contentIdList.includes(completedContent.courseContentId) && completedContent.isProgressCompleted
    ).length || 0;

  return {
    partContentIdList: contentIdList,
    completedContentCount: completedContentCount,
  };
};

const ClassroomIndexPart = ({ part, index }: IndexPartProps) => {
  const { courseContentId, examId } = useClassroomParams();

  const [isOpenList, toggleList] = useToggle();
  const partExamList = usePartExamList(part.id);

  const { partContentIdList, completedContentCount } = usePartContentInfo(part);
  const { data: examList } = useClassroomExamList();
  // * part와 part의 서브 컨텐츠들의 exam id 목록
  const allPartExamIdList = examList?.filter((exam) => exam.extras.partId === part.id).map((exam) => exam.id) || [];

  const isWatching = partContentIdList.includes(courseContentId);

  useEffect(() => {
    if (isOpenList) return;

    if (partContentIdList.includes(courseContentId) || allPartExamIdList.includes(examId)) {
      toggleList();
    }
  }, [courseContentId, examId, partContentIdList.join(','), allPartExamIdList.join(',')]);

  return (
    <IndexPartBlock isOpenList={isOpenList}>
      <PartInfo isOpenList={isOpenList} onClick={toggleList}>
        <div className="header">
          <Badge className="header-badge" theme={isWatching ? 'blue' : 'gray'} bgColorScale={isWatching ? 600 : 500}>
            파트{index + 1}
          </Badge>
          {getStateLabel(isWatching, completedContentCount === partContentIdList.length)}
          <span className="header-complete">
            {completedContentCount} / {partContentIdList.length}
          </span>
          {isOpenList ? <ClassroomFold /> : <ClassroomUnfold />}
        </div>
        <h1 className="title">{part.title}</h1>
      </PartInfo>
      {isOpenList && (
        <>
          {part.CHAPTER?.length ? (
            part.CHAPTER.map((chapter) => <ClassroomIndexChapter key={chapter.id} partId={part.id} chapter={chapter} />)
          ) : (
            <CourseContentListBlock>
              {part.CONTENT?.map((content) => (
                <ClassroomIndexContent key={content.courseContentId} content={content} />
              ))}
            </CourseContentListBlock>
          )}
          {!!partExamList.length && (
            <CourseContentListBlock>
              {partExamList.map((partExam) => (
                <ClassroomIndexExamLink key={partExam.id} exam={partExam} />
              ))}
            </CourseContentListBlock>
          )}
        </>
      )}
    </IndexPartBlock>
  );
};

export default ClassroomIndexPart;
