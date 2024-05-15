import { Page } from '@playwright/test';

import qnaSummary from '../fixtures/qna/summary.json';

const getQnaSummary = () => {
  return [
    async (page: Page) =>
      await page.route('/api/b2e/qna/summary/10005', async (route) => {
        const body = JSON.stringify(qnaSummary);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/qna/summary/10361', async (route) => {
        const body = JSON.stringify(qnaSummary);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/qna/summary/10002', async (route) => {
        const body = JSON.stringify(qnaSummary);
        await route.fulfill({ body });
      }),
  ];
};

export const qnaApis = [...getQnaSummary()];
