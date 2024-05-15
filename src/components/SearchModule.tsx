import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLocalStorageItem, setLocalStorageItem } from '@day1co/browser-util';

import type { RecentKeyword } from '@/types/search.interface';

import { CloseLarge, Input, SearchIcon, Close, GnbSearch, Logo } from '@/components';
import { useRecommendedKeywordList } from '@/shared/hooks/search';
import { RECENT_KEYWORDS } from '@/shared/policy';
import { arrayUtil } from '@/shared/utils/arrayUtil';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

const SearchModuleBlock = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: transform 0.3s ease-out;

  header {
    display: none;
  }

  .open {
    transform: translateY(0);
  }

  & .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--legacy-color-gray-900);
    opacity: 0.8;
  }

  & .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.6rem;

    background-color: white;

    & .content {
      position: relative;

      & .close-icon {
        position: absolute;
        top: 1.6rem;
        right: 1.6rem;

        cursor: pointer;
      }

      & .recent {
        margin-top: 3.4rem;

        & .title-block {
          display: flex;
          justify-content: space-between;
          padding: 0.6rem 0;

          ${legacyTypographyMixin('body1')}
          font-weight: 700;
          color: var(--legacy-color-gray-900);

          & .disabled.delete {
            opacity: 0.25;
            cursor: pointer;
          }

          & .delete {
            color: var(--color-text-blue);
            cursor: pointer;
          }
        }

        .not-found-recent-keyword {
          margin: 0.4rem 0 0;

          ${legacyTypographyMixin('body2')}
          color: var(--legacy-color-gray-600);
        }

        & ul {
          margin-top: 0.4rem;

          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3.6rem;

            cursor: pointer;

            & > div {
              display: flex;
              gap: 10px;
              align-items: center;
              ${legacyTypographyMixin('body3')}
              font-weight: 600;
              color: var(--legacy-color-gray-900);
            }

            & .delete-search-history {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
              cursor: pointer;

              svg {
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }

      & .recommendation {
        margin-top: 3.4rem;

        & .title {
          ${legacyTypographyMixin('body1')}
          font-weight: 700;
          color: var(--legacy-color-gray-900);
        }

        & ul {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;

          & li {
            display: flex;
            align-items: center;
            height: 3.6rem;
            padding: 0.8rem;

            ${legacyTypographyMixin('body2')}
            font-weight: 700;
            color: var(--legacy-color-gray-400);

            cursor: pointer;
          }
        }
      }
    }

    ${media('medium')} {
      & .content {
        width: 52.8rem;
        margin: 0 auto;
      }
    }

    ${media('large')} {
      height: auto;

      & .content {
        width: 112rem;
        margin: 0 auto;

        & .close-icon {
          top: 1.2rem;
          right: 0;
        }

        & .content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          & .fc-input {
            width: 38.2rem;
            margin-right: 4rem;
          }
        }
      }
    }
  }
  ${media('small', 'medium')} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: transform 0.3s ease-out;
    transform: translateY(100%);

    &.open {
      transform: translateY(0);
    }

    .content-header {
      display: none;
    }

    header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 5.6rem;
      padding: 1.6rem 0;
      background-color: var(--color-white);
      ${legacyTypographyMixin('headline5')}
      font-weight: 700;
    }

    .alarm-content {
      padding: 2.8rem 1.6rem 0;
    }
  }
`;

const SearchModule = ({
  closeButtonAction,
  isSearchModuleOpen,
}: {
  closeButtonAction: () => void;
  isSearchModuleOpen: boolean;
}) => {
  const recommendedKeywordList = useRecommendedKeywordList();
  const navigate = useNavigate();
  const [isSearchFired, setIsSearchFired] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState<RecentKeyword[]>(
    JSON.parse(getLocalStorageItem(RECENT_KEYWORDS)) || []
  );

  const searchByInputValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newKeyword) {
      search();
    }
  };

  const searchByCategory = (category: string) => {
    search(category);
  };

  const search = (keyword?: string) => {
    setIsSearchFired(true);
    setRecentKeywords((prevState) => {
      const foundIndex = prevState.findIndex(
        (recentKeyword) => recentKeyword.keyword === keyword || recentKeyword.keyword === newKeyword
      );
      if (foundIndex !== -1) {
        prevState.splice(foundIndex, 1);
      }
      if (prevState.length > 5) prevState.pop();
      return [
        {
          keyword: keyword || newKeyword,
          createdAt: new Date().toString(),
        },
        ...prevState,
      ];
    });
    setNewKeyword(keyword ? keyword : newKeyword);

    navigate(
      encodeURI(`/search?keyword=${newKeyword || keyword}`).replace(
        /[!@#&'()*+]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
      )
    );
  };

  const removeAllKeywords = () => {
    setRecentKeywords([]);
  };

  const removeKeyword = (keyword: string) => {
    const foundIndex = recentKeywords.findIndex((recentKeyword) => recentKeyword.keyword === keyword);

    if (foundIndex !== -1) {
      const copiedRecentKeywords: RecentKeyword[] = JSON.parse(JSON.stringify(recentKeywords));
      copiedRecentKeywords.splice(foundIndex, 1);
      setRecentKeywords(copiedRecentKeywords);
    }
  };

  useEffect(() => {
    setLocalStorageItem(RECENT_KEYWORDS, JSON.stringify(recentKeywords));
  }, [recentKeywords]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isSearchModuleOpen && setShowPopUp(true);
    }, 100);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [isSearchModuleOpen]); //

  useEffect(() => {
    const today = new Date();
    const thirtyDays = 2592000000;
    let recentKeywords = JSON.parse(getLocalStorageItem(RECENT_KEYWORDS)) || [];
    if (recentKeywords) {
      recentKeywords = recentKeywords.filter(
        (recentKeyword: RecentKeyword) => today.getTime() - new Date(recentKeyword.createdAt).getTime() < thirtyDays
      );
    }
    setRecentKeywords(recentKeywords);
  }, []);

  useEffect(() => {
    if (!isSearchFired) return;
    if (!newKeyword) return;
    if (recentKeywords.length === 0) return;
    closeButtonAction();
  }, [newKeyword, recentKeywords, isSearchFired]);

  return (
    <SearchModuleBlock className={showPopUp ? 'open' : ''}>
      <div className="overlay" />
      <div className="content-wrapper">
        <div className="content">
          <CloseLarge className="close-icon" onClick={closeButtonAction} />
          <div className="content-header">
            <Logo
              css={css`
                margin-bottom: 1rem;
              `}
            />
          </div>
          <header>
            알람 <CloseLarge onClick={closeButtonAction} />
          </header>
          <Input
            icon={<GnbSearch />}
            placeholder="찾고계신 강의가 있나요? 2자 이상 입력하세요."
            type="search"
            value={newKeyword}
            onKeyDown={(e) => searchByInputValue(e)}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <div className="recent">
            <div className="title-block">
              <span className="title">최근 검색어</span>
              <span className={recentKeywords.length ? 'delete' : 'delete disabled'} onClick={removeAllKeywords}>
                전체삭제
              </span>
            </div>
            {/* {!recentKeywords.length && <div className="not-found-recent-keyword">최근검색어 내역이 없습니다.</div>} */}
            <ul>
              {recentKeywords.map((recentKeyword, index) => (
                <li key={index}>
                  <div onClick={() => searchByCategory(recentKeyword.keyword)}>
                    <SearchIcon />
                    {recentKeyword.keyword}
                  </div>
                  <div className="delete-search-history" onClick={() => removeKeyword(recentKeyword.keyword)}>
                    <Close />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {arrayUtil.hasLength(recommendedKeywordList) && (
            <div className="recommendation">
              <span className="title">추천 검색어</span>
              <ul>
                {recommendedKeywordList?.map((recommendedCategory, index) => (
                  <li key={index} onClick={() => searchByCategory(recommendedCategory)}>
                    {recommendedCategory}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </SearchModuleBlock>
  );
};

export default SearchModule;
