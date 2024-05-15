import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { Badge } from '@/components';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface InterestsContentLayoutProps {
  asideContent: ContentProps;
  className?: string;
  children: ReactNode;
}

interface ContentProps {
  badge: string;
  badgeDescription: string;
}

const InterestsContentLayoutBlock = styled.section`
  display: flex;
  flex-direction: column;

  ${media('large')} {
    flex-direction: row;
  }
`;

const InterestsContentLayoutLeftAside = styled.aside`
  ${media('large')} {
    width: 26.1rem;
    margin-right: 2.4rem;
  }
`;

const InterestsContentLeftBadgeDescription = styled.div`
  ${legacyTypographyMixin('body1')}
  margin-top: 1.2rem;
  font-weight: 700;
  white-space: pre-line;
`;

const InterestsContentLayoutRight = styled.section`
  ${media('large')} {
    width: 54.8rem;
  }
`;

const InterestsContentLayout = ({ asideContent, children, className }: InterestsContentLayoutProps) => {
  return (
    <InterestsContentLayoutBlock className={className}>
      <InterestsContentLayoutLeftAside>
        <Badge theme="lightblue">{asideContent.badge}</Badge>
        <InterestsContentLeftBadgeDescription>{asideContent.badgeDescription}</InterestsContentLeftBadgeDescription>
      </InterestsContentLayoutLeftAside>
      <InterestsContentLayoutRight>{children}</InterestsContentLayoutRight>
    </InterestsContentLayoutBlock>
  );
};

export default InterestsContentLayout;
