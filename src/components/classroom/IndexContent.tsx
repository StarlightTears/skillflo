import React from 'react';
import { useParams } from 'react-router-dom';

import { DateUtil } from '@day1co/pebbles';

import type { CourseContent } from '@/types/course.interface';

import { ClassroomIndexLink, ClassroomIndexExamLink } from '@/components';
import {
  useClassroomCourseContent,
  useClassroomNavigate,
  useCompletedContentList,
  useContentExamList,
} from '@/shared/hooks/classroom';

interface ClassroomIndexContentProps {
  content: CourseContent;
}

const ClassroomIndexContent = ({ content }: ClassroomIndexContentProps) => {
  const contentId = content.courseContentId;
  const classroomNavigate = useClassroomNavigate();
  const contentExamList = useContentExamList(contentId);

  const part = useClassroomCourseContent(contentId);
  const { data: contentCompletedList } = useCompletedContentList();
  const isCompleted =
    contentCompletedList?.find((contentCompleted) => contentCompleted.courseContentId === contentId)
      ?.isProgressCompleted || false;

  const params = useParams();
  const currentContentId = Number(params.courseContentId);
  const isSelected = contentId === currentContentId;

  return (
    <>
      <ClassroomIndexLink
        title={content.courseContentName}
        type="CONTENT"
        isCompleted={isCompleted}
        isSelected={isSelected}
        dataText={DateUtil.getTimeStringFromSeconds(part?.extras.playtime ?? 0)}
        onClickLink={() => classroomNavigate({ courseContentId: contentId })}
      />
      {!!contentExamList.length &&
        contentExamList.map((contentExam) => <ClassroomIndexExamLink key={contentExam.id} exam={contentExam} />)}
    </>
  );
};

export default ClassroomIndexContent;
