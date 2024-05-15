import { css } from '@emotion/react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

export const NoticePrimaryBadgeStyle = css`
  margin-right: 0.8rem;
  padding: 0.2rem 0.4rem;
  font-weight: 500;
  ${legacyTypographyMixin('XXSmall')};
`;
