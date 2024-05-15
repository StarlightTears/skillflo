import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import ClassroomContentPlayer from './ContentPlayer';
import ClassroomExam from './Exam/Layout';

import { useClassroomCourse } from '@/shared/hooks/classroom';

interface ClassroomContentMainProps {
  className?: string;
}

const ClassroomContentMain = ({ className }: ClassroomContentMainProps) => {
  const { isMeetCourse } = useClassroomCourse();
  const { courseContentId, examId } = useParams();

  return (
    <section className={className}>
      {!isMeetCourse ? (
        <>
          {courseContentId && <ClassroomContentPlayer />}
          {examId && <ClassroomExam />}
        </>
      ) : (
        <Outlet />
      )}
    </section>
  );
};

export default ClassroomContentMain;
