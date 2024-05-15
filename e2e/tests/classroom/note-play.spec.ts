import { test, expect } from '@playwright/test';

import { defaultClassroomApis, getVideoInfo } from '../../api/classroom';
import { getMyNote } from '../../api/mypage';
import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('Classroom Test', () => {
  if (process.env.CI) return;

  test.beforeEach(async ({ page }) => {
    await interceptApi(page, [...defaultClassroomApis, getVideoInfo, getMyNote]);
  });

  test('노트 저장시점 보기 - 10초 시청 후 pause시 시청기록 Update', async ({ page }) => {
    await login(page);

    await page.route('/api/b2e/classroom/progress/update', async (route, request) => {
      const { start, end, interval } = request.postDataJSON().extras.timeRange[0];

      // 25 이전까지의 기록을 만들어냈는지 확인
      expect(end <= 25 && interval === end - start).toBeTruthy();

      const body = JSON.stringify({});
      await route.fulfill({ body });
    });

    await page.goto('/mypage/note');
    await page.locator('[data-e2e="course-intro-thumbnail"]').click();
    await page.locator('[data-e2e="note-item"]').click();
    await page.locator('[data-e2e="note-play-btn"]').click();

    await page.waitForSelector('.fc-player iframe');
    await expect(page.frameLocator('.fc-player iframe').locator('#kollus_player').isVisible()).toBeTruthy();

    await page.waitForTimeout(10000);
    await page.frameLocator('.fc-player iframe').locator('#kollus_player').click();
  });
});
