import styled from '@emotion/styled';
import React from 'react';

import { RenewalButton as Button } from '@/components';
import CapsuleBadge from '@/components/common-renewal/CapsuleBadge';
import { useCurrentMember, useMemberRole, useToken } from '@/shared/hooks';
import { useCustomer } from '@/shared/hooks/customer';
import { renewalTypographyMixin } from '@/styles/renewal-mixins';
import { Member } from '@/types/member.interface';

interface UserProfileProps {
  member: Member;
  jobName: string;
}

const UserProfileBlock = styled.section`
  span {
    margin-bottom: 0.8rem;
  }

  h1 {
    ${renewalTypographyMixin('title', 3)}
  }

  p {
    ${renewalTypographyMixin('caption', 1)}
    color: var(--color-semantic-informative-secondary);
  }

  button {
    margin-top: 2rem;
  }
`;

const UserProfile = ({ member, jobName }: UserProfileProps) => {
  const { logout } = useToken();
  const { member: currentMember } = useCurrentMember();
  const { data: customer } = useCustomer(Number(currentMember?.extras.customerId));
  const { roleNameMap } = useMemberRole([member?.extras.jobId, member?.extras.rankId].filter((v) => v) as number[]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <UserProfileBlock className="content-section">
      <div className="user-info aside-content-wrapper">
        <CapsuleBadge>{jobName}</CapsuleBadge>
        <h1>{member.extras.name} 님</h1>
        <p>{member.name}</p>
        <p>{customer?.name}</p>
        <p>
          {roleNameMap.get(member?.extras.jobId)} {roleNameMap.get(member?.extras.rankId)}
        </p>
        <Button color="gray" size="small" theme="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </UserProfileBlock>
  );
};

export default UserProfile;
