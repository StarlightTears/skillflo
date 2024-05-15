import styled from '@emotion/styled';

import { classroomMedia } from '@/styles/mixins';

const ClassroomMeetMeetPlaceholder = styled.div`
  display: block;
  width: 100%;

  ${classroomMedia('small', 'medium')} {
    height: var(--classroom-player-small-large-viewport-height);
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

export default ClassroomMeetMeetPlaceholder;
