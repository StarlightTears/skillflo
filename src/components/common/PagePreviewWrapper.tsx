import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRight } from '@/components';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface PagePreviewWrapperBlockProps {
  className?: string;
  title: string;
  link: string;
  children?: ReactNode | undefined;
}

const PagePreviewWrapperBlock = styled.div`
  margin: 6rem 0 0;

  .wrapper-header {
    margin: 0 0 1.6rem;

    ${legacyTypographyMixin('body1')}
    color: var(--legacy-color-gray-900);
  }

  .more-link {
    display: none;
  }

  ${media('large')} {
    margin: 4.4rem 0 0;

    .wrapper-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin: 0 0 2rem;

      ${legacyTypographyMixin('headline4')}
    }

    .title {
      font-weight: 700;
    }

    .more-link {
      display: flex;

      ${legacyTypographyMixin('body1')}
      color: var(--legacy-color-gray-700);
    }
  }
`;

const PagePreviewWrapper = ({ className, title, link, children }: PagePreviewWrapperBlockProps) => {
  return (
    <PagePreviewWrapperBlock className={className}>
      <div className="wrapper-header">
        <div className="title">{title}</div>
        <Link to={link} className="more-link">
          전체보기
          <ArrowRight />
        </Link>
      </div>
      {children}
    </PagePreviewWrapperBlock>
  );
};

export default PagePreviewWrapper;
