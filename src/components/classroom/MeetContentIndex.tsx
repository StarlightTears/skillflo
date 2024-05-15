import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import type { CourseContent } from '@/types/course.interface';

import { ClassroomIndexCourseExamLinkList, ClassroomIndexLink } from '@/components';
import {
  useClassroomCourse,
  useClassroomNavigate,
  useClassroomParams,
  useClassroomProduct,
} from '@/shared/hooks/classroom';

const IndexBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 1.6rem;

  &.is-meet-course {
    gap: 0.8rem;
  }
`;

const ClassroomMeetContentIndex = () => {
  const { data: course, isMeetCourse } = useClassroomCourse();
  const { courseId, courseContentId } = useClassroomParams();
  const { data: product } = useClassroomProduct();
  const classroomNavigate = useClassroomNavigate();

  const contentList = useMemo(() => course?.extras.contents[0]?.CHAPTER?.[0]?.CONTENT ?? [], [course]);

  const handleContentIndexLink = (content: CourseContent) => {
    if (content.type === 'URL') {
      const productCourseMeta = product?.extras?.connectedCourses?.find(
        (productCourseMeta) => productCourseMeta.id === courseId
      );

      const urlToMove = productCourseMeta?.externalUrls?.find(
        (externalUrl) => externalUrl.courseContentId === content.courseContentId
      )?.url;

      if (!urlToMove) {
        alert('해당 링크는 현재 접속이 불가 합니다. 교육담당자 또는 고객센터(채널톡)를 통해 문의해 주세요.');
        return;
      }

      window.open(urlToMove, '_blank');
    } else {
      classroomNavigate({ type: 'MEET', courseContentId: content.courseContentId });
    }
  };

  return (
    <IndexBlock className={isMeetCourse ? 'is-meet-course' : ''}>
      {contentList.map((content) => (
        <ClassroomIndexLink
          key={content.courseContentId}
          title={content.courseContentName}
          type={content.type as 'MEET' | 'URL'}
          onClickLink={() => handleContentIndexLink(content)}
          isSelected={content.type === 'MEET' && courseContentId === content.courseContentId}
        />
      ))}
      <ClassroomIndexCourseExamLinkList />
    </IndexBlock>
  );
};

export default ClassroomMeetContentIndex;
