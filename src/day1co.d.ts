declare module '@day1co/browser-util';
declare module '@day1co/browser-support' {
  export function createChannelTalkScript(pluginKey: string): void;
}
declare module '@day1co/floating-chat' {
  interface FloatingChatOptions {
    qna?: string;
    endpoint: string;
    headers: {
      authorization: string;
      'x-bpo-member-token': string;
    };
  }

  interface FloatingChatContext {
    lxpCourseId: number;
    clip: number;
    t: number;
  }
  class FloatingChat {
    constructor(element: HTMLElement, options: FloatingChatOptions);

    setContext(context: FloatingChatContext): void;
    opened: boolean;
    watchOpened(callback: (opened: boolean) => void): () => void;
  }

  export = FloatingChat;
}
declare module '@day1co/layouts/runtime' {
  function initFcLayouts(): void;
  export = initFcLayouts;
}
