import { SerializedStyles, css } from '@emotion/react';

type RenewalTypographyType = 'heading' | 'title' | 'body' | 'caption' | 'label';

const typographyMixinsMap = {
  heading: [
    css`
      font-weight: var(--typography-font-weight-bold);
      font-size: var(--typography-font-size-40);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    css`
      font-weight: var(--typography-font-weight-bold);
      font-size: var(--typography-font-size-32);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
  ],
  title: [
    css`
      font-weight: var(--typography-font-weight-bold);
      font-size: var(--typography-font-size-28);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    css`
      font-weight: var(--typography-font-weight-bold);
      font-size: var(--typography-font-size-24);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    css`
      font-weight: var(--typography-font-weight-bold);
      font-size: var(--typography-font-size-20);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
  ],
  body: [
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-18);
      line-height: var(--typography-line-height-medium);
      letter-spacing: var(--typography-letter-spacing-none);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-16);
      line-height: var(--typography-line-height-medium);
      letter-spacing: var(--typography-letter-spacing-none);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-15);
      line-height: var(--typography-line-height-medium);
      letter-spacing: var(--typography-letter-spacing-none);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-14);
      line-height: var(--typography-line-height-medium);
      letter-spacing: var(--typography-letter-spacing-none);
    `,
  ],
  caption: [
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-13);
      line-height: var(--typography-line-height-medium);
      letter-spacing: var(--typography-letter-spacing-none);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-12);
      line-height: var(--typography-line-height-medium);
      letter-spacing: var(--typography-letter-spacing-none);
    `,
  ],
  label: [
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-16);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-15);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-14);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-12);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
    (isBold) => css`
      font-weight: ${isBold ? 'var(--typography-font-weight-semibold)' : 'var(--typography-font-weight-regular)'};
      font-size: var(--typography-font-size-10);
      line-height: var(--typography-line-height-small);
      letter-spacing: var(--typography-letter-spacing-wide);
    `,
  ],
} satisfies Record<RenewalTypographyType, SerializedStyles[] | ((isBold?: boolean) => SerializedStyles)[]>;

interface RenewalTypographyMixin {
  (type: 'heading', level: 1 | 2): SerializedStyles;
  (type: 'title', level: 1 | 2 | 3): SerializedStyles;
  (type: 'body', level: 1 | 2 | 3 | 4, isBold?: boolean): SerializedStyles;
  (type: 'caption', level: 1 | 2, isBold?: boolean): SerializedStyles;
  (type: 'label', level: 1 | 2 | 3 | 4 | 5, isBold?: boolean): SerializedStyles;
}

export const renewalTypographyMixin: RenewalTypographyMixin = (
  type: RenewalTypographyType,
  level: number,
  isBold?: boolean
) => {
  const target = typographyMixinsMap[type][level - 1];

  return typeof target === 'function' ? target(isBold) : target;
};
