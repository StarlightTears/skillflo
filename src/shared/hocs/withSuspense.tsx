import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactElement, Suspense, ComponentType } from 'react';

import { SUSPENSE_LOADING_SPINNER_CLASS } from '../policy';

import { LoadingSpinner } from '@/components';

const DefaultLoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 8rem 0;
`;

function withSuspense<Props extends object>(
  Component: ComponentType<Props>,
  FallbackComponent?:
    | ComponentType<{ children?: ReactElement }>
    | StyledComponent<object, object, { children?: ReactElement }>
) {
  const FallbackRootComponent = !FallbackComponent ? DefaultLoadingSpinnerWrapper : FallbackComponent;

  const SuspenseWrapper = (props: Props) => {
    return (
      <Suspense
        fallback={
          <FallbackRootComponent>
            <LoadingSpinner className={SUSPENSE_LOADING_SPINNER_CLASS} />
          </FallbackRootComponent>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

  return SuspenseWrapper;
}

export default withSuspense;
