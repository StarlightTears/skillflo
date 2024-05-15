import slices from '../store/slices';

import { useAppDispatch } from './useAppDispatch';

export const useChannelTalk = () => {
  const dispatch = useAppDispatch();
  const { showChannelTalkButton, hideChannelTalkButton } = slices.actions.channelTalk;

  return {
    showChannelTalkButton: () => dispatch(showChannelTalkButton()),
    hideChannelTalkButton: () => dispatch(hideChannelTalkButton()),
  };
};
