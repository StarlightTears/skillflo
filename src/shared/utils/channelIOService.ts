import { createChannelTalkScript } from '@day1co/browser-support';

import config from '../config';
interface ChannelIOBootOptions {
  pluginKey?: string;
}
interface ChannelIO {
  (command: 'boot', options: ChannelIOBootOptions): void;
  (command: 'shutdown'): void;
  (command: 'showChannelButton'): void;
  (command: 'hideChannelButton'): void;
}

declare global {
  interface Window {
    ChannelIO: ChannelIO;
  }
}

class ChannelIOService {
  boot(pluginKey?: string) {
    if (!window.ChannelIO) {
      createChannelTalkScript(pluginKey ?? config.CHANNEL_TALK_KEY);
    } else {
      window.ChannelIO('boot', { pluginKey });
    }
  }

  shutDown() {
    window.ChannelIO('shutdown');
  }
  showButton() {
    window.ChannelIO('showChannelButton');
  }
  hideButton() {
    window.ChannelIO('hideChannelButton');
  }
}

export default new ChannelIOService();
