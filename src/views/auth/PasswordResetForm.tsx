import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { isValidPassword } from '@day1co/redstone-policy';

import { Button, Input } from '@/components';
import { sendPasswordReset } from '@/shared/api/auth';
import { useValidation, useToast } from '@/shared/hooks';
import { isValidPasswordAgain } from '@/shared/utils/validation';

const PasswordResetFormBlock = styled.form`
  margin-bottom: 1.6rem;
`;

const inputStyle = css`
  margin-bottom: 2.4rem;
`;

const PasswordResetForm = () => {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const { openToast } = useToast();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const passwordResetValue = params.get('reset-key');

  const [isPasswordValid, passwordValidMessage] = useValidation({
    formState: [password],
    validationList: [
      {
        validMessage: '8자 이상, 숫자와 특수문자 사용을 권장합니다.',
        validator: isValidPassword,
      },
    ],
  });

  const [isPasswordAgainValid, passwordAgainValidMessage] = useValidation({
    formState: [password, passwordAgain],
    validationList: [
      {
        validMessage: '새로 설정한 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        validator: isValidPasswordAgain,
      },
    ],
  });

  const callPasswordReset = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordReset({
        password,
        passwordResetValue,
      });
      openToast({
        content: '비밀번호 변경이 완료되었습니다.\n다시 로그인해주세요.',
      });
    } catch (error) {
      openToast({
        content: '비밀번호 초기화 실패하였습니다. \n잠시후 다시 시도해주세요.',
      });
    }
  };

  return (
    <PasswordResetFormBlock onSubmit={callPasswordReset}>
      <Input
        css={inputStyle}
        label="비밀번호"
        placeholder="새로운 비밀번호를 설정해주세요."
        type="password"
        value={password}
        validation={{
          isValid: isPasswordValid,
          validationMessage: passwordValidMessage,
        }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Input
        css={inputStyle}
        label="비밀번호 확인"
        placeholder="설정한 비밀번호를 한번 더 확인해주세요."
        type="password"
        value={passwordAgain}
        validation={{
          isValid: isPasswordAgainValid,
          validationMessage: passwordAgainValidMessage,
        }}
        onChange={(e) => {
          setPasswordAgain(e.target.value);
        }}
      />
      <Button theme="primary" size="large" disabled={!(isPasswordValid && isPasswordAgainValid)}>
        변경하기
      </Button>
    </PasswordResetFormBlock>
  );
};

export default PasswordResetForm;
