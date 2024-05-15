import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { generateSignature } from '../../shared/utils/zoom';

import type { PropsWithStyle } from '@/types/component.interface';

import { useCurrentMember } from '@/shared/hooks';

interface ClassroomZoomWrapperProps {
  meetingNumber: number;
  password: string;
}

const ClassroomZoomWrapperIframe = styled.iframe``;

const ClassroomZoomWrapper = ({ meetingNumber, password, className }: PropsWithStyle<ClassroomZoomWrapperProps>) => {
  const { member } = useCurrentMember();
  const iframeUrl = useMemo(() => {
    if (!member || !meetingNumber) return '';
    const role = 0;
    const signature = generateSignature({ meetingNumber, role });

    const urlSearchParams = new URLSearchParams({
      signature,
      password,
      email: member.name as string,
      name: member.extras.name,
      meetingNumber: meetingNumber.toString(),
      role: role.toString(),
    });

    return `/zoom-client.html?${urlSearchParams.toString()}`;
  }, [member, meetingNumber]);

  if (!iframeUrl) return null;

  return <ClassroomZoomWrapperIframe src={iframeUrl} className={className} />;
};

export default ClassroomZoomWrapper;
