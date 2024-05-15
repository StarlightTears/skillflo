import { Page } from '@playwright/test';

import examAssignment from '../fixtures/exam/assignment.json';

const getExamAssignment = () => {
  return [
    async (page: Page) =>
      await page.route('/api/b2e/exam/assignment?productId=10130&courseId=10361', async (route) => {
        const body = JSON.stringify(examAssignment);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/exam/assignment?productId=10130&courseId=10002', async (route) => {
        const body = JSON.stringify(examAssignment);
        await route.fulfill({ body });
      }),
    async (page: Page) =>
      await page.route('/api/b2e/exam/assignment?productId=10734&courseId=10005', async (route) => {
        const body = JSON.stringify(examAssignment);
        await route.fulfill({ body });
      }),
  ];
};

export const examApis = [...getExamAssignment()];
