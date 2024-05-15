import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/utils';

import type { BreakPointType } from '@/types/design-system.type';

import { BreakPoints } from '@/shared/policy';

type TypographyType =
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headline5'
  | 'headline6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption'
  | 'button'
  | 'label'
  | 'XXSmall'
  | 'XSmall'
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'XLarge'
  | 'XXLarge';

const legacyTypographyMixinMap: Record<TypographyType, SerializedStyles> = {
  headline1: css`
    font-size: var(--typography-font-size-40);
    line-height: var(--typography-line-height-52);
  `,
  headline2: css`
    font-size: var(--typography-font-size-32);
    line-height: var(--typography-line-height-44);
  `,
  headline3: css`
    font-size: var(--typography-font-size-28);
    line-height: var(--typography-line-height-40);
  `,
  headline4: css`
    font-size: var(--typography-font-size-24);
    line-height: var(--typography-line-height-32);
  `,
  headline5: css`
    font-size: var(--typography-font-size-20);
    line-height: var(--typography-line-height-32);
  `,
  headline6: css`
    font-size: var(--typography-font-size-18);
    line-height: var(--typography-line-height-24);
  `,
  body1: css`
    font-size: var(--typography-font-size-16);
    line-height: var(--typography-line-height-24);
  `,
  body2: css`
    font-size: var(--typography-font-size-14);
    line-height: var(--typography-line-height-20);
  `,
  body3: css`
    font-size: var(--typography-font-size-15);
    line-height: var(--typography-line-height-21);
  `,
  caption: css`
    font-size: var(--typography-font-size-12);
    line-height: var(--typography-line-height-16);
  `,
  button: css`
    font-size: var(--typography-font-size-14);
    line-height: var(--typography-line-height-20);
  `,
  label: css`
    font-size: var(--typography-font-size-10);
    line-height: var(--typography-line-height-12);
  `,
  XXSmall: css`
    font-size: var(--typography-font-size-12);
    line-height: var(--typography-line-height-16);
  `,
  XSmall: css`
    font-size: var(--typography-font-size-13);
    line-height: var(--typography-line-height-20);
  `,
  Small: css`
    font-size: var(--typography-font-size-14);
    line-height: var(--typography-line-height-20);
  `,
  Medium: css`
    font-size: var(--typography-font-size-15);
    line-height: var(--typography-line-height-22);
  `,
  Large: css`
    font-size: var(--typography-font-size-16);
    line-height: var(--typography-line-height-24);
  `,
  XLarge: css`
    font-size: var(--typography-font-size-20);
    line-height: var(--typography-line-height-28);
  `,
  XXLarge: css`
    font-size: var(--typography-font-size-32);
    line-height: var(--typography-line-height-40);
  `,
};

export const legacyTypographyMixin = (type: TypographyType): SerializedStyles => {
  return legacyTypographyMixinMap[type];
};

const breakingPointMap: Record<BreakPointType, string> = {
  small: `(min-width: ${BreakPoints.SMALL_MIN}px) and (max-width: ${BreakPoints.SMALL_MAX}px)`,
  medium: `(min-width: ${BreakPoints.MEDIUM_MIN}px) and (max-width: ${BreakPoints.MEDIUM_MAX}px)`,
  large: `(min-width: ${BreakPoints.LARGE_MIN}px)`,
};

export const media = (...types: BreakPointType[]): string => {
  return `@media ${types.map((type) => `screen and ${breakingPointMap[type]}`).join(',')}`;
};
