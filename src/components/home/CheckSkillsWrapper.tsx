import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCurrentMemberGroup } from '@/shared/hooks';

const CheckSkillsWrapper = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { isSkill360MemberGroup } = useCurrentMemberGroup();

  useEffect(() => {
    isSkill360MemberGroup && navigate('/skills');
  }, [isSkill360MemberGroup]);

  return <>{children}</>;
};

export default CheckSkillsWrapper;
