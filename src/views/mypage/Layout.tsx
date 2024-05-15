import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, MyPageLNB } from '@/components/';
import { media } from '@/styles/legacy-mixins';

const MypageBlock = styled(Container)`
  padding-top: 2.4rem;
  font-size: 2rem;

  ${media('small')} {
    margin: 0;
  }

  ${media('large')} {
    display: grid;
    grid-template-columns: 26.2rem var(--mypage-sub-page-width);
    gap: 2.4rem;
    padding-bottom: 2rem;
  }
`;

const MypageLayout = () => {
  return (
    <MypageBlock>
      <MyPageLNB />
      <Outlet />
    </MypageBlock>
  );
};

export default MypageLayout;
