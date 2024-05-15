import { Page } from '@playwright/test';

import pageData from '../fixtures/page/page.json';

const getPage = async (page: Page) => {
  await page.route('/api/b2e/page', async (route) => {
    const body = JSON.stringify(pageData);
    await route.fulfill({ body });
  });
};

export const pageApis = [getPage];
