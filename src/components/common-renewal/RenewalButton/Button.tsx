import { css } from '@emotion/react';
import React from 'react';

import { Button as FCButton } from '@fastcampus/fastcomponents';
import type { ButtonProps as FCButtonProps } from '@fastcampus/fastcomponents';

import LoadingSpinner from '../LoadingSpinner';

import { INFORMATIVE_COLOR_PLATTE } from '@/shared/policy';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';

type ButtonTheme = 'solid' | 'outline' | 'text';
export type ButtonColor = 'accent' | 'alert' | 'gray';
type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps extends FCButtonProps {
  theme?: ButtonTheme;
  color?: ButtonColor;
  size?: ButtonSize;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}

interface ButtonStyleProps {
  theme: ButtonTheme;
  disabled?: boolean;
  size: ButtonSize;
  color: ButtonColor;
}

interface ButtonColorMap {
  text: {
    default: string;
    hover?: string;
    disabled?: string;
  };
  background?: {
    default: string;
    hover?: string;
    disabled?: string;
  };
  border?: {
    default: string;
    disabled?: string;
  };
}

const commonBtnStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-style: none;
  cursor: pointer;
`;

const getBtnSizeStyle = (size: ButtonSize, isTextButton: boolean = false) => {
  if (isTextButton) {
    switch (size) {
      case 'large': {
        return css`
          gap: 0.4rem;
          ${renewalTypographyMixin('label', 2, true)}

          svg {
            width: 1.6rem;
            height: 1.6rem;
          }
        `;
      }
      case 'medium': {
        return css`
          gap: 0.4rem;
          ${renewalTypographyMixin('label', 3, true)}

          svg {
            width: 1.2rem;
            height: 1.2rem;
          }
        `;
      }
      case 'small': {
        return css`
          gap: 0.2rem;
          ${renewalTypographyMixin('label', 4)}

          svg {
            width: 1rem;
            height: 1rem;
          }
        `;
      }
    }
  }
  switch (size) {
    case 'large': {
      return css`
        gap: 0.6rem;
        min-width: 4.8rem;
        height: 4.8rem;
        padding: 0 1.4rem;

        ${renewalTypographyMixin('label', 2, true)}

        svg {
          width: 1.6rem;
          height: 1.6rem;
        }
      `;
    }
    case 'medium': {
      return css`
        gap: 0.4rem;
        min-width: 4rem;
        height: 4rem;
        padding: 0 1rem;
        ${renewalTypographyMixin('label', 3, true)}

        svg {
          width: 1.6rem;
          height: 1.6rem;
        }
      `;
    }
    case 'small': {
      return css`
        gap: 0.4rem;
        min-width: 3.6rem;
        height: 3.2rem;
        padding: 0 1rem;
        ${renewalTypographyMixin('label', 3, true)}

        svg {
          width: 1.2rem;
          height: 1.2rem;
        }
      `;
    }
  }
};

const buttonColorMap: Record<ButtonTheme, Record<ButtonColor, ButtonColorMap>> = {
  solid: {
    accent: {
      text: {
        default: `var(--color-white)`,
        disabled: `var(--color-white)`,
      },
      background: {
        default: `var(--color-semantic-informative-accent)`,
        hover: `var(--color-semantic-informative-accent-hover)`,
        disabled: `${INFORMATIVE_COLOR_PLATTE.accent}25`,
      },
    },
    alert: {
      text: {
        default: `var(--color-white)`,
        disabled: `var(--color-white)`,
      },
      background: {
        default: `var(--color-semantic-informative-alert)`,
        hover: `var(--color-semantic-informative-alert-hover)`,
        disabled: `${INFORMATIVE_COLOR_PLATTE.alert}25`,
      },
    },
    gray: {
      text: {
        default: `var(--color-semantic-informative-primary)`,
        disabled: `var(--color-semantic-informative-teritary)`,
      },
      background: {
        default: `var(--color-gray-50)`,
        hover: `var(--color-semantic-status-gray-hover)`,
        disabled: `var(--color-semantic-paper-surface-default)`,
      },
    },
  },
  outline: {
    accent: {
      text: {
        default: `var(--color-semantic-informative-accent)`,
        disabled: `${INFORMATIVE_COLOR_PLATTE.accent}25`,
      },
      background: {
        default: `var(--color-white)`,
        hover: `var(--color-semantic-paper-surface-default)`,
        disabled: `var(--color-white)`,
      },
      border: {
        default: `var(--color-semantic-divider-default)`,
        disabled: `var(--color-gray-50)`,
      },
    },
    alert: {
      text: {
        default: `var(--color-semantic-informative-alert)`,
        disabled: `${INFORMATIVE_COLOR_PLATTE.alert}25`,
      },
      background: {
        default: `var(--color-white)`,
        hover: `var(--color-semantic-paper-surface-default)`,
        disabled: `var(--color-white)`,
      },
      border: {
        default: `var(--color-semantic-divider-default)`,
        disabled: `var(--color-gray-50)`,
      },
    },
    gray: {
      text: {
        default: `var(--color-semantic-informative-primary)`,
        disabled: `var(--color-semantic-informative-teritary)`,
      },
      background: {
        default: `var(--color-white)`,
        hover: `var(--color-semantic-paper-surface-default)`,
        disabled: `var(--color-white)`,
      },
      border: {
        default: `var(--color-semantic-divider-default)`,
        disabled: `var(--color-gray-50)`,
      },
    },
  },
  text: {
    accent: {
      text: {
        default: INFORMATIVE_COLOR_PLATTE.accent,
        hover: `var(--color-semantic-informative-accent-hover)`,
        disabled: `${INFORMATIVE_COLOR_PLATTE.accent}25`,
      },
    },
    alert: {
      text: {
        default: INFORMATIVE_COLOR_PLATTE.alert,
        hover: `var(--color-semantic-informative-alert-hover)`,
        disabled: `${INFORMATIVE_COLOR_PLATTE.alert}25`,
      },
    },
    gray: {
      text: {
        default: `var(--color-semantic-informative-primary)`,
        hover: `var(--color-semantic-informative-accent)`,
        disabled: `var(--color-semantic-informative-teritary)`,
      },
    },
  },
};

const getBtnColorStyle = (color: ButtonColor, theme: ButtonTheme) => {
  return css`
    border: ${theme === 'text' ? 'none' : `0.1rem solid ${buttonColorMap[theme][color].border?.default}`};
    border-radius: ${theme === 'text' ? 'none' : '0.4rem'};
    background-color: ${theme === 'text' ? 'transparent' : `${buttonColorMap[theme][color].background?.default}`};
    color: ${buttonColorMap[theme][color].text.default};

    svg {
      fill: ${buttonColorMap[theme][color].text.default};

      path {
        fill: ${buttonColorMap[theme][color].text.default};
      }
    }

    &:hover {
      background-color: ${buttonColorMap[theme][color].background?.hover};
      color: ${buttonColorMap[theme][color].text.hover};

      svg {
        fill: ${buttonColorMap[theme][color].text.hover};

        path {
          fill: ${buttonColorMap[theme][color].text.hover};
        }
      }
    }

    :disabled {
      border-color: ${buttonColorMap[theme][color].border?.disabled};
      background-color: ${buttonColorMap[theme][color].background?.disabled};
      color: ${buttonColorMap[theme][color].text.disabled};

      svg {
        fill: ${buttonColorMap[theme][color].text.disabled};

        path {
          fill: ${buttonColorMap[theme][color].text.disabled};
        }
      }
    }
  `;
};

const getBtnStyle = ({ theme, size, color }: ButtonStyleProps) => {
  return css`
    ${commonBtnStyle}
    ${getBtnSizeStyle(size, theme === 'text')}
    ${getBtnColorStyle(color, theme)}
  `;
};

const Button = ({
  children,
  theme = 'solid',
  color = 'accent',
  size = 'large',
  disabled = false,
  prefixIcon,
  suffixIcon,
  isLoading,
  ...restProps
}: ButtonProps) => {
  return (
    <FCButton css={getBtnStyle({ theme, disabled, size, color })} disabled={disabled} {...restProps}>
      {theme !== 'text' && isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {prefixIcon}
          {children}
          {suffixIcon}
        </>
      )}
    </FCButton>
  );
};

export default Button;
