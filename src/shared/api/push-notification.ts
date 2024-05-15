import { CrudClientInstance } from '@/shared/api/index';

interface PushNotification {
  id: number;
  state: string;
  createdAt: string;
  extras: {
    message: string;
    url: string;
    templateVariable: {
      dueDate: string;
      feedbackId: number;
      hideDate: string;
      memberName: string;
      productTitle: string;
      showDate: string;
    };
  };
}

export const getNotificationList = (limit: number) => {
  return CrudClientInstance.get<PushNotification[]>(`/notification`, { limit });
};

export const putNotification = (id: number) => {
  return CrudClientInstance.put(`/notification/${id}`, {});
};
