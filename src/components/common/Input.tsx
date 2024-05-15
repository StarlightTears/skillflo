import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Input as FCInput } from '@fastcampus/fastcomponents';
import type { InputProps as FCInputProps } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface InputProps extends FCInputProps {
  label?: string;
  validation?: Validation;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
}

type Validation = {
  isValid: boolean;
  validationMessage: string;
};

const InputBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  label {
    color: var(--legacy-color-gray-400);
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1.6rem;
    pointer-events: none;
    transform: translateY(-50%);

    path {
      fill: var(--legacy-color-gray-100);
    }
  }
`;

const ValidationBlock = styled.div`
  ${legacyTypographyMixin('caption')}
  margin-top: 0.8rem;
  color: var(--color-red-700);
`;

const defaultLabelStyle = css`
  ${legacyTypographyMixin('caption')}
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: var(--legacy-color-gray-400);
`;

const defaultInputStyle = css`
  height: 4.8rem;
  border: 0.1rem solid var(--legacy-color-gray-100);
  border-radius: 0.6rem;
  text-indent: 1.6rem;
  ${legacyTypographyMixin('body2')};

  &::placeholder {
    color: var(--legacy-color-gray-200);
  }

  &:focus {
    outline: 0.1rem solid var(--color-blue-600);

    & + svg {
      path {
        fill: var(--color-blue-600);
      }
    }
  }
`;

const invalidInputStyle = css`
  outline: 0.1rem solid var(--color-red-700);
  color: var(--color-red-700);

  &:focus {
    outline-color: var(--color-red-700);
  }
`;

const getInputPaddingStyle = (hasIcon: boolean) => {
  if (!hasIcon) {
    return;
  }

  return css`
    padding-left: 3.2rem;
  `;
};

const getInputStyle = ({ isInvalid, hasIcon }: { isInvalid: boolean; hasIcon: boolean }) => {
  return css`
    ${defaultInputStyle}
    ${isInvalid ? invalidInputStyle : ''}
    ${getInputPaddingStyle(hasIcon)}
  `;
};

const Input = ({
  label,
  className,
  type,
  placeholder,
  value,
  validation,
  onChange,
  icon,
  ...restProps
}: InputProps) => {
  const [isInputBlur, setIsInputBlur] = useState(false);
  const isInvalid = Boolean(isInputBlur && validation?.validationMessage);
  const hasIcon = !!icon;

  return (
    <InputBlock className={`fc-input ${className}`}>
      {label && <label css={defaultLabelStyle}>{label}</label>}
      <FCInput
        css={getInputStyle({ isInvalid, hasIcon })}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsInputBlur(false)}
        onBlur={() => setIsInputBlur(true)}
        {...restProps}
      />
      {icon}
      {isInvalid && <ValidationBlock>{validation?.validationMessage}</ValidationBlock>}
    </InputBlock>
  );
};

export default Input;
