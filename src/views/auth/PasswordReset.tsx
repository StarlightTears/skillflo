import styled from '@emotion/styled';
import React from 'react';

import PasswordResetForm from './PasswordResetForm';

import { AuthContent, CenterAlignBlock, Link } from '@/components';

const PasswordResetContent = styled.div`
  margin-top: 4.8rem;
`;

const passwordResetSubInfo = '새로운 비밀번호를 설정해주세요.\n비밀번호는 8자 이상, 숫자와 특수문자 사용을 권장합니다.';

const PasswordReset = () => {
  return (
    <AuthContent title="비밀번호 재설정" subInfo={passwordResetSubInfo}>
      <PasswordResetContent>
        <PasswordResetForm />
        <CenterAlignBlock>
          <Link to="/auth/signin">로그인으로</Link>
        </CenterAlignBlock>
      </PasswordResetContent>
    </AuthContent>
  );
};

export default PasswordReset;
