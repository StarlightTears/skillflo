import styled from '@emotion/styled';
import React from 'react';

import { ClassroomZoomWrapper } from '@/components';
import { useClassroomParams } from '@/shared/hooks/classroom';
import { useCourseContent } from '@/shared/hooks/useCourseContent';
import { classroomMedia } from '@/styles/mixins';

const ClassroomContentMeetBlock = styled(ClassroomZoomWrapper)`
  display: block;
  width: 100%;

  ${classroomMedia('small', 'medium')} {
    height: var(--classroom-meet-small-large-viewport-height);
  }

  ${classroomMedia('large')} {
    height: calc(
      100vh - var(--classroom-content-info-large-viewport-height) - var(
          --classroom-content-controller-large-viewport-height
        )
    );
    margin: 4.8rem 0 0;
  }
`;

const ClassroomContentMeet = () => {
  const { courseContentId } = useClassroomParams();
  const { data: courseContent } = useCourseContent(courseContentId);

  if (!courseContent?.meeting) return null;

  const { roomId, password } = courseContent.meeting.meetingRoomList[0];

  return <ClassroomContentMeetBlock key={roomId} meetingNumber={roomId} password={password} />;
};

export default ClassroomContentMeet;
