import { Page } from '@playwright/test';

import customer from '../fixtures/customer/customer.json';

const getCustomer = async (page: Page) => {
  await page.route('/api/b2e/customer/10046', async (route) => {
    const body = JSON.stringify(customer);
    await route.fulfill({ body });
  });
};

export const customerApis = [getCustomer];
