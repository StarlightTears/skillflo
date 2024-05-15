import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { ArrowRight } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const ChangePanelBlock = styled.div`
  display: flex;
  align-items: center;

  .content {
    flex: 1 1 auto;

    ${legacyTypographyMixin('body2')}
    text-align: center;
  }

  .icon {
    cursor: pointer;

    path {
      fill: var(--legacy-color-gray-300);
    }

    &.prev {
      transform: rotate(180deg);
    }

    &:hover {
      path {
        fill: var(--legacy-color-gray-900);
      }
    }

    &.disabled {
      cursor: auto;
      pointer-events: none;

      path {
        fill: var(--legacy-color-gray-100);
      }
    }
  }
`;

interface ChangePanelProps {
  disabledPrevious?: boolean;
  disabledNext?: boolean;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
}

const ChangePanel = ({
  className,
  disabledPrevious, // ? 필요??
  disabledNext, // ? 필요??
  onClickPrevious,
  onClickNext,
  children,
}: PropsWithStyle<PropsWithChildren<ChangePanelProps>>) => {
  return (
    <ChangePanelBlock className={className}>
      <ArrowRight className={`icon prev ${disabledPrevious ? 'disabled' : ''}`} onClick={() => onClickPrevious?.()} />
      <div className="content">{children}</div>
      <ArrowRight className={`icon next ${disabledNext ? 'disabled' : ''}`} onClick={() => onClickNext?.()} />
    </ChangePanelBlock>
  );
};

export default ChangePanel;
