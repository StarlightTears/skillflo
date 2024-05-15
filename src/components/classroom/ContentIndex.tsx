import styled from '@emotion/styled';
import React from 'react';

import type { CoursePart } from '@/types/course.interface';

import { ClassroomIndexCourseExamLinkList, ClassroomIndexPart } from '@/components';
import { useClassroomCourse } from '@/shared/hooks/classroom';

const IndexBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 1.6rem;
`;

const ClassroomContentIndex = () => {
  const { data: course } = useClassroomCourse();

  return (
    <IndexBlock>
      {course?.extras.contents?.map((part, index) => (
        <ClassroomIndexPart key={part.id} part={part as unknown as CoursePart} index={index} />
      ))}
      <ClassroomIndexCourseExamLinkList />
    </IndexBlock>
  );
};

export default ClassroomContentIndex;
