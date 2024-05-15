import { css } from '@emotion/react';
import React, { PropsWithChildren } from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';

import type { PropsWithStyle } from '@/types/component.interface';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface LinkProps {
  to: string;
  disabledUnderLine?: boolean;
}

const getUnderlineStyle = (disabledUnderLine = false) => {
  return `text-decoration: ${disabledUnderLine ? 'none' : 'underline'};`;
};

const Link = ({ to, children, disabledUnderLine, ...restProps }: PropsWithStyle<PropsWithChildren<LinkProps>>) => (
  <ReactRouterDomLink
    css={css`
      ${legacyTypographyMixin('body2')}
      color: var(--legacy-color-gray-500);
      ${getUnderlineStyle(disabledUnderLine)}

      &:link {
        color: var(--legacy-color-gray-500);
        ${getUnderlineStyle(disabledUnderLine)}
      }

      &:visited {
        color: var(--legacy-color-gray-500);
        ${getUnderlineStyle(disabledUnderLine)}
      }

      &:hover {
        color: var(--legacy-color-gray-500);
        ${getUnderlineStyle(disabledUnderLine)}
      }

      &:active {
        color: var(--legacy-color-gray-500);
        ${getUnderlineStyle(disabledUnderLine)}
      }
    `}
    to={to}
    {...restProps}
  >
    {children}
  </ReactRouterDomLink>
);

export default Link;
