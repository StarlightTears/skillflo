import styled from '@emotion/styled';
import React, { FC } from 'react';

import EmptyPlaceholder from './EmptyPlaceholder';

import type { OriginCourse } from '@/types/course.interface';

import { EmptyNoteBlue, MypageCourseListItem } from '@/components';
import { useCurrentMemberGroup } from '@/shared/hooks';

interface MypageCourseListProps {
  courseProgressList: OriginCourse[];
}

const MypageCourseListBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

const MypageCourseList: FC<MypageCourseListProps> = ({ courseProgressList }) => {
  const { data: memberGroup } = useCurrentMemberGroup();

  if (!courseProgressList.length) {
    return (
      <EmptyPlaceholder>
        <EmptyNoteBlue />
        수강 내역이 없습니다.
      </EmptyPlaceholder>
    );
  }

  return (
    <MypageCourseListBlock>
      {courseProgressList.map((courseProgress) => (
        <MypageCourseListItem
          key={`${courseProgress.id}:${courseProgress.product.id}`}
          courseProgress={courseProgress}
          isShowCertificationButton={memberGroup?.extras.isShowCertificationButton || false}
        />
      ))}
    </MypageCourseListBlock>
  );
};

export default MypageCourseList;
