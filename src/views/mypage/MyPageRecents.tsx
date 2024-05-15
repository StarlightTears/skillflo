import styled from '@emotion/styled';
import React from 'react';
// import { useNavigate } from 'react-router-dom';

import { MypageCourseList, MypageSubPageWrapper, EmptyNoteBlue } from '@/components';
// import CourseBlock from '@/components/common/CourseBlock';
import EmptyPlaceholder from '@/components/mypage/EmptyPlaceholder';
// import { verificationEnrollment } from '@/shared/api/enrollment';
// import { useViewport } from '@/shared/hooks';
// import { useClassroomNavigate } from '@/shared/hooks/classroom';
import { useRecentCourseList } from '@/shared/hooks/mypage';
import { media } from '@/styles/legacy-mixins';

const MyPageCourseBlock = styled.div`
  ${media('small')} {
    margin: 0 1.6rem;
  }
`;
// const MypageCourseListBlock = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const MyPageCourse = () => {
  const recentCourseList = useRecentCourseList();
  // const navigate = useNavigate();
  // const { isSmallViewport } = useViewport();
  // const classroomNavigate = useClassroomNavigate();

  if (!recentCourseList.length) {
    return (
      <EmptyPlaceholder>
        <EmptyNoteBlue />
        수강 내역이 없습니다.
      </EmptyPlaceholder>
    );
  }

  return (
    <MypageSubPageWrapper title="최근 수강한 강의">
      <MyPageCourseBlock>
        <MypageCourseList courseProgressList={recentCourseList} />

        {/* {!isSmallViewport ? (
          <MypageCourseList courseProgressList={recentCourseList} />
        ) : (
          <MypageCourseListBlock>
            {recentCourseList.map((courseProgress) => (
              <CourseBlock
                key={`${courseProgress.product.id}-${courseProgress.id}`}
                course={courseProgress}
                type={'default'}
                onThumbnailClick={async () => {
                  await verificationEnrollment({ productId: courseProgress.product.id, courseId: courseProgress.id });
                  classroomNavigate({
                    productId: courseProgress.product.id,
                    courseId: courseProgress.id,
                    type: courseProgress.type,
                  });
                }}
                onDescriptionClick={() => {
                  navigate(`/course-detail/${courseProgress.product.id}/${courseProgress.id}`);
                }}
              />
            ))}
          </MypageCourseListBlock>
        )} */}
      </MyPageCourseBlock>
    </MypageSubPageWrapper>
  );
};

export default MyPageCourse;
