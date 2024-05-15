import { expect, test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('최근 수강한 강의 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
    await login(page);
  });

  test('카드 클릭 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="recent-course-description"]').nth(1).click();
    await expect(page).toHaveURL('course-detail/10130/10361?tab=status');
  });

  test('전체보기 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="recent-courses-all"]').click();
    await expect(page).toHaveURL('/mypage/recents');
  });
});
