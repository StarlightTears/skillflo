import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { Notice } from '@/types/common.interface';

import { ArrowRight, Badge } from '@/components';
import { useInterval } from '@/shared/hooks';
import { isPrimaryNotice } from '@/shared/utils/notice';
import { NoticePrimaryBadgeStyle } from '@/styles/custom';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia } from '@/styles/mixins';

interface NoticePreviewProps {
  noticeList: Notice[];
}

const initAnimation = keyframes`
  from {
    background: var(--color-surface-blue);
    color: var(--color-white);
  }
  to {
    background: var(--color-white);
    color: var(--color-text-black);
  }
`;

const NoticeTopWrapper = styled.div<{ isDropdownOpen: boolean; noticeCnt: number }>`
  position: relative;
  display: flex;
  align-items: ${({ isDropdownOpen }) => (isDropdownOpen ? 'flex-start' : 'center')};
  justify-content: space-between;
  padding: 0.8rem 5rem;
  border-bottom: 0.1rem solid var(--color-hr);
  animation: ${initAnimation} 1.5s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: backwards;

  .heading-wrapper {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    height: var(--layout-top-notice-item-height);
  }

  h1 {
    ${legacyTypographyMixin('Medium')}
    padding-right: 4rem;

    ${homeMedia('small')} {
      display: ${({ isDropdownOpen }) => (isDropdownOpen ? 'block' : 'none')};
    }
  }

  .notice-wrapper {
    flex: 1 1;
    overflow: hidden;

    ${homeMedia('small')} {
      ${({ isDropdownOpen }) => {
        if (isDropdownOpen) {
          return `
            width:calc(100% - 4rem);
            position: absolute;
            top: 6.4rem;
          `;
        } else {
          return `
            position: relative;
          `;
        }
      }};
    }
  }

  ul {
    width: 100%;

    li {
      display: ${({ isDropdownOpen }) => (isDropdownOpen ? 'block' : 'none')};
      height: var(--layout-top-notice-item-height);
      padding: 0.6rem 0;
      cursor: pointer;

      &:not(:last-of-type) {
        border-bottom: ${({ isDropdownOpen }) =>
          isDropdownOpen ? '0.1rem solid var(--color-border-black-5)' : 'none'};
      }

      .notice-title {
        overflow: hidden;
        width: 90%;
        ${legacyTypographyMixin('Medium')};
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  ${homeMedia('small')} {
    height: ${({ isDropdownOpen, noticeCnt }) =>
      isDropdownOpen &&
      `calc(var(--layout-top-notice-item-height) * ${noticeCnt} + var(--layout-top-notice-mobile-without-item-height))`};
    padding: 0.8rem 2rem;
  }

  ${homeMedia('medium')} {
    padding: 0.8rem 4rem;
  }

  ${homeMedia('xlarge')} {
    display: none;
  }
`;

const DropdownButton = styled.div<{ isDropdownOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: var(--layout-top-notice-item-height);
  cursor: pointer;
  transition: transform 0.3s ease-out;
  transform: ${({ isDropdownOpen }) => (isDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const TextLink = styled.div`
  display: flex;
  align-items: center;
  margin: 2.6rem 0 1.8rem;
  font-weight: 500;
  color: var(--color-blue-600);
  ${legacyTypographyMixin('Small')}
`;

const NoticeTop = ({ noticeList }: NoticePreviewProps) => {
  const noticeCnt = noticeList.length;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(noticeCnt);
  const navigate = useNavigate();

  useInterval(
    () => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex === 1 ? noticeCnt : prevIndex - 1));
    },
    [isDropdownOpen],
    5000
  );

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <NoticeTopWrapper isDropdownOpen={isDropdownOpen} noticeCnt={noticeCnt}>
      <div className="heading-wrapper">
        <h1>공지사항</h1>
      </div>
      <div className="notice-wrapper">
        <ul>
          {noticeList.map((notice) => {
            return (
              <li
                css={css`
                  :nth-of-type(${currentNoticeIndex}) {
                    display: block;
                  }
                `}
                key={notice.id}
                onClick={() => navigate(`/notice/${notice.id}`)}
              >
                <div className="notice-title">
                  {isPrimaryNotice(notice.extras.priority) && (
                    <Badge theme="whiteblue" css={NoticePrimaryBadgeStyle}>
                      필독
                    </Badge>
                  )}
                  {notice.name}
                </div>
              </li>
            );
          })}
        </ul>
        {isDropdownOpen && (
          <Link to={'/mypage/notice'}>
            <TextLink>
              전체보기 <ArrowRight />
            </TextLink>
          </Link>
        )}
      </div>

      <DropdownButton onClick={handleDropdown} isDropdownOpen={isDropdownOpen}>
        <ArrowRight />
      </DropdownButton>
    </NoticeTopWrapper>
  );
};

export default NoticeTop;
