import styled from '@emotion/styled';
import React from 'react';

import { RenewalButton as Button } from '@/components/common-renewal/RenewalButton';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: center;
  width: 30rem;
  padding: 2.4rem;
  border: 0.1rem solid var(--color-semantic-divider-default);
  border-radius: 0.6rem;
  background: #fff;
  text-align: center;

  .title {
    ${renewalTypographyMixin('body', 2, true)}
  }

  .description {
    ${renewalTypographyMixin('caption', 1)}
    color: var(--color-semantic-informative-secondary);
  }
`;

interface DialogProps {
  prefixIcon?: React.ReactNode;
  title: string;
  description: string;
  isCtaButtonHighlighted?: boolean;
  buttonText: string;
  onClickButton: () => void;
}

export const Dialog = ({
  prefixIcon,
  title,
  description,
  isCtaButtonHighlighted = true,
  buttonText,
  onClickButton,
}: DialogProps) => {
  return (
    <DialogWrapper>
      {prefixIcon}
      <div>
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
      <Button
        theme={isCtaButtonHighlighted ? 'solid' : 'outline'}
        color={isCtaButtonHighlighted ? 'accent' : 'gray'}
        size="medium"
        onClick={onClickButton}
      >
        {buttonText}
      </Button>
    </DialogWrapper>
  );
};
