import { Page } from '@playwright/test';

import notice from '../fixtures/notice/notice.json';

const getNotice = () => {
  return [
    async (page: Page) =>
      await page.route('/api/b2e/mypage/notice?offset=0&limit=999999', async (route) => {
        const body = JSON.stringify(notice);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/mypage/notice?offset=0&limit=20', async (route) => {
        const body = JSON.stringify(notice);
        await route.fulfill({ body });
      }),
  ];
};

export const noticeApis = [...getNotice()];
