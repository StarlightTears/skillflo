import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

import { Button as FCButton } from '@fastcampus/fastcomponents';
import type { ButtonProps as FCButtonProps } from '@fastcampus/fastcomponents';

import CenterAlignBlock from '../common/CenterAlignBlock';

import { homeMedia, typographyMixin } from '@/styles/mixins';

export type ButtonTheme = 'primary' | 'outline' | 'none-line' | 'none';
type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'fixed';

interface ButtonProps extends FCButtonProps {
  theme: ButtonTheme;
  size: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  toggle?: ToggleProps;
}

interface ButtonStyleProps {
  theme: ButtonTheme;
  disabled?: boolean;
  size: ButtonSize;
}

interface ToggleProps {
  isActive: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

const CommonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: none;
  border-radius: 0.4rem;
  ${typographyMixin('p2', 'bold')}
  cursor: pointer;

  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.active {
    color: var(--color-primary-700);
  }
`;

const ThemeStyleMap = new Map<ButtonTheme, SerializedStyles>();
ThemeStyleMap.set(
  'primary',
  css`
    background-color: var(--color-primary-700);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-primary-800);
    }
  `
);
ThemeStyleMap.set(
  'outline',
  css`
    border: 0.1rem solid var(--color-gray-200);
    background-color: var(--color-white);
    color: var(--color-gray-700);

    svg {
      path {
        fill: currentcolor;
      }
    }

    &:hover {
      color: var(--color-primary-700);
    }
  `
);
ThemeStyleMap.set(
  'none-line',
  css`
    background-color: var(--color-white);
    color: var(--color-primary-700);

    &:hover {
      background-color: var(--color-primary-700-transparency-10);
    }
  `
);
ThemeStyleMap.set(
  'none',
  css`
    background-color: transparent;
  `
);

const getThemeStyle = (theme: ButtonTheme, disabled?: boolean) => {
  if (theme === 'none-line' && disabled) {
    return css`
      ${ThemeStyleMap.get(theme)};
      color: var(--color-gray-200);
    `;
  }
  return ThemeStyleMap.get(theme);
};

const SizeStyleMap = new Map<ButtonSize, SerializedStyles>();

SizeStyleMap.set(
  'fixed',
  css`
    width: 32.8rem;
    height: 5.6rem;
    padding: 0.8rem 1.6rem;
    ${typographyMixin('p1', 'bold')}
  `
);
SizeStyleMap.set(
  'large',
  css`
    height: 4.8rem;
    padding: 1.2rem 2.4rem;
    ${typographyMixin('p1', 'bold')}
  `
);
SizeStyleMap.set(
  'medium',
  css`
    height: 4rem;
    padding: 0.8rem 1.6rem;
  `
);
SizeStyleMap.set(
  'small',
  css`
    height: 3.2rem;
    padding: 0.4rem 1.2rem;
  `
);
SizeStyleMap.set(
  'xsmall',
  css`
    height: 2.4rem;
    padding: 0;
  `
);

const getSizeStyle = (size: ButtonSize) => {
  return SizeStyleMap.get(size);
};

const getStyle = ({ theme, disabled, size }: ButtonStyleProps) => {
  return css`
    ${CommonStyle};
    ${getThemeStyle(theme, disabled)};
    ${getSizeStyle(size)};
  `;
};

const IconBlock = styled(CenterAlignBlock)`
  &.left {
    margin-right: 0.4rem;
  }

  &.right {
    margin-left: 0.4rem;
  }
`;

const ToggleIconBlock = styled(CenterAlignBlock)`
  & {
    margin-right: 0.2rem;
    ${homeMedia('large', 'xlarge')} {
      margin-right: 0.4rem;
    }
  }
`;

const Button = ({
  children,
  onClick,
  className,
  theme,
  size,
  disabled,
  leftIcon,
  rightIcon,
  toggle,
  ...restProps
}: ButtonProps) => {
  return (
    <FCButton
      css={getStyle({ theme, size, disabled })}
      className={classNames(className, { disabled, active: toggle?.isActive })}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {leftIcon && <IconBlock className="left">{leftIcon}</IconBlock>}
      {toggle && <ToggleIconBlock>{toggle.isActive ? toggle.activeIcon : toggle.inactiveIcon}</ToggleIconBlock>}
      {children}
      {rightIcon && <IconBlock className="right">{rightIcon}</IconBlock>}
    </FCButton>
  );
};

export default Button;
