import styled from '@emotion/styled';
import React from 'react';

import PasswordFindForm from './PasswordFindForm';

import { AuthContent, CenterAlignBlock, Link } from '@/components';

const PasswordFindContent = styled.div`
  margin-top: 4.8rem;
`;

const passwordFindTitle = '비밀번호 찾기';

const passwordFindSubInfo =
  '가입한 이메일을 입력하시면\n비밀번호 재설정이 가능한 메일을 보내드립니다.\n발송된 메일은 10분간 유효하니 참고해주세요.';

const PasswordFind = () => {
  return (
    <AuthContent title={passwordFindTitle} subInfo={passwordFindSubInfo}>
      <PasswordFindContent>
        <PasswordFindForm />
        <CenterAlignBlock>
          <Link to="/auth/signin">로그인으로</Link>
        </CenterAlignBlock>
      </PasswordFindContent>
    </AuthContent>
  );
};

export default PasswordFind;
