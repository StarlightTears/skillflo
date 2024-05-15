import { Page } from '@playwright/test';

import notification from '../fixtures/notification/notification.json';

const getNotification = async (page: Page) => {
  await page.route('/api/b2e/notification?limit=9', async (route) => {
    const body = JSON.stringify(notification);
    await route.fulfill({ body });
  });
};

export const notificationApis = [getNotification];
