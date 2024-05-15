import { useEffect } from 'react';

import { useAppSelector } from '@/shared/hooks';
import channelIOService from '@/shared/utils/channelIOService';

interface ReactChannelIOProps {
  pluginKey?: string;
}

const ReactChannelIO = ({ pluginKey }: ReactChannelIOProps) => {
  const isShowChannelTalkButton = useAppSelector((state) => state.channelTalk.isShowChannelTalkButton);

  useEffect(() => {
    channelIOService.boot(pluginKey);

    return () => {
      channelIOService.shutDown();
    };
  }, [pluginKey]);

  useEffect(() => {
    if (isShowChannelTalkButton) {
      channelIOService.showButton();
    } else {
      channelIOService.hideButton();
    }
  }, [isShowChannelTalkButton]);

  return null;
};

export default ReactChannelIO;
