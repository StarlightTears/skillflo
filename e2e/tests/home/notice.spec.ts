import { expect, test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('공지사항 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
    await login(page);
  });

  test('카드 클릭 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="notice"]').nth(0).click();
    await expect(page).toHaveURL('notice/12064');
  });

  test('전체보기 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="notice-all"]').click();
    await expect(page).toHaveURL('/mypage/notice');
  });
});
