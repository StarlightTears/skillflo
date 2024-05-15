import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import { CardSlider } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia } from '@/styles/mixins';

interface CurationProps {
  headTitle?: string;
  title?: string;
  description?: string;
  courseCount?: number;
  cardGap?: number;
  cardLength?: number;
}

const CurationBlock = styled.div`
  padding: 0.8rem 0 4rem;

  ${homeMedia('large')} {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .header {
    padding: 1.2rem 4rem 0;

    ${homeMedia('small')} {
      padding-left: 2rem;
    }

    .head-title {
      margin-bottom: 0.2rem;
      color: var(--color-blue-600);
      ${legacyTypographyMixin('Small')};
    }

    .title {
      margin-bottom: 0.2rem;
      font-weight: 700;
      ${legacyTypographyMixin('XLarge')};
    }

    .course-count {
      margin-left: 0.4rem;
      font-weight: 500;
      color: var(--color-text-gray);
      ${legacyTypographyMixin('Large')};
    }

    .description {
      margin-bottom: 0.2rem;
      color: var(--color-text-gray);
      ${legacyTypographyMixin('Large')};
    }
  }
`;

const Curation = ({
  headTitle,
  title,
  description,
  courseCount,
  cardGap,
  cardLength,
  children,
}: PropsWithChildren<CurationProps>) => {
  return (
    <CurationBlock>
      <div className="header">
        {headTitle && <div className="head-title">{headTitle}</div>}
        {title && (
          <div className="title">
            {title}
            {courseCount && courseCount > 0 && <span className="course-count">{courseCount}</span>}
          </div>
        )}
        {description && <div className="description">{description}</div>}
      </div>
      <CardSlider cardGap={cardGap} cardLength={cardLength}>
        {children}
      </CardSlider>
    </CurationBlock>
  );
};

export default Curation;
