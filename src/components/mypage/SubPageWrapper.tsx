import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface MypageSubPageWrapperProps {
  title: string;
}

const MypageSubPageWrapperBlock = styled.div`
  margin: 0 0 8rem;

  .sub-page-title {
    padding: 1.6rem;

    ${legacyTypographyMixin('body1')}
    font-weight: 700;
  }

  ${media('large')} {
    .sub-page-title {
      margin: 0 0 2rem;
      padding: 0;

      ${legacyTypographyMixin('headline2')}
    }
  }
`;

const MypageSubPageWrapper = ({
  className,
  title,
  children,
}: PropsWithStyle<PropsWithChildren<MypageSubPageWrapperProps>>) => {
  return (
    <MypageSubPageWrapperBlock className={className}>
      <h2 className="sub-page-title">{title}</h2>
      {children}
    </MypageSubPageWrapperBlock>
  );
};

export default MypageSubPageWrapper;
