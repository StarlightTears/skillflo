import { Page } from 'playwright-core';

import memberGroup from '../fixtures/member/member-group.json';
import memberInfo from '../fixtures/member/member-info.json';
import member from '../fixtures/member/member.json';
import mypageMember from '../fixtures/member/mypage-member.json';

export const getMemberInfo = async (page: Page) => {
  await page.route('/api/b2e/member/info', async (route) => {
    const body = JSON.stringify(memberInfo);
    await route.fulfill({ body });
  });
};

const getMember = async (page: Page) => {
  await page.route('/api/b2e/member?state=NORMAL&limit=100', async (route) => {
    const body = JSON.stringify(member);
    await route.fulfill({ body });
  });
};

const getMemberGroup = async (page: Page) => {
  await page.route('/api/b2e/member-group/ids?ids=10036', async (route) => {
    const body = JSON.stringify(memberGroup);
    await route.fulfill({ body });
  });
};

const revokeMember = async (page: Page) => {
  await page.route('/api/b2e/member/revoke', async (route) => {
    const body = JSON.stringify(null);
    await route.fulfill({ body });
  });
};

const getMyPageMember = async (page: Page) => {
  await page.route('/api/b2e/mypage/member', async (route) => {
    const body = JSON.stringify(mypageMember);
    await route.fulfill({ body });
  });
};

export const memberApis = [getMemberInfo, getMember, getMemberGroup, revokeMember, getMyPageMember];
