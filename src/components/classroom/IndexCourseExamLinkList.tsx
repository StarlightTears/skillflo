import styled from '@emotion/styled';
import React from 'react';

import { ClassroomIndexExamLink } from '@/components';
import { useClassroomExamList } from '@/shared/hooks/classroom';

const ClassroomIndexCourseExamLinkListBlock = styled.div`
  border-radius: 0.6rem;
  background-color: var(--legacy-color-gray-800);
`;

const ClassroomIndexCourseExamLinkList = () => {
  const { data: examList } = useClassroomExamList();

  const courseExamList =
    examList?.filter(({ extras }) => {
      return !(extras.partId || extras.chapterId || extras.courseContentId);
    }) || [];

  if (!courseExamList.length) return null;

  return (
    <>
      {courseExamList.map((courseExam) => (
        <ClassroomIndexCourseExamLinkListBlock key={courseExam.id}>
          <ClassroomIndexExamLink exam={courseExam} />
        </ClassroomIndexCourseExamLinkListBlock>
      ))}
    </>
  );
};

export default ClassroomIndexCourseExamLinkList;
