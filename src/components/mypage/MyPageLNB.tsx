import styled from '@emotion/styled';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Accordion, Chip } from '@/components';
import { useCurrentMemberGroup, useViewport } from '@/shared/hooks';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

const MyPageLNBBlock = styled.ul`
  .title {
    margin: 0 0 0.4rem 1.6rem;

    ${legacyTypographyMixin('headline4')}
    font-weight: 700;
  }

  .chip-list {
    display: flex;
    overflow-x: auto;
    padding: 0.8rem 0 1.6rem 1.6rem;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }

    .common-chip {
      border-bottom: 1px solid var(--color-gray-300);
      border-radius: 0;
    }

    .focus {
      border-bottom: 1px solid var(--color-blue-600);
      border-radius: 0;
      background: none;
      color: var(--color-blue-600);
    }
  }

  ${media('medium')} {
    .title {
      margin: 0 0 0.4rem;
    }

    .chip-list {
      padding: 0.8rem 0 1.6rem;
    }
  }
  ${media('large')} {
    .title {
      margin: 0 0 2.4rem;
      padding: 0 0.8rem;
    }
  }
`;

const MyPageLNB = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLargeViewport } = useViewport();
  const { isSkill360MemberGroup, isLoading: isCurrentMemberGroupLoading } = useCurrentMemberGroup();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const linkMenuList = isSkill360MemberGroup
    ? [
        {
          name: '공지사항',
          path: 'notice',
        },
        {
          name: '개인정보 확인/수정',
          path: 'info',
        },
      ]
    : [
        {
          name: '내 수강 정보',
          path: '',
        },
        {
          name: '최근 수강한 강의',
          path: 'recents',
        },
        {
          name: '수강현황',
          path: 'course',
        },
        {
          name: '나의 노트',
          path: 'note',
        },
        {
          name: '공지사항',
          path: 'notice',
        },
        {
          name: '나의 관심강의',
          path: 'interests',
        },
        {
          name: '개인정보 확인/수정',
          path: 'info',
        },
      ];

  const selectedPageName = useMemo(() => {
    const selectedSubPath = pathname.replace(/\/mypage\/?/, '');

    const selectedMenu = linkMenuList.find((menu) => menu.path === selectedSubPath);

    return selectedMenu?.name as string;
  }, [pathname]);

  useEffect(() => {
    if (isLargeViewport) return;
    listRef.current?.children[selectedTabIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'end' });
  }, [selectedTabIndex, isLargeViewport]);

  const changeSubPageByName = (selectedMenuName: string) => {
    if (!isLargeViewport) {
      const selectedIdx = linkMenuList.findIndex((menu) => menu.name === selectedMenuName);
      setSelectedTabIndex(selectedIdx);
    }
    const selectedMenu = linkMenuList.find((menu) => menu.name === selectedMenuName);
    navigate(`/mypage/${selectedMenu?.path}`);
  };

  return (
    <MyPageLNBBlock>
      <div className="title">마이페이지</div>
      {!isCurrentMemberGroupLoading && (
        <>
          {isLargeViewport ? (
            <Accordion list={linkMenuList} selectedMenu={selectedPageName} setMenu={changeSubPageByName} />
          ) : (
            <div className="chip-list" ref={listRef}>
              {linkMenuList.map((linkMenu) => (
                <Chip
                  key={linkMenu.name}
                  className={linkMenu.name === selectedPageName ? 'focus' : ''}
                  onClick={() => {
                    changeSubPageByName(linkMenu.name);
                  }}
                >
                  <div
                    style={{ display: 'none' }}
                    data-data={`${selectedPageName}/${linkMenu.name === selectedPageName}`}
                  />
                  {linkMenu.name}
                </Chip>
              ))}
            </div>
          )}
        </>
      )}
    </MyPageLNBBlock>
  );
};

export default MyPageLNB;
