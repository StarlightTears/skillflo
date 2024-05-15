import { Page } from '@playwright/test';

import curation from '../fixtures/curation/curation.json';

const getCuration = async (page: Page) => {
  await page.route('/api/b2e/curation', async (route) => {
    const body = JSON.stringify(curation);
    await route.fulfill({ body });
  });
};

export const curationApis = [getCuration];
