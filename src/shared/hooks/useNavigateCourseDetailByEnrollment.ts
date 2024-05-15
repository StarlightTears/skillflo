import { useNavigate } from 'react-router-dom';

import type { OriginCourse } from '@/types/course.interface';

export const useNavigateCourseDetailByEnrollment = () => {
  const navigate = useNavigate();

  return (course: OriginCourse) => {
    // 수강신청 승인된 강의는 강의상세로 이동, 그외 공통상세로 이동
    if (course.enrollment && course.enrollment.state === 'COMPLETED') {
      navigate(`/course-detail/${course.product.id}/${course.id}`);
      return;
    }
    navigate(`/course/${course.id}`);
  };
};
