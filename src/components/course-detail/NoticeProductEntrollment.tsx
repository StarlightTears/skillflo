import styled from '@emotion/styled';
import React from 'react';

import { Info } from '..';

import type { PropsWithStyle } from '@/types/component.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const NoticeProduct = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.2rem;
  border: 0.1rem solid var(--color-blue-600);
  border-radius: 0.6rem;
  background-color: var(--color-primary-700);
  opacity: 0.75;
  font-weight: 500;
  color: var(--color-white);
  cursor: pointer;

  ${legacyTypographyMixin('button')}

  div {
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }
`;

const NoticeProductEntrollment = ({ className }: PropsWithStyle) => {
  return (
    <NoticeProduct className={className}>
      <div>
        <Info style={{ flex: '0 0 20px' }} />
        해당 강의는 2023.12.26 전까지 수강 신청을 하셔야 학습하실 수 있습니다.
      </div>
    </NoticeProduct>
  );
};

export default NoticeProductEntrollment;
