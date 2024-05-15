import React, { useMemo } from 'react';

import { Curation } from '@/components';
import CustomCourseCard from '@/components/home/CustomCourseCard';
import { useCurrentAccount, useCurrentMember, useViewport } from '@/shared/hooks';
import { useRegistrableCourses } from '@/shared/hooks/enrollment';

const UserCustomCourseList = () => {
  const { member } = useCurrentMember();
  const { data: account } = useCurrentAccount();
  const { data: categoryCoursesList } = useRegistrableCourses();
  const { isSmallViewport, isMediumViewport } = useViewport('home');

  const userCustomCourseList = useMemo(() => {
    const interestCategoryList = account?.extras.skills?.map(({ skill }) => skill) || [];
    return (
      categoryCoursesList
        ?.filter((categoryCourses) => {
          // * 맞춤형 강의 카테고리는 depth 2까지 설정해야 하므로 depth1인 카테고리는 거르도록 한다.
          // * depth2의 카테고리의 코스들이 depth1인 카테고리의 코스에도 중복으로 보여지기 때문이다.
          return categoryCourses.category.depth === 2;
        })
        .flatMap((categoryCourses) => categoryCourses.courses)
        .filter((course) => {
          // * 회원의 맞춤형 강의 카테고리에 속한 카테고리가 있는지 확인
          return course.extras.exposedCategory.some((category) => {
            return interestCategoryList.some((interestCategory) => {
              return (
                category.depth1stId === interestCategory.depth1stId &&
                category.depth2ndId === interestCategory.depth2ndId
              );
            });
          });
        }) || []
    );
  }, [account, categoryCoursesList]);

  if (!member || !account || !userCustomCourseList?.length) return null;

  return (
    <Curation
      title={`${member.extras.name}님의 맞춤형 강의`}
      courseCount={userCustomCourseList.length}
      cardGap={isSmallViewport || isMediumViewport ? 12 : 16}
    >
      {userCustomCourseList.map((course, index) => (
        <CustomCourseCard key={`${course.id}-${index}`} course={course} />
      ))}
    </Curation>
  );
};

export default UserCustomCourseList;
