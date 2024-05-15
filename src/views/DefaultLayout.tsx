import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Gnb } from '@/components';
import { getMemberList } from '@/shared/api/member';
import { useAppDispatch, useCurrentMemberGroup, useToken } from '@/shared/hooks';
import { useAccountEffect } from '@/shared/hooks/useAccount';
import slices from '@/shared/store/slices';
import { hasAccessPermissionForAllPage } from '@/shared/utils/screenAccessControl';
import { homeMedia } from '@/styles/mixins';

const DefaultLayoutContent = styled.div`
  min-height: calc(100vh - var(--layout-gnb-mobile-height) - var(--layout-footer-mobile-height));
  margin-top: var(--layout-gnb-mobile-height);

  ${homeMedia('large', 'xlarge')} {
    min-height: calc(100vh - var(--layout-gnb-height) - var(--layout-footer-desktop-height));
    margin-top: var(--layout-gnb-height);
  }
`;

const DefaultLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { setMembers } = slices.actions.members;
  const { accessToken, memberToken } = useToken();
  const { data: memberGroup } = useCurrentMemberGroup();
  useAccountEffect();

  useEffect(() => {
    if (accessToken && memberToken) {
      getMemberList({ state: 'NORMAL', limit: 100 }).then(({ data }) => {
        dispatch(setMembers(data));
      });
    }
  }, [accessToken, memberToken]);

  useEffect(() => {
    if (memberGroup) {
      if (!hasAccessPermissionForAllPage(memberGroup)) {
        navigate('/forbidden');
      }
    }
  }, [memberGroup]);

  return (
    <section>
      <Gnb />
      <DefaultLayoutContent>
        <Outlet />
      </DefaultLayoutContent>
    </section>
  );
};

export default DefaultLayout;
