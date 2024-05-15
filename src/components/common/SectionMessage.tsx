import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { renewalTypographyMixin } from '@/styles/renewal-mixins';

interface SectionMessageWrapperProps {
  size: 'small' | 'medium';
}

const SectionMessageWrapper = styled.div<SectionMessageWrapperProps>`
  display: flex;
  gap: 0.8rem;
  width: ${({ size }) => (size === 'medium' ? '100%' : 'fit-content')};
  padding: ${({ size }) => (size === 'medium' ? '1.6rem' : '1rem 1.6rem')};
  border-radius: ${({ size }) => (size === 'medium' ? '0.6rem' : '50rem')};
  background-color: var(--color-gray-50);

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: center;
    text-align: left;

    .title {
      ${renewalTypographyMixin('body', 2, true)}
    }

    .description {
      ${({ size }) =>
        size === 'medium' ? renewalTypographyMixin('body', 3) : renewalTypographyMixin('body', 3, true)};
    }
  }
`;

interface SectionMessageProps {
  title?: string;
  description: string;
  prefixIcon?: ReactNode;
}

const SectionMessage = ({ title, description, prefixIcon }: SectionMessageProps) => {
  return (
    <SectionMessageWrapper size={title ? 'medium' : 'small'}>
      {prefixIcon}
      <div className="content">
        {title && <div className="title">{title}</div>}
        <div className="description">{description}</div>
      </div>
    </SectionMessageWrapper>
  );
};

export default SectionMessage;
