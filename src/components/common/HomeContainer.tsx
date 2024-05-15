import styled from '@emotion/styled';

import { homeMedia } from '@/styles/mixins';

const HomeContainer = styled.div`
  margin: 0 auto;

  ${homeMedia('small', 'medium')} {
    margin: 0 1.6rem;
  }

  ${homeMedia('large')} {
    width: 86rem;
  }

  ${homeMedia('xlarge')} {
    width: 120rem;
  }
`;

export default HomeContainer;
