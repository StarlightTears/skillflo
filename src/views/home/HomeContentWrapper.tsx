import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { HomeContent, HomeContentWrapper } from '@/types/homeContent';

import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface HomeContentWrapperProps {
  pageWrapper: HomeContentWrapper;
}

const SpecialPageGuideBlock = styled.div`
  margin: 3rem 0 0;

  .guide-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }

  .title {
    ${legacyTypographyMixin('caption')}
    color: var(--color-blue-600);
  }

  .sub-title {
    ${legacyTypographyMixin('body1')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);
  }

  .guide-text {
    ${legacyTypographyMixin('caption')}
    font-weight: 400;
    color: var(--legacy-color-gray-500);
  }

  .learning-guide-card-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;

    li {
      position: relative;

      cursor: pointer;

      img {
        width: 100%;
        border-radius: 1rem;
      }
    }
  }

  ${media('large')} {
    margin: 6rem 0 0;

    .guide-header {
      gap: 0.6rem;
      margin-bottom: 2rem;
    }

    .title {
      ${legacyTypographyMixin('body1')}
    }

    .sub-title {
      ${legacyTypographyMixin('headline4')}
    }

    .guide-text {
      ${legacyTypographyMixin('body1')}
    }

    .learning-guide-card-list {
      grid-template-columns: repeat(4, 1fr);
      gap: 2.4rem;
    }
  }
`;

const HomeContentWrapper = ({ pageWrapper }: HomeContentWrapperProps) => {
  const navigate = useNavigate();
  const onClickLearningGuide = (page: HomeContent) => {
    if (page.originPageId) {
      navigate(`/page/${page.originPageId}`);
    }

    if (page.redirectUrl) {
      location.href = page.redirectUrl;
    }
  };

  return (
    <SpecialPageGuideBlock>
      <div className="guide-header">
        <h4 className="title">{pageWrapper.title}</h4>
        <div className="sub-title">{pageWrapper.subtitle}</div>
        <div className="guide-text">{pageWrapper.description}</div>
      </div>
      <ul className="learning-guide-card-list">
        {pageWrapper.pages?.map((page, pageIndex) => (
          <li key={pageWrapper.pageIds[pageIndex]} onClick={() => onClickLearningGuide(page)}>
            <img src={page.logoFile[0].url} />
          </li>
        ))}
      </ul>
    </SpecialPageGuideBlock>
  );
};

export default HomeContentWrapper;
