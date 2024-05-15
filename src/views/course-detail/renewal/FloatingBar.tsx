import styled from '@emotion/styled';
import React from 'react';

import { BookmarkOffMedium, BookmarkOnMedium, PlaySmall, VerticalLine } from '@/components';
import Button from '@/components/common-renewal/Button';
import { useCourseDetail } from '@/shared/hooks/course-detail';
import { useBookmark } from '@/shared/hooks/useBookmark';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { homeMedia } from '@/styles/mixins';

interface FloatingBarProps {
  enterClassroom: () => Promise<void>;
}

const CourseDetailFloatingBarBlock = styled.section`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 10.8rem;
  padding: 1.2rem 1.6rem 4rem;
  border-top: 0.05rem solid var(--color-gray-200);
  background-color: var(--color-white);

  svg {
    margin-left: 1.2rem;
  }

  .fc-button {
    flex: 1;
  }

  ${homeMedia('large', 'xlarge')} {
    display: none;
  }
`;

const CourseDetailFloatingBar = ({ enterClassroom }: FloatingBarProps) => {
  const { data: courseData } = useCourseDetail();
  const { isBookmarkCourse, toggleBookmark } = useBookmark();

  if (!courseData) return;

  const { isOngoingCourse } = getCourseEnrollmentState(courseData.courseDetail);

  return (
    <CourseDetailFloatingBarBlock>
      {isBookmarkCourse ? (
        <BookmarkOnMedium onClick={toggleBookmark} />
      ) : (
        <BookmarkOffMedium onClick={toggleBookmark} />
      )}
      <VerticalLine height={4} margin={24} />
      <Button
        theme="primary"
        size="fixed"
        rightIcon={<PlaySmall />}
        disabled={!isOngoingCourse}
        onClick={enterClassroom}
      >
        강의 보기
      </Button>
    </CourseDetailFloatingBarBlock>
  );
};

export default CourseDetailFloatingBar;
