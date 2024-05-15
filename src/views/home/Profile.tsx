import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

import { useCurrentMember, useToken } from '@/shared/hooks';
import { useCustomer } from '@/shared/hooks/customer';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const Wrapper = styled.section`
  h1 {
    padding-bottom: 1.2rem;
    ${legacyTypographyMixin('XXLarge')}
    font-weight: 400;
  }

  h2 {
    ${legacyTypographyMixin('XSmall')}
    font-weight: 400;
    color: var(--color-text-gray);
  }

  .button-block {
    display: flex;
    margin-top: 4rem;
    ${legacyTypographyMixin('Small')}

    & a {
      margin-right: 2rem;
      color: var(--color-text-black);

      :hover {
        color: var(--color-text-blue);
      }
    }

    & span {
      cursor: pointer;

      :hover {
        color: var(--color-text-blue);
      }
    }
  }
`;

const Profile = () => {
  const { member: currentMember } = useCurrentMember();
  const { data: customer } = useCustomer(Number(currentMember?.extras.customerId));
  const { logout } = useToken();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Wrapper>
      <h1>{currentMember?.extras.name}</h1>
      <h2>{currentMember?.name}</h2>
      <h2>{customer?.name}</h2>
      <div className="button-block">
        <Link to="/mypage/info">프로필 수정</Link>
        <span onClick={handleLogout}>로그아웃</span>
      </div>
    </Wrapper>
  );
};

export default Profile;
