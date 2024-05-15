import { Page } from 'playwright-core';

import noteList from '../../fixtures/note/list.json';

export const getMyNote = async (page: Page) => {
  await page.route('/api/b2e/my-note', async (route) => {
    const body = JSON.stringify(noteList);
    await route.fulfill({ body });
  });
};
