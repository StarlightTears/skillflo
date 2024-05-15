import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import EmptyPlaceholder from './mypage/EmptyPlaceholder';
import Notification from './notification/Notification';

import { CloseLarge, EmptyNoteBlue } from '@/components';
import { useViewport } from '@/shared/hooks';
import { useNotification } from '@/shared/hooks/useNotification';
import { legacyTypographyMixin, media } from '@/styles/legacy-mixins';

const AlarmModuleBlock = styled.section`
  overflow-y: auto;
  background-color: var(--color-white);
  ${legacyTypographyMixin('body1')}

  .empty-placeholder {
    padding: 10rem 0 0;
  }

  .alarm-li {
    padding: 1.6rem 0.8rem 1.2rem;
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);
    cursor: pointer;

    .message {
      margin-bottom: 0.6rem;

      span {
        display: inline-block;
        width: 100%;
      }
    }

    .unread {
      font-weight: 700;
    }

    .message-created-at {
      display: flex;
      align-items: center;
      ${legacyTypographyMixin('caption')}
      color: var(--legacy-color-gray-400);

      .unread-mark {
        width: 0.6rem;
        height: 0.6rem;
        margin-left: 0.4rem;
        border-radius: 0.3rem;
        background-color: var(--color-primary-1);
      }
    }

    &:hover {
      background-color: var(--legacy-color-gray-50);
    }

    &:last-child {
      border: none;
    }
  }

  ${media('large')} {
    position: absolute;
    top: 8rem;
    left: 50%;

    width: 32rem;
    height: auto;
    min-height: 30rem;
    max-height: 58rem;
    border: 0.1rem solid var(--legacy-color-gray-50);
    border-radius: 0.6rem;
    box-shadow: 0.6rem 0.6rem 4rem rgba(0 0 0 / 10%);

    header {
      display: none;
    }

    .alarm-content {
      padding: 0.8rem 1.2rem 0;
    }
  }

  ${media('small', 'medium')} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 5.6rem;
      padding: 1.6rem;
      background-color: var(--color-white);
      font-weight: 700;
    }

    .alarm-content {
      padding: 2.8rem 1.6rem 0;
    }
  }
`;

const AlarmModule = ({ closeButtonAction }: { closeButtonAction: () => void }) => {
  const navigate = useNavigate();
  const { isLargeViewport } = useViewport();
  const { alarmList, putNotification } = useNotification();
  // const response = {
  //   data: [
  //     {
  //       id: 1,
  //       messageTag: '<span>안녕하세요! 새로운 알림이 도착했습니다.</span>',
  //       createdAtText: '2021.09.01',
  //       isUnread: false,
  //       url: '/mypage',
  //     },
  //     {
  //       id: 2,
  //       messageTag: '<span>안녕하세요! 새로운 알림이 도착했습니다.</span>',
  //       createdAtText: '2021.09.01',
  //       isUnread: true,
  //       url: '/mypage',
  //     },
  //     {
  //       id: 3,
  //       messageTag: '<span>안녕하세요! 새로운 알림이 도착했습니다.</span>',
  //       createdAtText: '2021.09.01',
  //       isUnread: true,
  //       url: '/mypage',
  //     },
  //     {
  //       id: 4,
  //       messageTag: '<span>안녕하세요! 새로운 알림이 도착했습니다.</span>',
  //       createdAtText: '2021.09.01',
  //       isUnread: true,
  //       url: '/mypage',
  //     },
  //     {
  //       id: 5,
  //       messageTag: '<span>안녕하세요! 새로운 알림이 도착했습니다.</span>',
  //       createdAtText: '2024.12.01',
  //       isUnread: true,
  //       url: '/mypage',
  //     },
  //   ],
  // } as any;
  // alarmList = response.data;
  const closeElement = () => {
    closeButtonAction();
  };

  const readAlarmMessage = (id: number, url?: string) => {
    if (url) {
      navigate(url);
    }
    putNotification(id);
  };

  useEffect(() => {
    if (!isLargeViewport) return;

    document.addEventListener('click', closeElement);
    return function removeCloseElementListener() {
      document.removeEventListener('click', closeElement);
    };
  }, []);

  return (
    <AlarmModuleBlock>
      <header>
        알람 <CloseLarge onClick={closeButtonAction} />
      </header>
      {alarmList && alarmList.length > 0 ? (
        <div className="alarm-content">
          {alarmList.map((alarm) => (
            // <div className="alarm-li" key={alarm.id} onClick={() => readAlarmMessage(alarm.id, alarm.url)}>
            //   <div
            //     className={classNames(['message', { unread: alarm.isUnread }])}
            //     dangerouslySetInnerHTML={{ __html: alarm.messageTag }}
            //   />
            //   <div className="message-created-at">
            //     {alarm.createdAtText}
            //     {alarm.isUnread && <div className="unread-mark" />}
            //   </div>
            // </div>
            <Notification alarm={alarm} key={alarm.id} readAlarmMessage={readAlarmMessage} />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder className="empty-placeholder">
          <EmptyNoteBlue />
          알림 내역이 없습니다.
        </EmptyPlaceholder>
      )}
    </AlarmModuleBlock>
  );
};

export default AlarmModule;
