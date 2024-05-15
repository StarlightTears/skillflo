import { Page } from 'playwright-core';

import accountInfo from '../fixtures/auth/account-info.json';

const getAccountInfo = async (page: Page) => {
  await page.route('/api/b2e/account', async (route) => {
    const body = JSON.stringify(accountInfo);
    await route.fulfill({ body });
  });
};

export const accountApis = [getAccountInfo];
