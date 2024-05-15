import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/utils';

import type { BreakPointType, FontWeightType, TypographyType, HomeBreakPointType } from '@/types/design-system.type';

import { ClassroomBreakPoints, HomeBreakPoints } from '@/shared/policy';

const fontWeightMap: Record<FontWeightType, SerializedStyles> = {
  regular: css`
    font-weight: 400;
  `,
  bold: css`
    font-weight: 600;
  `,
};

const legacyTypographyMixinMap: Record<TypographyType, SerializedStyles> = {
  h1: css`
    font-size: var(--typography-font-size-40);
    line-height: var(--typography-line-height-60);
  `,
  h2: css`
    font-size: var(--typography-font-size-32);
    line-height: var(--typography-line-height-48);
  `,
  h3: css`
    font-size: var(--typography-font-size-28);
    line-height: var(--typography-line-height-42);
  `,
  h4: css`
    font-size: var(--typography-font-size-24);
    line-height: var(--typography-line-height-36);
  `,
  h5: css`
    font-size: var(--typography-font-size-20);
    line-height: var(--typography-line-height-32);
  `,
  h6: css`
    font-size: var(--typography-font-size-18);
    line-height: var(--typography-line-height-28);
  `,
  p1: css`
    font-size: var(--typography-font-size-16);
    line-height: var(--typography-line-height-24);
  `,
  p2: css`
    font-size: var(--typography-font-size-14);
    line-height: var(--typography-line-height-24);
  `,
  p3: css`
    font-size: var(--typography-font-size-12);
    line-height: var(--typography-line-height-16);
  `,
};

export const typographyMixin = (type: TypographyType, weight: FontWeightType = 'regular'): SerializedStyles => {
  return css`
    ${legacyTypographyMixinMap[type]};
    ${fontWeightMap[weight]};
  `;
};

const classroomBreakingPointMap: Record<BreakPointType, string> = {
  small: `(min-width: ${ClassroomBreakPoints.SMALL_MIN}px) and (max-width: ${ClassroomBreakPoints.SMALL_MAX}px)`,
  medium: `(min-width: ${ClassroomBreakPoints.MEDIUM_MIN}px) and (max-width: ${ClassroomBreakPoints.MEDIUM_MAX}px)`,
  large: `(min-width: ${ClassroomBreakPoints.LARGE_MIN}px)`,
};

export const classroomMedia = (...types: BreakPointType[]): string => {
  return `@media ${types.map((type) => `screen and ${classroomBreakingPointMap[type]}`).join(',')}`;
};

const homeBreakingPointMap: Record<HomeBreakPointType, string> = {
  small: `(min-width: ${HomeBreakPoints.SMALL_MIN}px) and (max-width: ${HomeBreakPoints.SMALL_MAX}px)`,
  medium: `(min-width: ${HomeBreakPoints.MEDIUM_MIN}px) and (max-width: ${HomeBreakPoints.MEDIUM_MAX}px)`,
  large: `(min-width: ${HomeBreakPoints.LARGE_MIN}px) and (max-width: ${HomeBreakPoints.LARGE_MAX}px)`,
  xlarge: `(min-width: ${HomeBreakPoints.XLARGE_MIN}px)`,
};

export const homeMedia = (...types: HomeBreakPointType[]): string => {
  return `@media ${types.map((type) => `screen and ${homeBreakingPointMap[type]}`).join(',')}`;
};

export const textEllipsis = (lines = 1) =>
  lines === 1
    ? `
    overflow: hidden;

    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
`
    : `
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
    word-wrap: normal;
`;

export const invisibleScrollBar = () => `
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
