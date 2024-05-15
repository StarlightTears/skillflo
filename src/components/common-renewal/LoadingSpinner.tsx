import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Spinner } from '@/components';

interface SpinnerProps {
  size?: 'large' | 'medium' | 'small';
  color?: 'gray' | 'blue' | 'red' | 'white';
}

const LoadingSpinnerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: inline-block;
    animation-name: spin;
    animation-duration: 600ms;
    animation-timing-function: linear;
    animation-delay: 0;
    animation-iteration-count: infinite;
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

const getSpinnerColor = (color: SpinnerProps['color']) => {
  switch (color) {
    case 'gray':
      return css`
        path {
          fill: var(--color-semantic-informative-primary);
        }
      `;
    case 'blue':
      return css`
        path {
          fill: var(--color-semantic-informative-blue);
        }
      `;
    case 'red':
      return css`
        path {
          fill: var(--color-semantic-informative-alert);
        }
      `;
    case 'white':
      return css`
        path {
          fill: var(--color-white);
        }
      `;
    default:
      return css`
        path {
          fill: var(--color-semantic-informative-primary);
        }
      `;
  }
};

const getSpinnerSize = (size: SpinnerProps['size']) => {
  switch (size) {
    case 'large':
      return css`
        width: 3.2rem;
        height: 3.2rem;
      `;

    case 'small':
      return css`
        width: 1.6rem;
        height: 1.6rem;
      `;

    default:
    case 'medium':
      return css`
        width: 2.4rem;
        height: 2.4rem;
      `;
  }
};

const LoadingSpinner = ({ size = 'medium', color = 'gray' }: SpinnerProps) => {
  return (
    <LoadingSpinnerBlock>
      <Spinner
        css={css`
          ${getSpinnerColor(color)}
          ${getSpinnerSize(size)}
        `}
      />
    </LoadingSpinnerBlock>
  );
};

export default LoadingSpinner;
