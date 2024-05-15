import styled from '@emotion/styled';
import React from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { LoadingSpinnerXlarge, LoadingSpinnerMedium } from '@/components';
import { homeMedia } from '@/styles/mixins';

const LoadingSpinnerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.full-viewport {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .loading-spinner {
    display: inline-block;
    animation-name: spin;
    animation-duration: 800ms;
    animation-timing-function: linear;
    animation-delay: 0;
    animation-iteration-count: infinite;
  }

  .xlarge-spinner {
    display: none;
  }

  .medium-spinner {
    display: block;
  }

  ${homeMedia('xlarge')} {
    .xlarge-spinner {
      display: block;
    }

    .medium-spinner {
      display: none;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ className }: PropsWithStyle) => {
  return (
    <LoadingSpinnerBlock className={className}>
      <div className="loading-spinner">
        <LoadingSpinnerXlarge className="xlarge-spinner" />
        <LoadingSpinnerMedium className="medium-spinner" />
      </div>
    </LoadingSpinnerBlock>
  );
};

export default LoadingSpinner;
