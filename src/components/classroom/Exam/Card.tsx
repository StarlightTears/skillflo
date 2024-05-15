import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Badge, Button } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ExamCardProps {
  badgeContent: string;
  title: string;
  subInfo: string;
  isResultExposed: boolean;
  buttonContent: string;
  buttonHandler: () => void;
  children?: React.ReactNode;
}

const CardBlock = styled.div`
  width: 72rem;
  margin-top: 10.6rem;
  padding: 3.2rem;
  border-radius: 1rem;
  background-color: var(--color-white);
`;

const CardHeaderTitle = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 0.2rem;
  ${legacyTypographyMixin('headline5')}
  font-weight: 700;
`;

const CardHeaderSubInfo = styled.pre`
  white-space: pre-wrap;
  word-break: break-word;
  ${legacyTypographyMixin('body2')}
`;

const CardHr = styled.hr`
  margin: 2.8rem 0;
  border-top: 0.1rem solid var(--color-hr);
`;

const CardContent = styled.div`
  .badge {
    margin-bottom: 1.2rem;
  }

  .column-info {
    display: flex;

    .column {
      &-title {
        margin-bottom: 0.2rem;
        ${legacyTypographyMixin('caption')}
        color: var(--legacy-color-gray-600);
      }

      &-content {
        display: flex;
        ${legacyTypographyMixin('body1')}

        &-main {
          margin-right: 0.8rem;
          font-weight: 700;
        }

        &-sub {
          color: var(--legacy-color-gray-300);
        }
      }
    }

    .vertical-line {
      margin: 0 2.8rem;
      border-left: 0.1rem solid var(--legacy-color-gray-100);
    }
  }

  .user-info {
    margin-top: 2.8rem;

    .row {
      display: flex;
      align-items: center;
      ${legacyTypographyMixin('body2')}

      .column {
        span:last-child {
          margin-left: 0.4rem;
          font-weight: 700;
        }
      }

      .vertical-line {
        width: 0.5rem;
        margin: 0 0.8rem;
        color: var(--legacy-color-gray-200);
      }
    }
  }
`;

const CardFooter = styled.footer`
  margin-top: 6rem;
`;

const ExamCard = ({
  badgeContent,
  title,
  subInfo,
  isResultExposed,
  buttonContent,
  buttonHandler,
  children,
}: ExamCardProps) => {
  return (
    <CardBlock>
      <header>
        <Badge>{badgeContent}</Badge>
        <CardHeaderTitle>{title}</CardHeaderTitle>
        <CardHeaderSubInfo>{subInfo}</CardHeaderSubInfo>
      </header>
      {isResultExposed && <CardHr />}
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button
          css={css`
            width: auto;
          `}
          theme="primary"
          size="medium"
          onClick={buttonHandler}
        >
          {buttonContent}
        </Button>
      </CardFooter>
    </CardBlock>
  );
};

export default ExamCard;
