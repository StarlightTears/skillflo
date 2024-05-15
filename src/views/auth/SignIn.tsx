import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthContent, CenterAlignBlock, Intro, Link } from '../../components/index';

import SigninForm from './SigninForm';

import { useToken } from '@/shared/hooks';
import { media } from '@/styles/legacy-mixins';

const SigninContent = styled.div`
  min-height: 34.4rem;
  margin-top: 4.8rem;
  margin-bottom: 6rem;

  ${media('large')} {
    height: auto;
    margin-bottom: 0;
  }
`;

const signinTitle = '패스트 캠퍼스 구독 서비스\nSkillflo에 오신 것을 환영합니다.';

const Signin = () => {
  const { accessToken, memberToken } = useToken();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');

  useEffect(() => {
    if (accessToken && memberToken) {
      if (redirectUrl) {
        const queryStringExceptRedirectUrl = location.search.replace(`redirectUrl=${redirectUrl}&`, '');
        navigate(`/${redirectUrl}${queryStringExceptRedirectUrl}`);
        return;
      }
      navigate('/');
    }
  }, [accessToken, memberToken]);

  return (
    <AuthContent title={signinTitle}>
      <SigninContent>
        <SigninForm />
        <CenterAlignBlock>
          <Link to="/auth/password-find">비밀번호 찾기</Link>
        </CenterAlignBlock>
      </SigninContent>
      <Intro />
    </AuthContent>
  );
};

export default Signin;
