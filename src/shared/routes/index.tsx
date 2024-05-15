import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

import { TaskResult, ExamResult, RequireAuth, Container, DeprecatedRoute, ReactChannelIO } from '@/components';
import CheckSkillsWrapper from '@/components/home/CheckSkillsWrapper';
import TempMobileBlockingWrapper from '@/components/skill360/TempMobileBlockingWrapper';
import SurveyRoute from '@/components/survey/Route';
import AuthLayout from '@/views/auth/Layout';
import PasswordFind from '@/views/auth/PasswordFind';
import PasswordReset from '@/views/auth/PasswordReset';
import Signin from '@/views/auth/SignIn';
import Authorize from '@/views/authorize/Layout';
import ClassroomContentMeet from '@/views/classroom/ContentMeet';
import ClassroomLayout from '@/views/classroom/Layout';
import ClassroomMeetMeetPlaceholder from '@/views/classroom/MeetPlaceholder';
import CourseBridgeLayout from '@/views/course-detail/renewal/BridgeLayout';
import CourseDetail from '@/views/course-detail/renewal/DetailLayout';
import DefaultLayout from '@/views/DefaultLayout';
import EnrollmentLayout from '@/views/enrollment/Layout';
import ExternalSSOLayout from '@/views/external/Layout';
import Forbidden from '@/views/Forbidden';
import HomeLayout from '@/views/home/Layout';
import HomeContentPageLayout from '@/views/HomeContentPage/Layout';
import InterestsLayout from '@/views/interests/Layout';
import MypageLayout from '@/views/mypage/Layout';
import MyPageCourse from '@/views/mypage/MyPageCourse';
import MyPageInfo from '@/views/mypage/MyPageInfo';
import MyPageInterests from '@/views/mypage/MyPageInterests';
import MyPageNote from '@/views/mypage/MyPageNote';
import MyPageNoticeList from '@/views/mypage/MyPageNoticeList';
import MyPageRecents from '@/views/mypage/MyPageRecents';
import MyPageSummary from '@/views/mypage/MyPageSummary';
import NotFound from '@/views/NotFound';
import NoticeView from '@/views/notice/view';
import PersonalInfoLayout from '@/views/personal/Layout';
import QnaEditForm from '@/views/qna/QnaEditForm';
import QnaForm from '@/views/qna/QnaForm';
import QnaLayout from '@/views/qna/QnaLayout';
import QnaList from '@/views/qna/QnaList';
import QnaView from '@/views/qna/QnaView';
import SearchLayout from '@/views/search/Layout';
import SkillAssessmentLayout from '@/views/skill360/assessment/Layout';
import Skill360HomeLayout from '@/views/skill360/Layout';
import ResultLayout from '@/views/skill360/result/Layout';
import SkillDetailLayout from '@/views/skill360/skill-detail/SkillDetailLayout';
import SurveyLayout from '@/views/survey/Layout';

const CustomRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <RequireAuth>
          <DefaultLayout />
        </RequireAuth>
      ),
      children: [
        {
          index: true,
          element: (
            <CheckSkillsWrapper>
              <HomeLayout />
            </CheckSkillsWrapper>
          ),
        },
        {
          path: 'skills',
          element: (
            <TempMobileBlockingWrapper>
              <Outlet />
            </TempMobileBlockingWrapper>
          ),
          children: [
            {
              index: true,
              element: <Skill360HomeLayout />,
            },
            {
              path: ':skillId',
              element: <SkillDetailLayout />,
            },
            {
              path: ':skillId/result',
              element: <ResultLayout />,
            },
          ],
        },
        {
          path: 'interests',
          element: (
            <Container>
              <InterestsLayout />
            </Container>
          ),
        },
        {
          path: 'search',
          element: (
            <Container>
              <SearchLayout />
            </Container>
          ),
        },
        {
          path: 'mypage',
          element: <MypageLayout />,
          children: [
            {
              index: true,
              element: <MyPageSummary />,
            },
            {
              path: 'recents',
              element: <MyPageRecents />,
            },
            {
              path: 'course',
              element: <MyPageCourse />,
            },
            {
              path: 'note',
              element: <MyPageNote />,
            },
            {
              path: 'notice',
              element: <MyPageNoticeList />,
            },
            {
              path: 'interests',
              element: <MyPageInterests />,
            },
            {
              path: 'info',
              element: <MyPageInfo />,
            },
            {
              path: '*',
              element: <div>404</div>,
            },
          ],
        },
        {
          path: 'qna/:productId/:courseId',
          element: <QnaLayout />,
          children: [
            {
              index: true,
              element: (
                <Container>
                  <QnaList />
                </Container>
              ),
            },
            {
              path: 'create',
              element: (
                <Container>
                  <QnaForm />
                </Container>
              ),
            },
            {
              path: ':questionId',
              element: <QnaView />,
            },
            {
              path: ':questionId/edit',
              element: (
                <Container>
                  <QnaEditForm />
                </Container>
              ),
            },
          ],
        },
        {
          path: 'notice/:noticeId',
          element: (
            <Container>
              <NoticeView />
            </Container>
          ),
        },
        {
          path: 'enrollment',
          element: (
            <Container>
              <EnrollmentLayout />
            </Container>
          ),
        },
        {
          path: 'course/:courseId',
          element: <CourseBridgeLayout />,
        },
        {
          path: 'course-detail/:productId/:courseId',
          element: <CourseDetail />,
        },
        {
          path: 'task/:taskId/:productId/:courseId/:courseContentId',
          element: (
            <Container>
              <TaskResult />
            </Container>
          ),
        },
        {
          path: 'exam-result/:productId/:courseId/:examId',
          element: (
            <Container>
              <ExamResult />
            </Container>
          ),
        },
        {
          path: 'page/:pageId',
          element: <HomeContentPageLayout />,
        },
        {
          path: 'member-survey',
          element: <SurveyLayout />,
        },
      ],
    },
    {
      path: '/auth',
      element: (
        <>
          <ReactChannelIO />
          <AuthLayout />
        </>
      ),
      children: [
        {
          path: '/auth/signin',
          element: <Signin />,
        },
        {
          path: '/auth/password-find',
          element: <PasswordFind />,
        },
        {
          path: '/auth/password-reset',
          element: <PasswordReset />,
        },
      ],
    },
    {
      path: '/authorize',
      element: <Authorize />,
    },
    {
      path: '/external/sso',
      element: <ExternalSSOLayout />,
    },
    {
      path: 'classroom/product/:productId/course/:courseId',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: (
            <DeprecatedRoute
              to={({ params }) => {
                const { productId, courseId } = params;
                return `/classroom/${productId}/${courseId}`;
              }}
            />
          ),
        },
        {
          path: 'courseContent/:courseContentId',
          element: (
            <DeprecatedRoute
              to={({ params, searchParams }) => {
                const { productId, courseId, courseContentId } = params;
                let url = `/classroom/${productId}/${courseId}/content/${courseContentId}`;

                if (searchParams.size) {
                  url += `?${searchParams.toString()}`;
                }

                return url;
              }}
            />
          ),
        },
        {
          path: 'exam/:examId',
          element: (
            <DeprecatedRoute
              to={({ params }) => {
                const { productId, courseId, examId } = params;
                return `/classroom/${productId}/${courseId}/exam/${examId}`;
              }}
            />
          ),
        },
      ],
    },
    {
      path: 'classroom/:productId/:courseId',
      element: (
        <RequireAuth>
          <ClassroomLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: 'content/:courseContentId',
          index: true,
        },
        {
          path: 'exam/:examId',
        },
      ],
    },
    {
      path: 'skills/:skillId/assessment',
      element: (
        <RequireAuth>
          <TempMobileBlockingWrapper>
            <SkillAssessmentLayout />
          </TempMobileBlockingWrapper>
        </RequireAuth>
      ),
    },
    {
      path: 'meet/:productId/:courseId',
      element: (
        <RequireAuth>
          <ClassroomLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: 'content/:courseContentId',
          element: <ClassroomContentMeet />,
        },
        {
          path: '',
          element: <ClassroomMeetMeetPlaceholder />,
        },
      ],
    },
    {
      path: 'personal-info',
      element: (
        <RequireAuth>
          <PersonalInfoLayout />
        </RequireAuth>
      ),
    },
    {
      path: 'survey',
      element: (
        <>
          <ReactChannelIO />
          <SurveyRoute />
        </>
      ),
    },
    {
      path: 'forbidden',
      element: (
        <>
          <ReactChannelIO />
          <Forbidden />
        </>
      ),
    },
    {
      path: '*',
      element: (
        <>
          <ReactChannelIO />
          <NotFound />
        </>
      ),
    },
  ];
  return useRoutes(routes);
};

export default CustomRoutes;
