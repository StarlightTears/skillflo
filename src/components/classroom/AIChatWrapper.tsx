import { Global, css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';

import FloatingChat from '@day1co/floating-chat';

import '@day1co/floating-chat/style.css';
import { getApiUrl } from '@/shared/api';
import { useAppDispatch, useToken } from '@/shared/hooks';
import { useClassroomCourse, useClassroomParams } from '@/shared/hooks/classroom';
import { useCourseQnaSummary } from '@/shared/hooks/course-detail';
import { useProduct } from '@/shared/hooks/useProduct';
import slices from '@/shared/store/slices';
import { classroomMedia } from '@/styles/mixins';

interface ClassroomAIChatWrapperProps {
  isJupyterTab: boolean;
}
const globalStyleForFloatingChat = (isJupyterTab: boolean) => css`
  .fcfc-root.theme-fc-b2b {
    --fcfc-fab-background: #fff;
    --fcfc-fab-foreground: var(--color-blue-600);

    position: relative;
    z-index: var(--z-floating-chat);
    flex-direction: column-reverse;

    .fcfc-window {
      position: absolute;
      top: 7.2rem;
      right: 0;
      width: 40rem;
      margin: 0;
    }

    .fcfc-chat-open-qna {
      & > a {
        color: var(--color-blue-600);
      }
    }

    .fcfc-fab-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 8.6rem;
      height: 4rem;
      margin: 0;
      box-shadow: 0 1rem 1.6rem -0.2rem rgb(38 107 255 / 65%);

      font-size: 1.4rem;
      line-height: 2rem;

      .fcfc-fab-toggle-close {
        transform: rotate(180deg);
      }
    }

    .fcfc-dim {
      position: fixed;
      top: 0;
      right: 0;
      width: ${isJupyterTab ? '60vw' : '44rem'};
      height: 100vh;
      background: rgb(0 0 0 / 40%);
    }

    ${classroomMedia('small', 'medium')} {
      position: absolute;
      bottom: auto;
      width: 100%;
      height: 100vh;
      max-height: none;

      .fcfc-window {
        position: fixed;
        inset: 7rem 0 0;
        left: 50%;
        width: 100%;
        max-width: 41.1rem;
        max-height: calc(100vh - 7.2rem);
        margin: 0 auto;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        transform: translateX(-50%);
      }

      .fcfc-fab-toggle {
        margin-right: 1.6rem;
      }

      .fcfc-dim {
        width: 100vw;
      }
    }

    ${classroomMedia('large')} {
      .fcfc-window {
        height: calc(100vh - 16.2rem);
      }
    }
  }
`;

const initFloatingChat = () => {
  const floatingChatRoot = document.querySelector('.fcfc-root');

  if (!floatingChatRoot) {
    setTimeout(initFloatingChat, 500);
    return;
  }

  floatingChatRoot.classList.add('theme-fc-b2b');
};

const ClassroomAIChatWrapper = ({ isJupyterTab }: ClassroomAIChatWrapperProps) => {
  const dispatch = useAppDispatch();
  const aiChatWrapperElementRef = useRef<HTMLDivElement>(null);
  const { accessToken, memberToken } = useToken();
  const { productId, courseId, courseContentId } = useClassroomParams();
  const { data: product } = useProduct(productId);
  const [floatingChat, setFloatingChat] = useState<FloatingChat>();
  const { data: course } = useClassroomCourse();
  const { data: courseQnaSummary } = useCourseQnaSummary(courseId);

  const selectedCourseContentId =
    courseContentId || (course?.extras.contents[0]?.CHAPTER?.[0]?.CONTENT[0].courseContentId as number);

  useEffect(() => {
    if (!aiChatWrapperElementRef.current || !memberToken || !accessToken || !course || !courseQnaSummary) return;
    if (!product) return;

    const courseId = course.id;
    const fcCourseId = course?.extras.fcCourseId as number;
    const isQnaEnabled = product.extras.isQnaBoardExposure && courseQnaSummary.isExist;

    const floatingChat = new FloatingChat(aiChatWrapperElementRef.current, {
      endpoint: `${getApiUrl()}/chat/${fcCourseId}`,
      qna: isQnaEnabled ? `/qna/${productId}/${courseId}` : undefined,
      headers: {
        authorization: `bearer ${accessToken}`,
        'x-bpo-member-token': memberToken,
      },
    });
    floatingChat.setContext({
      lxpCourseId: course.id,
      clip: selectedCourseContentId,
      t: 0,
    });
    setFloatingChat(floatingChat);

    initFloatingChat();
  }, [aiChatWrapperElementRef.current, memberToken, accessToken, course, product, courseQnaSummary]);

  useEffect(() => {
    if (!floatingChat) return;
    const unSubscribe = floatingChat?.watchOpened((isOpened) => {
      dispatch(slices.actions.classroom.setIsFloatingChatOpened(isOpened));
    });
    return () => {
      unSubscribe?.();
    };
  }, [floatingChat]);

  useEffect(() => {
    if (!floatingChat || !course || !selectedCourseContentId) return;

    floatingChat.setContext({
      lxpCourseId: course.id,
      clip: selectedCourseContentId,
      t: 0,
    });
  }, [course, floatingChat, selectedCourseContentId]);

  return (
    <>
      <Global styles={globalStyleForFloatingChat(isJupyterTab)} />
      <div ref={aiChatWrapperElementRef} />
    </>
  );
};

export default ClassroomAIChatWrapper;
