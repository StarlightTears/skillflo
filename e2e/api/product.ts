import { Page } from '@playwright/test';

import product from '../fixtures/product/product.json';

const getProduct = () => {
  return [
    async (page: Page) =>
      await page.route('/api/b2e/product/10085', async (route) => {
        const body = JSON.stringify(product);
        await route.fulfill({ body });
      }),
  ];
};

export const productApis = [...getProduct()];
