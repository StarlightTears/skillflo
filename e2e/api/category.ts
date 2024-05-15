import { Page } from '@playwright/test';

import category from '../fixtures/category/category.json';

const getCategory = async (page: Page) => {
  await page.route('/api/b2e/category/search?type=EXPOSED&limit=1000', async (route) => {
    const body = JSON.stringify(category);
    await route.fulfill({ body });
  });
};

export const categoryApis = [getCategory];
