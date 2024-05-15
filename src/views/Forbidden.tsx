import styled from '@emotion/styled';
import React from 'react';

import { Logo } from '@/components';
import { media } from '@/styles/legacy-mixins';

const ForbiddenWrapper = styled.section`
  ${media('small')} {
    padding: 13.4rem 1.6rem 0;
  }

  ${media('medium')} {
    padding: 17.05rem calc((100vw - 52.8rem) / 2) 0;
  }

  ${media('large')} {
    padding: 29.05rem calc((100vw - 112rem) / 2) 0;
  }

  & header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-header);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: var(--layout-gnb-mobile-height);
    background-color: var(--color-white);

    ${media('small')} {
      padding: 0 1.6rem;
    }

    ${media('medium')} {
      padding: 0 calc((100vw - 52.8rem) / 2);
    }

    ${media('large')} {
      height: var(--layout-gnb-height);
      padding: 0 calc((100vw - 112rem) / 2);
    }
  }

  & h1 {
    font-size: 4.2rem;
    color: rgba(20 20 20 / 20%);
    line-height: 3.8rem;
  }

  & h2 {
    margin-top: 5.05rem;

    font-size: 2rem;
    color: rgba(20 20 20);
    line-height: 2.8rem;
  }

  & p {
    margin-top: 1.2rem;

    font-size: 1.5rem;
    color: rgba(20 20 20);
    line-height: 2.2rem;
  }

  & button {
    width: auto;
    margin-top: 4rem;
  }
`;

const Forbidden = () => {
  return (
    <ForbiddenWrapper>
      <header>
        <Logo />
      </header>
      <section>
        <h1>
          403
          <br />
          Forbidden
        </h1>
        <h2>죄송합니다. 해당 페이지는 접속이 어렵습니다.</h2>
        <p>접속하신 페이지의 경우 사용자 접속이 제한되어 사용하실 수 없습니다.</p>
      </section>
    </ForbiddenWrapper>
  );
};

export default Forbidden;
