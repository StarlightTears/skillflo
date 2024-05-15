import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';

import { isValidEmail } from '@day1co/redstone-policy';

import type { Member } from '@/types/member.interface';

import { Button, Input } from '@/components/index';
import { getAccessToken } from '@/shared/api/auth';
import { getMemberListForLogin } from '@/shared/api/member';
import { useAppDispatch, useValidation, useToken, useToast } from '@/shared/hooks';
import slices from '@/shared/store/slices';
import { isValidPassword } from '@/shared/utils/validation';

const SigninFormBlock = styled.form`
  margin-bottom: 3.6rem;
`;

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken, setMemberToken } = slices.actions.auth;
  const { openToast } = useToast();
  const dispatch = useAppDispatch();
  const { getMemberTokenBySelectedMember } = useToken();

  const [isEmailValid, emailValidMessage] = useValidation({
    formState: [email],
    validationList: [
      {
        validMessage: '이메일 주소의 형식을 다시 한번 확인해주세요.',
        validator: isValidEmail,
      },
    ],
  });

  const [isPasswordValid, passwordValidMessage] = useValidation({
    formState: [password],
    validationList: [
      {
        validMessage: '비밀번호는 8자리 이상 입력해주세요.',
        validator: isValidPassword,
      },
    ],
  });

  const onError = () => {
    dispatch(setAccessToken(''));
    dispatch(setMemberToken(''));
    openToast({
      content: '로그인 정보를 다시 한번 확인해주세요.',
    });
  };

  const getAccessTokenByFormData = async () => {
    try {
      const response = await getAccessToken({
        name: email,
        extras: {
          password,
        },
      });
      const {
        data: { access_token },
      } = response;

      dispatch(setAccessToken(access_token));
    } catch (error) {
      onError();
    }
  };

  const getMemberByLoginHistory = (members: Member[]) => {
    const filteredMembers = members.filter((member) => email === member.name);
    const membersWithLoginHistory = filteredMembers.filter((member) => {
      return !!member.extras.lastSignInDate;
    });
    if (membersWithLoginHistory.length === 0) {
      return filteredMembers[0];
    }
    return membersWithLoginHistory.sort((a, b) => {
      const dateA = new Date(a.extras.lastSignInDate as string);
      const dateB = new Date(b.extras.lastSignInDate as string);
      if (dateA > dateB) {
        return -1;
      } else if (dateA === dateB) {
        return 0;
      } else {
        return 1;
      }
    })[0];
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await getAccessTokenByFormData();
      const { data } = await getMemberListForLogin({ state: 'NORMAL', limit: 100 });
      if (data.length === 0) {
        throw new Error('로그인 정보가 잘못 되었습니다.');
      }
      const selectedMember = getMemberByLoginHistory(data);
      await getMemberTokenBySelectedMember(selectedMember, onError);
    } catch (error) {
      onError();
    }
  };

  return (
    <SigninFormBlock onSubmit={login}>
      <Input
        css={css`
          margin-bottom: 1.6rem;
        `}
        label="이메일"
        placeholder="이메일을 입력해주세요."
        value={email}
        validation={{
          isValid: isEmailValid,
          validationMessage: emailValidMessage,
        }}
        onChange={(e) => setEmail(e.target.value)}
        data-e2e="email"
      />
      <Input
        css={css`
          margin-bottom: 2.4rem;
        `}
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        validation={{
          isValid: isPasswordValid,
          validationMessage: passwordValidMessage,
        }}
        onChange={(e) => setPassword(e.target.value)}
        data-e2e="password"
      />
      <Button theme="primary" size="large" disabled={!(isEmailValid && isPasswordValid)} data-e2e="login-btn">
        로그인
      </Button>
    </SigninFormBlock>
  );
};

export default SigninForm;
