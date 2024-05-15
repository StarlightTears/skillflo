import styled from '@emotion/styled';
import React, { ComponentProps, MouseEventHandler } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { Button } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type ButtonClickEventListener = MouseEventHandler<HTMLButtonElement>;

interface ButtonGroupProps {
  onClickSubmit?: ButtonClickEventListener;
  onClickCancel?: ButtonClickEventListener;
  submitButtonText?: string;
  cancelButtonText?: string;
  hideCancel?: boolean;
  disabledSubmit?: boolean;
  buttonSize?: ComponentProps<typeof Button>['size'];
}

const ButtonGroupBlock = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;

  .button {
    width: auto;

    ${legacyTypographyMixin('button')}
  }
`;

const ButtonGroup = ({
  onClickCancel,
  onClickSubmit,
  cancelButtonText = '취소',
  submitButtonText = '저장',
  hideCancel,
  disabledSubmit,
  buttonSize = 'medium',
  className,
}: PropsWithStyle<ButtonGroupProps>) => {
  return (
    <ButtonGroupBlock className={className}>
      {!hideCancel && (
        <Button size={buttonSize} theme="outline" className="button cancel" onClick={onClickCancel} type="reset">
          {cancelButtonText}
        </Button>
      )}
      <Button
        size={buttonSize}
        theme="primary"
        className="button submit"
        onClick={onClickSubmit}
        type="submit"
        disabled={disabledSubmit}
      >
        {submitButtonText}
      </Button>
    </ButtonGroupBlock>
  );
};

export default ButtonGroup;
