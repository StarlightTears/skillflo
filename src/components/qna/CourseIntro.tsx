import React from 'react';

import { useQnaCourse } from './hooks';

import { CourseIntro } from '@/components';
import { useCourseCategory } from '@/shared/hooks/category';

const QnaCourseIntro = () => {
  const { data: course } = useQnaCourse();
  const courseCategory = useCourseCategory(course);

  if (!course) return null;

  return (
    <CourseIntro
      title={course.publicName}
      thumbnailUrl={course.extras.thumbnail?.url || ''}
      categoryName={courseCategory?.name || ''}
      course={course}
      disableCursorPointer
    />
  );
};

export default QnaCourseIntro;
