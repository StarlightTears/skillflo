import styled from '@emotion/styled';
import React from 'react';

import { HomeContainer } from '@/components';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

const FooterBlock = styled.footer`
  height: var(--layout-footer-mobile-height);
  padding: 2.6rem 0 4.4rem;
  border-top: 0.1rem solid var(--legacy-color-gray-100);

  ${media('large')} {
    height: var(--layout-footer-desktop-height);
  }
`;

const Copyright = styled.span`
  ${legacyTypographyMixin('caption')}
  margin-left: 8.6rem;
  color: var(--legacy-color-gray-400);

  ${media('large')} {
    margin-left: 9.6rem;
  }
`;

const InfoBlock = styled.div`
  display: flex;

  margin-bottom: 1.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  & .info-title {
    width: 8.6rem;
    height: 2rem;

    font-weight: 700;
    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-100);

    ${media('small', 'medium')} {
      flex-shrink: 0;
    }

    ${media('large')} {
      width: 9.6rem;
    }
  }

  & .info-content {
    display: flex;
    align-items: center;

    margin-bottom: 0.6rem;

    &:last-child {
      margin-bottom: 0;
    }

    li {
      ${legacyTypographyMixin('caption')}
      color: var(--legacy-color-gray-400);

      &.link {
        cursor: pointer;
      }

      strong {
        font-weight: 700;
      }
    }

    & .divider {
      height: 1.1rem;
      margin: 0 0.6rem;
      border-right: 0.1rem solid var(--legacy-color-gray-400);
    }
  }

  ${media('small', 'medium')} {
    & .info-content:not(.permanent) {
      flex-direction: column;
      align-items: flex-start;

      li {
        margin-bottom: 0.4rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    & .divider:not(.permanent) {
      display: none;
    }
  }

  ${media('large')} {
    margin-bottom: 2.4rem;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <HomeContainer>
        <InfoBlock>
          <span className="info-title">Service</span>
          <ul className="info-content permanent">
            <li
              className="link"
              onClick={() => {
                window.open('https://b2b.fastcampus.co.kr');
              }}
            >
              <strong>기업서비스 안내</strong>
            </li>
            <div className="divider permanent" />
            <li
              className="link"
              onClick={() => {
                window.open('https://fastcampus.co.kr/info/policies/privacy');
              }}
            >
              <strong>개인정보 처리방침</strong>
            </li>
          </ul>
        </InfoBlock>
        <InfoBlock>
          <span className="info-title">Company</span>
          <div>
            <ul className="info-content permanent">
              <li>
                <strong>Fastcampus for Business</strong>
              </li>
              <div className="divider permanent" />
              <li>
                <strong>(주)데이원컴퍼니</strong>
              </li>
            </ul>
            <ul className="info-content">
              <li>대표이사 : 이강민</li>
              <div className="divider" />
              <li>개인정보책임관리자 : 이강민</li>
              <div className="divider" />
              <li>사업자번호 : 810-86-00658</li>
              <div className="divider" />
              <li>사무실 : 서울특별시 강남구 테헤란로 231, 센터필드 WEST 6층,7층</li>
            </ul>
          </div>
        </InfoBlock>
        <Copyright>© 2022 day1company All rights reserved </Copyright>
      </HomeContainer>
    </FooterBlock>
  );
};

export default Footer;
