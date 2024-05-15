import { Page } from 'playwright-core';

import accessToken from '../fixtures/auth/account-token.json';
import memberList from '../fixtures/auth/member-list.json';
import memberToken from '../fixtures/auth/member-token.json';

const getAccessToken = async (page: Page) => {
  await page.route('/api/b2e/auth/login', async (route) => {
    const body = JSON.stringify(accessToken);
    await route.fulfill({ body });
  });
};

const getMemberList = async (page: Page) => {
  await page.route('/api/b2e/member/login?state=NORMAL&limit=100', async (route) => {
    const body = JSON.stringify(memberList);
    await route.fulfill({ body });
  });
};

const getMemberToken = async (page: Page) => {
  await page.route('/api/b2e/member/token', async (route) => {
    const body = JSON.stringify(memberToken);
    await route.fulfill({ body });
  });
};

const logout = async (page: Page) => {
  await page.route('/api/b2e/auth/logout', async (route) => {
    const body = JSON.stringify(null);
    await route.fulfill({ body });
  });
};

export const authApis = [getAccessToken, getMemberList, getMemberToken, logout];
