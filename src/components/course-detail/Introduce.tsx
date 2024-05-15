import styled from '@emotion/styled';
import React from 'react';

import { ArrowRight } from '..';
import Button from '../common-renewal/Button';

import { homeMedia, textEllipsis, typographyMixin } from '@/styles/mixins';

interface IntroduceProps {
  descriptionInfo?: string;
}

const IntroduceBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  p {
    width: 100%;
    ${typographyMixin('p2')};
    ${textEllipsis(4)};
  }

  .more-view-btn {
    margin-top: 0.8rem;
    color: var(--color-primary-700);
  }

  ${homeMedia('large', 'xlarge')} {
    flex-direction: row;

    .more-view-btn {
      flex: 6.9rem 0 0;
      margin-top: 0;
      margin-left: 6.1rem;
    }
  }
`;

const Introduce = ({ descriptionInfo }: IntroduceProps) => {
  return (
    <IntroduceBlock>
      <p>{descriptionInfo ? descriptionInfo : '-'}</p>
      <Button className="more-view-btn" theme="none" size="xsmall" rightIcon={<ArrowRight />}>
        더보기
      </Button>
    </IntroduceBlock>
  );
};

export default Introduce;
