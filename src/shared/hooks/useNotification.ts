import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotificationList, putNotification as putNotificationApi } from '../api/push-notification';
import { QUERY_KEYS, NOTIFICATION_LIMIT, NOTIFICATION_REFETCH_INTERVAL } from '../policy';
import { getElapsedTime } from '../utils/elapsed-time';

import { useCurrentMember } from './useCurrentMember';

export const useNotification = () => {
  const { member } = useCurrentMember();
  const queryClient = useQueryClient();

  const { data } = useQuery(
    QUERY_KEYS.PUSH_NOTIFICATAION(member?.id as number),
    () => getNotificationList(NOTIFICATION_LIMIT),
    {
      refetchInterval: NOTIFICATION_REFETCH_INTERVAL,
    }
  );

  const alarmList =
    data?.data.map((alarm) => {
      return {
        id: alarm.id,
        messageTag: alarm.extras.message,
        url: alarm.extras.url,
        createdAtText: getElapsedTime(alarm.createdAt),
        isUnread: alarm.state === 'NORMAL',
      };
    }) || [];

  const isExistUnreadList = data?.data.some((item) => item.state === 'NORMAL');

  const putNotificationMutation = useMutation((notificationId: number) => putNotificationApi(notificationId));

  const putNotification = async (notificationId: number) => {
    await putNotificationMutation.mutateAsync(notificationId);

    queryClient.invalidateQueries(QUERY_KEYS.PUSH_NOTIFICATAION(member?.id as number));
  };

  return { alarmList, putNotification, isExistUnreadList };
};
