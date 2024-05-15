import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLocalStorageItem } from '@day1co/browser-util';
import type { Option, Value } from '@fastcampus/fastcomponents';

import type { Member, MemberGroup } from '@/types/member.interface';

import {
  GnbAlarm,
  GnbAlarmOn,
  GnbSearch,
  GnbHamburger,
  Select,
  SidebarClose,
  Accordion,
  Logo,
  MegaPhoneOutlined,
} from '@/components';
import AlarmModule from '@/components/AlarmModule';
import SearchModule from '@/components/SearchModule';
import config from '@/shared/config';
import {
  useAppSelector,
  useToken,
  useCurrentMemberGroupList,
  useCurrentMember,
  useCurrentMemberGroup,
} from '@/shared/hooks';
import { useNotification } from '@/shared/hooks/useNotification';
import { hasAccessPermissionForAllPage } from '@/shared/utils/screenAccessControl';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { homeMedia } from '@/styles/mixins';

const HeaderBlock = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-gnb);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: var(--layout-gnb-mobile-height);
  border-bottom: 0.1rem solid var(--color-semantic-divider-default);
  background-color: var(--color-white);

  & .left-align {
    display: flex;

    height: 4.4rem;
  }

  & .right-align {
    display: flex;
    align-items: center;
  }

  & .dropdown {
    width: 4.8rem;
    height: 4.4rem;
    margin-right: 1.2rem;
  }

  & .change-member-select {
    width: 26.2rem;
    height: 4.8rem;

    outline: none;
  }

  ${homeMedia('small', 'medium')} {
    padding: 0 1.6rem;
  }

  ${homeMedia('large')} {
    height: var(--layout-gnb-height);
    padding: 0 calc((100vw - 95rem) / 2);
  }

  ${homeMedia('xlarge')} {
    height: var(--layout-gnb-height);
    padding: 0 calc((100vw - 120rem) / 2);
  }
`;

// const NavBlock = styled.nav`
//   height: 4.4rem;
//   margin-left: 4.6rem;

//   & .common-chip {
//     margin-right: 0.4rem;

//     cursor: pointer;

//     &:last-child {
//       margin-right: 0;
//     }
//     ${homeMedia('large', 'xlarge')} {
//       ${legacyTypographyMixin('body1')}
//       padding: 1rem 1.6rem;
//       border-radius: 0.6rem;
//     }
//   }
// `;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 1.2rem;
  border-radius: 0.6rem;
  cursor: pointer;

  :hover {
    background-color: var(--legacy-color-gray-50);
  }

  &:first-of-type {
    ${homeMedia('small', 'medium')} {
      margin-left: 0;
    }
  }

  ${homeMedia('large', 'xlarge')} {
    width: 4.8rem;
    height: 4.4rem;
    margin-left: 0;
  }
`;

const SidebarBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--legacy-color-gray-900);
  opacity: 0;
  transition: opacity 0.3s ease-out;
  transform: translateX(100%);

  &.open {
    opacity: 0.8;
    transform: translateX(0%);
  }
`;

const SidebarContent = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  width: 29.4rem;
  height: 100%;
  padding: 1.6rem;

  background-color: var(--color-white);
  transition: transform 0.3s ease-out;
  transform: translateX(100%);

  &.open {
    transform: translateX(0%);
  }

  & .close {
    margin-left: 100%;

    transform: translateX(-100%);
  }

  & .welcome-msg {
    ${legacyTypographyMixin('headline4')}
    margin: 1.6rem 0 3.6rem;
    color: var(--legacy-color-gray-900);
  }

  & label {
    display: inline-block;

    margin-bottom: 0.4rem;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-400);
  }

  & .change-member-select {
    margin-bottom: 1.6rem;
  }
`;

const Gnb = () => {
  const { isSkill360MemberGroup, isLoading: isCurrentMemberGroupLoading } = useCurrentMemberGroup();

  // const defaultDropdownContents = isSkill360MemberGroup
  //   ? [
  //       {
  //         text: '개인정보 확인/수정',
  //         onClick: () => {
  //           navigate('/mypage/info');
  //         },
  //       },
  //       {
  //         text: '로그아웃',
  //         onClick: async () => {
  //           await logout();
  //         },
  //       },
  //     ]
  //   : [
  //       {
  //         text: '내 수강 정보',
  //         onClick: () => {
  //           navigate('/mypage');
  //         },
  //       },
  //       {
  //         text: '최근 수강한 강의',
  //         onClick: () => {
  //           navigate('/mypage/recents');
  //         },
  //       },
  //       {
  //         text: '수강현황',
  //         onClick: () => {
  //           navigate('/mypage/course');
  //         },
  //       },
  //       {
  //         text: '나의 노트',
  //         onClick: () => {
  //           navigate('/mypage/note');
  //         },
  //       },
  //       {
  //         text: '공지사항',
  //         onClick: () => {
  //           navigate('/mypage/notice');
  //         },
  //       },
  //       {
  //         text: '나의 관심강의',
  //         onClick: () => {
  //           navigate('/mypage/interests');
  //         },
  //       },
  //       {
  //         text: '개인정보 확인/수정',
  //         onClick: () => {
  //           navigate('/mypage/info');
  //         },
  //       },
  //       {
  //         text: '로그아웃',
  //         onClick: async () => {
  //           await logout();
  //         },
  //       },
  //     ];
  // const { pathname } = useLocation();
  const navigate = useNavigate();
  const { memberToken, getMemberTokenBySelectedMember, logout } = useToken();
  const members = useAppSelector((state) => state.members.members) as Member[];
  const { member: currentMember } = useCurrentMember();
  const [selectOptions, setSelectOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Value[]>([]);
  const [initialSelectedValue, setInitialSelectedValue] = useState<Value>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  // const { isLargeViewport, isXLargeViewport } = useViewport('home');

  const [isSearchModuleOpen, setIsSearchModuleOpen] = useState(false);
  const [isAlarmModuleOpen, setIsAlarmModuleOpen] = useState(false);
  const { data: memberGroupList } = useCurrentMemberGroupList();
  const { isExistUnreadList } = useNotification();

  const categoryList = isSkill360MemberGroup
    ? [
        {
          name: '마이페이지',
          path: 'mypage',
          children: [
            { name: '공지사항', path: 'mypage/notice' },
            { name: '내 정보 확인/수정', path: 'mypage/info' },
            { name: '로그아웃', path: 'logout' },
          ],
        },
      ]
    : [
        { name: '홈', path: '/' },
        { name: '전체강의', path: 'enrollment' },
        {
          name: '마이페이지',
          path: 'mypage',
          children: [
            { name: '내 수강정보', path: 'mypage' },
            { name: '최근 수강한 강의', path: 'mypage/recents' },
            { name: '수강현황', path: 'mypage/course' },
            { name: '나의노트', path: 'mypage/note' },
            { name: '공지사항', path: 'mypage/notice' },
            { name: '나의 관심강의', path: 'mypage/interests' },
            { name: '내 정보 확인/수정', path: 'mypage/info' },
            { name: '로그아웃', path: 'logout' },
          ],
        },
      ];

  const checkMemberTokenChangedByOtherTab = () => {
    window.addEventListener('storage', () => {
      if (getLocalStorageItem(config.MEMBER_TOKEN) !== memberToken) {
        if (document.visibilityState === 'hidden') {
          alert('다른 탭에서 멤버 그룹이 전환이 되었습니다.');
        }
        // TODO: navigate('/')로 교체하고 싶다.
        location.href = '/';
      }
    });
  };

  useEffect(() => {
    checkMemberTokenChangedByOtherTab();
  }, []);

  useEffect(() => {
    if (members && members.length > 0 && memberGroupList && memberGroupList.length > 0) {
      setSelectOptions(
        members.reduce<Option[]>((acc, member) => {
          const memberGroupId = Number(member.extras.groupId);
          const memberGroup = memberGroupList.find(
            (memberGroup) => memberGroup.id === memberGroupId && memberGroup.state === 'NORMAL'
          ) as MemberGroup;
          if (!memberGroup) return acc;

          if (!hasAccessPermissionForAllPage(memberGroup)) return acc;

          acc.push({
            label: memberGroup?.name,
            value: member.id,
          });

          return acc;
        }, [])
      );
      if (currentMember) {
        setInitialSelectedValue(currentMember.id);
      }
    }
  }, [members, memberGroupList, currentMember]);

  useEffect(() => {
    if (selectOptions.length > 0) {
      const selectedOption = selectedOptions[0];
      const selectedMember = members.find((member) => member.id === selectedOption);
      if (!selectedMember || !currentMember) return;
      if (selectedMember.id !== currentMember.id) {
        getMemberTokenBySelectedMember(selectedMember).then(() => {
          // TODO: navigate('/')로 교체하고 싶다.
          location.href = '/';
        });
      }
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (selectedRoute) {
      if (selectedRoute === 'logout') {
        logout();
      } else {
        navigate(selectedRoute);
      }
    }
  }, [selectedRoute]);

  return (
    <HeaderBlock>
      <div className="left-align">
        <Logo
          onClick={() => {
            navigate('/');
          }}
        />
        {/* {!isCurrentMemberGroupLoading && !isSkill360MemberGroup && (isLargeViewport || isXLargeViewport) && (
          <NavBlock>
            <Chip
              onClick={() => {
                navigate('/');
              }}
              className={pathname === '/' ? 'focus' : ''}
            >
              홈
            </Chip>
            <Chip
              onClick={() => {
                navigate('/enrollment');
              }}
              className={pathname === '/enrollment' ? 'focus' : ''}
            >
              전체강의
            </Chip>
          </NavBlock>
        )} */}
      </div>
      <div className="right-align">
        {!isCurrentMemberGroupLoading && !isSkill360MemberGroup ? (
          <>
            <IconWrapper onClick={() => setIsSearchModuleOpen(true)}>
              <GnbSearch />
            </IconWrapper>
            <IconWrapper
              onClick={(event) => {
                event.stopPropagation();
                setIsAlarmModuleOpen(!isAlarmModuleOpen);
              }}
            >
              {isExistUnreadList ? <GnbAlarmOn /> : <GnbAlarm />}
            </IconWrapper>
          </>
        ) : (
          <IconWrapper onClick={() => navigate('mypage/notice')}>
            <MegaPhoneOutlined />
          </IconWrapper>
        )}
        {/* {isLargeViewport || isXLargeViewport ? (
          <>
            {!isCurrentMemberGroupLoading && (
              <Dropdown
                className="dropdown"
                dropdownContents={defaultDropdownContents}
                contentTitle={currentMember?.extras.name}
                contentSubTitle={currentMember?.extras.customerName}
                isContentAlignCenter={true}
              >
                <IconWrapper className="my-page">
                  <GnbMypage />
                </IconWrapper>
              </Dropdown>
            )}
            <Select
              className="change-member-select"
              options={selectOptions}
              initialSelectedValue={initialSelectedValue}
              setValue={(v) => setSelectedOptions(v)}
            />
          </>
        ) : (
          <>
            <IconWrapper onClick={() => setIsSidebarOpen(true)}>
              <GnbHamburger />
            </IconWrapper>
            <SidebarBackground className={isSidebarOpen ? 'open' : ''} />
            <SidebarContent className={isSidebarOpen ? 'open' : ''}>
              <SidebarClose className="close" onClick={() => setIsSidebarOpen(false)} />
              <p className="welcome-msg">{currentMember && currentMember.extras.name}님 반갑습니다 :)</p>
              <label>현재 교육 과정</label>
              <Select
                className="change-member-select"
                options={selectOptions}
                initialSelectedValue={initialSelectedValue}
                setValue={(v) => setSelectedOptions(v)}
              />
              <nav>
                <Accordion
                  type="nav"
                  list={categoryList}
                  selectedMenu={selectedRoute}
                  setMenu={(menu) => {
                    setIsSidebarOpen(false);
                    setSelectedRoute(menu);
                  }}
                />
              </nav>
            </SidebarContent>
          </>
        )} */}
        <>
          <IconWrapper onClick={() => setIsSidebarOpen(true)}>
            <GnbHamburger />
          </IconWrapper>
          <SidebarBackground className={isSidebarOpen ? 'open' : ''} />
          <SidebarContent className={isSidebarOpen ? 'open' : ''}>
            <SidebarClose className="close" onClick={() => setIsSidebarOpen(false)} />
            <p className="welcome-msg">{currentMember && currentMember.extras.name}님 반갑습니다 :)</p>
            <Select
              className="change-member-select"
              options={selectOptions}
              initialSelectedValue={initialSelectedValue}
              setValue={(v) => setSelectedOptions(v)}
            />
            <nav>
              <Accordion
                type="nav"
                list={categoryList}
                isArrowIconShow={true}
                selectedMenu={selectedRoute}
                setMenu={(menu) => {
                  setIsSidebarOpen(false);
                  setSelectedRoute(menu);
                }}
              />
            </nav>
          </SidebarContent>
        </>
      </div>
      {isAlarmModuleOpen && <AlarmModule closeButtonAction={() => setIsAlarmModuleOpen(false)} />}
      {isSearchModuleOpen && (
        <SearchModule isSearchModuleOpen={isSearchModuleOpen} closeButtonAction={() => setIsSearchModuleOpen(false)} />
      )}
    </HeaderBlock>
  );
};

export default Gnb;
