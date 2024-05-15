import { css } from '@emotion/react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import React, { MouseEventHandler, ReactNode, useEffect } from 'react';

import type { ModalSize } from '@/types/modal.interface';

import { Button, CloseLarge, Portal } from '@/components';
import { useChannelTalk } from '@/shared/hooks/useChannelTalk';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface ModalProps {
  size?: ModalSize;
  hideHeader?: boolean;
  hideFooter?: boolean;
  fullScreen?: boolean;
  title?: ReactNode;
  content?: ReactNode;
  hasCloseButton?: boolean;
  hideCancelButton?: boolean;
  hasContentHr?: boolean;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onCloseModal?: MouseEventHandler;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isDisableConfirmButton?: boolean;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-modal-background);
`;

const ModalBlock = styled.div<{ size: ModalSize; fullScreen?: boolean }>`
  padding: var(--modal-padding-top) var(--modal-padding-top) 2rem;
  border-radius: 1rem;
  background-color: var(--color-white);
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          width: 34rem;
          padding: 4rem 2.4rem 2rem;
        `;
      case 'medium':
        return `
          width: 64rem;
        `;
      case 'fit':
        return `
          width: 64rem;
          height: 100vh;
          ${media('large')} {
            height: auto;
          }
        `;
    }
  }}
  ${media('small', 'medium')} {
    ${({ fullScreen }) =>
      fullScreen &&
      `
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    overflow: auto;
  `}
  }
`;

const ModalHeader = styled.header<{ hasContentHr?: boolean }>`
  display: flex;
  justify-content: space-between;
  height: var(--modal-header-height);
  ${legacyTypographyMixin('headline6')}
  margin-bottom: var(--modal-header-margin-bottom);
  font-weight: 700;

  ${({ hasContentHr }) => {
    return (
      hasContentHr &&
      `
      height: auto;
      margin: 0;
      padding-bottom: 2rem;
      border-bottom: 0.1rem solid var(--legacy-color-gray-100);
    `
    );
  }}

  svg {
    cursor: pointer;
  }
`;

const ModalContent = styled.div<{ size: ModalSize }>`
  ${legacyTypographyMixin('body1')}

  ${({ size }) => {
    switch (size) {
      case 'fit':
        return `
            overflow-y: auto;
            height: calc(100% - (var(--modal-header-height) + var(--modal-header-margin-bottom) + var(--modal-footer-height) + var(--modal-footer-margin-top)));
        `;
      default:
        return '';
    }
  }}
`;

const ModalFooter = styled.footer<{ hasContentHr?: boolean }>`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  height: var(--modal-footer-height);
  margin-top: var(--modal-footer-margin-top);

  ${({ hasContentHr }) => {
    return (
      hasContentHr &&
      `
      height: auto;
      margin: 0;
      padding-top: 2rem;
      border-top: 0.1rem solid var(--legacy-color-gray-100);
    `
    );
  }}

  .fc-button.custom-text {
    width: fit-content;
  }
`;

const btnStyle = css`
  width: 5.7rem;
`;

const Modal = ({
  size = 'small',
  fullScreen,
  title,
  content,
  hasCloseButton,
  hideCancelButton,
  hasContentHr,
  hideHeader,
  hideFooter,
  onConfirm,
  onCloseModal,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
  isDisableConfirmButton,
}: ModalProps) => {
  const { showChannelTalkButton, hideChannelTalkButton } = useChannelTalk();

  useEffect(() => {
    hideChannelTalkButton();

    return () => {
      showChannelTalkButton();
    };
  }, []);

  return (
    <Portal>
      <ModalWrapper>
        <ModalBlock size={size} fullScreen={fullScreen}>
          {!hideHeader && (
            <ModalHeader hasContentHr={hasContentHr}>
              {title}
              {hasCloseButton && <CloseLarge onClick={onCloseModal} />}
            </ModalHeader>
          )}
          <ModalContent size={size}>
            <div>{content}</div>
          </ModalContent>
          {!hideFooter && (
            <ModalFooter hasContentHr={hasContentHr}>
              {!hideCancelButton && (
                <Button
                  css={btnStyle}
                  theme="white"
                  size="medium"
                  onClick={onCloseModal}
                  className={classNames([{ 'custom-text': (cancelButtonText as string).length > 2 }])}
                  data-e2e="modal-cancel"
                >
                  {cancelButtonText}
                </Button>
              )}
              <Button
                css={btnStyle}
                theme="primary"
                size="medium"
                onClick={onConfirm}
                disabled={isDisableConfirmButton}
                className={classNames([{ 'custom-text': (confirmButtonText as string).length > 2 }])}
                data-e2e="modal-confirm"
              >
                {confirmButtonText}
              </Button>
            </ModalFooter>
          )}
        </ModalBlock>
      </ModalWrapper>
    </Portal>
  );
};

export default Modal;
