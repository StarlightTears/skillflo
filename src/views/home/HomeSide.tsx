import styled from '@emotion/styled';
import React from 'react';

import NoticeSide from './NoticeSide';
import Profile from './Profile';
import RecentCourseList from './RecentCourseList';
import RequiredCourseList from './RequiredCourseList';

import { useHomeCuration } from '@/shared/hooks/home';
import { homeMedia } from '@/styles/mixins';

const HomeSideWrapper = styled.div`
  display: none;
  width: 32rem;
  padding: 4rem 0 0 4rem;
  border-left: 0.1rem solid var(--color-hr);
  color: var(--color-text-black);

  & .divider {
    margin: 4rem 0;
    border-bottom: 0.1rem solid var(--color-hr);
  }

  ${homeMedia('xlarge')} {
    display: block;
  }
`;

const HomeSide = () => {
  const { data: curation } = useHomeCuration();
  const noticeList = curation?.notices;
  const recentCourses = curation?.recentCourses;
  const requiredCourses = curation?.requiredCourses;

  return (
    <HomeSideWrapper>
      <Profile />
      {noticeList && noticeList.length > 0 && (
        <>
          <div className="divider" />
          <NoticeSide noticeList={noticeList} />
        </>
      )}
      {requiredCourses && requiredCourses.length > 0 && (
        <>
          <div className="divider" />
          <RequiredCourseList requiredCourses={requiredCourses} />
        </>
      )}
      <div className="divider" />
      <RecentCourseList recentCourses={recentCourses} />
    </HomeSideWrapper>
  );
};

export default HomeSide;
