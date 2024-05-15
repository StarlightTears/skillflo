import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Logo } from '@/components';
import { media } from '@/styles/legacy-mixins';

const AuthLayoutBlock = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 18.2rem;
  padding: 2.4rem 1.6rem 0;

  ${media('large')} {
    margin-bottom: 0;
  }
`;

const AuthLayoutHeader = styled.header`
  flex: 0 0;
  width: 32.8rem;
  margin: 0 auto 4rem;
`;

const AuthOutletContainer = styled.div`
  flex: 1 1 auto;
  width: 32.8rem;
  margin: 0 auto;
`;

const AuthLayout = () => {
  return (
    <>
      <AuthLayoutBlock>
        <AuthLayoutHeader>
          <Logo />
        </AuthLayoutHeader>
        <AuthOutletContainer>
          <Outlet />
        </AuthOutletContainer>
      </AuthLayoutBlock>
    </>
  );
};

export default AuthLayout;
