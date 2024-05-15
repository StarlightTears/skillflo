import { css } from '@emotion/react';
import React from 'react';

import { Button as FCButton } from '@fastcampus/fastcomponents';
import type { ButtonProps as FCButtonProps } from '@fastcampus/fastcomponents';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

type ButtonTheme = 'primary' | 'outline' | 'white';
type ButtonSize = 'small' | 'medium' | 'xmedium' | 'large';
type ButtonShape = 'default' | 'round';

interface ButtonProps extends FCButtonProps {
  theme: ButtonTheme;
  size?: ButtonSize;
  shape?: ButtonShape;
}

interface ButtonStyleProps {
  theme: ButtonTheme;
  disabled?: boolean;
  size?: ButtonSize;
  shape?: ButtonShape;
}

const commonBtnStyle = css`
  width: 100%;
  border-style: none;
  ${legacyTypographyMixin('button')};
  font-weight: 700;
  cursor: pointer;
`;

const getBtnThemeStyle = (theme: ButtonTheme) => {
  switch (theme) {
    case 'primary': {
      return css`
        background-color: var(--color-blue-600);
        color: white;

        &:hover {
          background-color: var(--color-blue-600);
        }
      `;
    }
    case 'outline': {
      return css`
        ${legacyTypographyMixin('body1')}
        background-color: var(--color-white);
        outline: 0.1rem solid var(--color-blue-600);
        color: var(--color-blue-600);

        &:hover {
          background-color: var(--color-lightblue-background);
        }
      `;
    }
    case 'white': {
      return css`
        background-color: var(--color-white);
        color: var(--color-blue-600);

        &:hover {
          background-color: var(--color-white);
        }
      `;
    }
  }
};

const getDisabledBtnStyle = (disabled: boolean | undefined) => {
  if (disabled) {
    return css`
      opacity: 0.3;
      cursor: not-allowed;
    `;
  } else return css``;
};

const getBtnSizeStyle = (size: ButtonSize | undefined) => {
  switch (size) {
    case 'large': {
      return css`
        height: 5.6rem;
        padding: 1.6rem 0;
        border-radius: 1rem;
      `;
    }
    case 'xmedium': {
      return css`
        height: 4.8rem;
        padding: 1.2rem 2rem;
        border-radius: 0.6rem;
      `;
    }
    case 'medium': {
      return css`
        height: 4rem;
        padding: 1rem 1.6rem;
        border-radius: 0.6rem;
      `;
    }
    case 'small':
    default: {
      return css`
        height: 3.2rem;
        padding: 0.8rem 1.4rem;
        border-radius: 0.4rem;

        ${legacyTypographyMixin('caption')}
      `;
    }
  }
};

const getBtnShapeStyle = (shape: ButtonShape) => {
  if (shape === 'round') {
    return css`
      border-radius: 4rem;
    `;
  } else return css``;
};

const getBtnStyle = ({ theme, disabled, size, shape = 'default' }: ButtonStyleProps) => {
  return css`
    ${commonBtnStyle}
    ${getBtnThemeStyle(theme)}
    ${getDisabledBtnStyle(disabled)}
    ${getBtnSizeStyle(size)}
    ${getBtnShapeStyle(shape)}
  `;
};

const Button = ({ children, disabled, onClick, className, theme, size, shape, ...restProps }: ButtonProps) => {
  return (
    <FCButton
      css={getBtnStyle({ theme, disabled, size, shape })}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </FCButton>
  );
};

export default Button;
