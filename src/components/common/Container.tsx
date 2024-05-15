import styled from '@emotion/styled';

import { media } from '@/styles/legacy-mixins';

const Container = styled.div`
  margin: 0 auto;

  ${media('small')} {
    margin: 0 1.6rem;
  }

  ${media('medium')} {
    width: 52.8rem;
  }

  ${media('large')} {
    width: 112rem;
  }
`;

export default Container;
