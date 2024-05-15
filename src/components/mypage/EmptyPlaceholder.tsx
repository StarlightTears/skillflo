import styled from '@emotion/styled';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const EmptyPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  padding: 4.8rem 0 0;

  ${legacyTypographyMixin('body2')}
  font-weight: 700;
  color: var(--legacy-color-gray-700);
`;

export default EmptyPlaceholder;
