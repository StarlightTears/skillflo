import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';

import { isValidEmail } from '@day1co/redstone-policy';

import { Button, Input } from '@/components';
import { sendPasswordResetEmail } from '@/shared/api/auth';
import { useValidation, useToast } from '@/shared/hooks';

const PasswordFindFormBlock = styled.form`
  margin-bottom: 1.6rem;
`;

const PasswordFindForm = () => {
  const [email, setEmail] = useState('');
  const { openToast } = useToast();

  const [isEmailValid, emailValidMessage] = useValidation({
    formState: [email],
    validationList: [
      {
        validMessage: '이메일 주소의 형식을 다시 한번 확인해주세요.',
        validator: isValidEmail,
      },
    ],
  });

  const callPasswordReset = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail({ name: email });
      openToast({
        content: '비밀번호 재설정 메일이 전송되었습니다.\n메일함을 확인해주세요.',
      });
    } catch (error) {
      openToast({
        content: '입력한 정보를 다시한번 확인해주세요.',
      });
    }
  };

  return (
    <PasswordFindFormBlock onSubmit={callPasswordReset}>
      <Input
        css={css`
          margin-bottom: 2.4rem;
        `}
        label="이메일"
        placeholder="이메일 주소를 입력해 주세요."
        value={email}
        validation={{
          isValid: isEmailValid,
          validationMessage: emailValidMessage,
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button theme="primary" size="large" disabled={!isEmailValid}>
        전송하기
      </Button>
    </PasswordFindFormBlock>
  );
};

export default PasswordFindForm;
