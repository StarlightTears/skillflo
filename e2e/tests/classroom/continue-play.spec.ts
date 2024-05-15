import { test, expect } from '@playwright/test';

import { defaultClassroomApis, getVideoInfoForContinue, getMemberClipProgressForContinue } from '../../api/classroom';
import { login } from '../../units/auth';
import { interceptApi } from '../../units/intercept-api';

test.describe('Classroom Test', () => {
  if (process.env.CI) return;

  test.beforeEach(async ({ page }) => {
    await interceptApi(page, [...defaultClassroomApis, getVideoInfoForContinue, getMemberClipProgressForContinue]);
  });

  test('이어보기 - 5초 시청 후 pause시 시청기록 Update', async ({ page }) => {
    await login(page);

    await page.route('/api/b2e/classroom/progress/update', async (route, request) => {
      const { start, end, interval } = request.postDataJSON().extras.timeRange[0];

      // 14 ~ 21의 기록을 만들어냈는지 확인
      expect(start >= 14 && end < 22 && interval === end - start).toBeTruthy();

      const body = JSON.stringify({});
      await route.fulfill({ body });
    });

    await page.goto('http://localhost:8082/classroom/product/10085/course/10000/courseContent/10000');
    await page.waitForSelector('.fc-player iframe');
    await expect(page.frameLocator('.fc-player iframe').locator('#kollus_player').isVisible()).toBeTruthy();

    // 이어보기 모달 확인
    await page.waitForSelector('[data-e2e="modal-confirm"]');
    await page.locator('[data-e2e="modal-confirm"]').click();

    await page.waitForTimeout(5000);
    await page.frameLocator('.fc-player iframe').locator('#kollus_player').click();
  });
});
