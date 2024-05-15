import React from 'react';

import ChannelIOLuancher from './ReactChannelIO';

import { useCurrentMemberGroup } from '@/shared/hooks';

const MemberGroupChannelIO = () => {
  const { data: currentMemberGroup } = useCurrentMemberGroup();

  // * currentMemberGroup가 undefined일 때는 isChannelTalk 여부를 검사하지 않기 위한 코드
  if (!currentMemberGroup || !currentMemberGroup.extras?.isChannelTalk) return null;

  return <ChannelIOLuancher pluginKey={currentMemberGroup.extras.channelTalkPluginKey} />;
};

export default MemberGroupChannelIO;
