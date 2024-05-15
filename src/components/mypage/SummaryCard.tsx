import styled from '@emotion/styled';
import React, { FC, PropsWithChildren, ReactNode } from 'react';

import { BoxShadow, QuestionEllipseBlue } from '@/components';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

const MypageSummaryCardBlock = styled(BoxShadow)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
  border-radius: 1rem;

  .card-title {
    position: relative;
    z-index: var(--z-mypage-summary-card);
    display: flex;
    justify-content: space-between;

    ${legacyTypographyMixin('body1')}
    font-weight: 700;
    color: var(--legacy-color-gray-900);
  }

  .card-info {
    position: relative;
    height: 2rem;

    .question-icon {
      display: block;
    }

    .speech-balloons {
      position: absolute;
      top: calc(100% + 1.2rem);
      right: -0.4rem;
      display: none;
      box-sizing: border-box;
      width: calc(100vw - 5.6rem);
      padding: 2rem 2.4rem;
      border: 0.1rem solid var(--legacy-color-gray-50);
      border-radius: 0.6rem;

      background-color: var(--color-white);
      box-shadow: 0.6rem 0.6rem 4rem rgba(0 0 0 / 10%);

      /* 말풍선 관련 스타일 */
      .speech-balloons-tail {
        position: absolute;
        right: 1.9rem;
        bottom: 100%;
        width: 2.2rem;
        height: 1.4rem;

        &::before,
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          display: block;
          border-style: solid;
          border-color: transparent var(--tail-color) var(--tail-color) transparent;
        }

        &::before {
          --tail-color: var(--legacy-color-gray-50);
          right: 0;
          border-width: 0.7rem 1.1rem;
        }

        &::after {
          --tail-color: var(--color-white);
          right: 0.1rem;
          border-width: 0.6rem 1rem;
        }
      }

      .speech-balloons-list {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;

        ${legacyTypographyMixin('body2')}

        .title {
          font-weight: 700;
        }

        .content {
          font-weight: 400;
        }
      }

      ${media('medium')} {
        width: 50rem;
      }

      ${media('large')} {
        width: calc(var(--mypage-sub-page-width) / 3 - var(--mypage-summary-gap) / 2 - 2.4rem);
      }
    }

    &:hover .speech-balloons {
      display: block;
    }
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-900);
    line-height: 2.4rem;
  }
`;

interface InfoIconContent {
  title: string;
  content: string;
}

interface MypageSummaryCardProps {
  title: ReactNode;
  head: ReactNode;
  style?: React.CSSProperties;
  infoIconContentList?: InfoIconContent[];
}

const MypageSummaryCard: FC<PropsWithChildren<MypageSummaryCardProps>> = ({
  title,
  head,
  infoIconContentList,
  children,
  ...restProps
}) => {
  return (
    <MypageSummaryCardBlock {...restProps}>
      <div className="card-title">
        <span className="title-text">{title}</span>
        {infoIconContentList?.length && infoIconContentList?.length > 0 && (
          <div className="card-info">
            <QuestionEllipseBlue className="question-icon" />
            <div className="speech-balloons">
              <div className="speech-balloons-tail" />
              <ul className="speech-balloons-list">
                {infoIconContentList?.map(({ title, content }) => (
                  <li key={title}>
                    <span className="title">{title}:&nbsp;</span>
                    <span className="content">{content}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="head">{head}</div>
      <div className="body">{children}</div>
    </MypageSummaryCardBlock>
  );
};

export default MypageSummaryCard;
