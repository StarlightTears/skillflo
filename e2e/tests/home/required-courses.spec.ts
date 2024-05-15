import { expect, test } from '@playwright/test';

import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('필수강의 컴포넌트 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await interceptApi(page);
    await login(page);
  });

  test('카드 클릭 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="required-course-card"]').nth(0).click();
    await expect(page).toHaveURL('course-detail/10734/10005?tab=status');
  });

  test('전체보기 기능 테스트', async ({ page }) => {
    await page.locator('[data-e2e="course-status"]').click();
    await expect(page).toHaveURL('/mypage/course');
  });
});
