import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

import { CloseLarge, Portal } from '..';

import { typographyMixin } from '@/styles/mixins';

interface BottomSheetProps {
  title?: string;
  onCloseBottomSheet: () => void;
}

const BottomSheetDimmed = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--z-bottom-sheet-dimmed);
  display: flex;
  padding-top: 7.2rem;
  background-color: black;
  opacity: 0.8;

  :root body {
    overflow: hidden;
  }
`;

const disableBodyScroll = css`
  :root body {
    overflow: hidden;
  }
`;

const BottomSheetBlock = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-bottom-sheet);
  display: flex;
  flex-direction: column;
  max-width: 640px;
  max-height: calc(100vh - 7.2rem);
  margin: auto;
  padding-bottom: 3.2rem;
  border-radius: 0.8rem 0.8rem 0 0;
  background-color: var(--color-white);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5.6rem;
    padding: 1.6rem;
    border-bottom: 0.1rem solid var(--color-gray-100);
    ${typographyMixin('p1', 'bold')};

    svg {
      cursor: pointer;
    }
  }

  .content {
    overflow-y: scroll;
    padding: 2rem 1.6rem 0;
  }
`;

const BottomSheet = ({ title, children, onCloseBottomSheet }: PropsWithChildren<BottomSheetProps>) => {
  return (
    <Portal>
      <Global styles={disableBodyScroll} />
      <BottomSheetDimmed />
      <BottomSheetBlock>
        <div className="header">
          <span>{title}</span> <CloseLarge onClick={onCloseBottomSheet} />
        </div>
        <div className="content">{children}</div>
      </BottomSheetBlock>
    </Portal>
  );
};

export default BottomSheet;
