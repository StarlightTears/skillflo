import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const NotificationBlock = styled.section`
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
`;

const Notification = ({
  alarm,
  readAlarmMessage,
}: {
  alarm: {
    id: number;
    messageTag: string;
    url: string;
    createdAtText: string | undefined;
    isUnread: boolean;
  };
  readAlarmMessage: (id: number, url?: string) => void;
}) => {
  return (
    <NotificationBlock onClick={() => readAlarmMessage(alarm.id, alarm.url)}>
      <div
        className={classNames('message', { unread: alarm.isUnread })}
        dangerouslySetInnerHTML={{ __html: alarm.messageTag }}
      />
      <div className="message-created-at">
        {alarm.createdAtText}
        {alarm.isUnread && <div className="unread-mark" />}
      </div>
    </NotificationBlock>
  );
};

export default Notification;
