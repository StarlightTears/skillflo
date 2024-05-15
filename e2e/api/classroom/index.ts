import { Page } from 'playwright-core';

import assignment from '../../fixtures/classroom/assignment.json';
import completeCourseContents from '../../fixtures/classroom/complete-course-contents.json';
import contents from '../../fixtures/classroom/contents.json';
import courseContent from '../../fixtures/classroom/course-content.json';
import course from '../../fixtures/classroom/course.json';
import learningRate from '../../fixtures/classroom/learning-rate.json';
import learningTime from '../../fixtures/classroom/learning-time.json';
import memberClipProgressForContinue from '../../fixtures/classroom/member-clip-progress-for-continue.json';
import memberClipProgress from '../../fixtures/classroom/member-clip-progress.json';
import memberInfo from '../../fixtures/classroom/member-info.json';
import note from '../../fixtures/classroom/note.json';
import qnaSummary from '../../fixtures/classroom/qna-summary.json';
import supplements from '../../fixtures/classroom/supplements.json';
import totalScore from '../../fixtures/classroom/total-score.json';
import videoInfoForContinue from '../../fixtures/classroom/video-info-for-continue.json';
import videoInfo from '../../fixtures/classroom/video-info.json';
import videoInfo2 from '../../fixtures/classroom/video-info2.json';
import updateVideoProgressResponse from '../../fixtures/classroom/video-progress.json';

const getLearningTime = async (page: Page) => {
  await page.route('/api/b2e/classroom/progress/learning-time?productId=10085&courseId=10000', async (route) => {
    const body = JSON.stringify(learningTime);
    await route.fulfill({ body });
  });
};

const getCourse = async (page: Page) => {
  await page.route('/api/b2e/course/10000', async (route) => {
    const body = JSON.stringify(course);
    await route.fulfill({ body });
  });
};

export const getVideoInfo = async (page: Page) => {
  await page.route(
    '/api/b2e/classroom/video?productId=10085&courseId=10000&courseContentId=10000&deviceType=TYPE_1080P',
    async (route) => {
      const body = JSON.stringify(videoInfo);
      await route.fulfill({ body });
    }
  );
};

export const getVideoInfo2 = async (page: Page) => {
  await page.route(
    '/api/b2e/classroom/video?productId=10085&courseId=10000&courseContentId=10001&deviceType=TYPE_1080P',
    async (route) => {
      const body = JSON.stringify(videoInfo2);
      await route.fulfill({ body });
    }
  );
};

export const getVideoInfoForContinue = async (page: Page) => {
  await page.route(
    '/api/b2e/classroom/video?productId=10085&courseId=10000&courseContentId=10000&deviceType=TYPE_1080P',
    async (route) => {
      const body = JSON.stringify(videoInfoForContinue);
      await route.fulfill({ body });
    }
  );
};

const getMemberClipProgress = async (page: Page) => {
  await page.route(
    '/api/b2e/member-clip-progress?productId=10085&courseId=10000&courseContentId=10000&memberId=10511',
    async (route) => {
      const body = JSON.stringify(memberClipProgress);
      await route.fulfill({ body });
    }
  );
};

const getMemberClipProgress2 = async (page: Page) => {
  await page.route(
    '/api/b2e/member-clip-progress?productId=10085&courseId=10000&courseContentId=10001&memberId=10511',
    async (route) => {
      const body = JSON.stringify(memberClipProgress);
      await route.fulfill({ body });
    }
  );
};

export const getMemberClipProgressForContinue = async (page: Page) => {
  await page.route(
    '/api/b2e/member-clip-progress?productId=10085&courseId=10000&courseContentId=10000&memberId=10511',
    async (route) => {
      const body = JSON.stringify(memberClipProgressForContinue);
      await route.fulfill({ body });
    }
  );
};

const getQnaSummary = async (page: Page) => {
  await page.route('/api/b2e/qna/summary/10000', async (route) => {
    const body = JSON.stringify(qnaSummary);
    await route.fulfill({ body });
  });
};

const getLearningRate = async (page: Page) => {
  await page.route('/api/b2e/classroom/progress/learning-rate?productId=10085&courseId=10000', async (route) => {
    const body = JSON.stringify(learningRate);
    await route.fulfill({ body });
  });
};

const getMemberInfo = async (page: Page) => {
  await page.route('/api/b2e/member/info', async (route) => {
    const body = JSON.stringify(memberInfo);
    await route.fulfill({ body });
  });
};

const getContents = async (page: Page) => {
  await page.route('/api/b2e/course/10000/contents', async (route) => {
    const body = JSON.stringify(contents);
    await route.fulfill({ body });
  });
};

const getMyNote = async (page: Page) => {
  await page.route('/api/b2e/my-note', async (route) => {
    const body = JSON.stringify(note);
    await route.fulfill({ body });
  });
};

const getCourseContent = async (page: Page) => {
  await page.route('/api/b2e/course-content/10000', async (route) => {
    const body = JSON.stringify(courseContent);
    await route.fulfill({ body });
  });
};

const getCourseContent2 = async (page: Page) => {
  await page.route('/api/b2e/course-content/10001', async (route) => {
    const body = JSON.stringify(courseContent);
    await route.fulfill({ body });
  });
};

const getAssignment = async (page: Page) => {
  await page.route('/api/b2e/exam/assignment?productId=10085&courseId=10000&offset=0&limit=10000', async (route) => {
    const body = JSON.stringify(assignment);
    await route.fulfill({ body });
  });
};

const putTotalScore = async (page: Page) => {
  await page.route('/api/b2e/curation/total-score', async (route) => {
    const body = JSON.stringify(totalScore);
    await route.fulfill({ body });
  });
};

const getCompleteCourseContents = async (page: Page) => {
  await page.route(
    '/api/b2e/classroom/progress/is-completed-by-course-content?productId=10085&courseId=10000',
    async (route) => {
      const body = JSON.stringify(completeCourseContents);
      await route.fulfill({ body });
    }
  );
};

const getSupplements = async (page: Page) => {
  await page.route('/api/b2e/supplement/ids?ids=10000,10001,10002,10003,10004', async (route) => {
    const body = JSON.stringify(supplements);
    await route.fulfill({ body });
  });
};

const startVideoProgress = async (page: Page) => {
  await page.route('/api/b2e/classroom/progress/start', async (route) => {
    const body = JSON.stringify(updateVideoProgressResponse);
    await route.fulfill({ body });
  });
};

const updateVideoProgress = async (page: Page) => {
  await page.route('/api/b2e/classroom/progress/update', async (route) => {
    const body = JSON.stringify(updateVideoProgressResponse);
    await route.fulfill({ body });
  });
};

export const defaultClassroomApis = [
  getLearningTime,
  getCourse,
  getQnaSummary,
  getLearningRate,
  getContents,
  getCourseContent2,
  getMemberInfo,
  getMyNote,
  getCourseContent,
  getAssignment,
  putTotalScore,
  getCompleteCourseContents,
  getMemberClipProgress,
  getMemberClipProgress2,
  getSupplements,
];

export const classroomApis = [
  getLearningTime,
  getCourse,
  getVideoInfo,
  getQnaSummary,
  getLearningRate,
  getContents,
  getMemberInfo,
  getMyNote,
  getCourseContent,
  getAssignment,
  putTotalScore,
  getCompleteCourseContents,
  getMemberClipProgress,
  getSupplements,
  startVideoProgress,
  updateVideoProgress,
];
