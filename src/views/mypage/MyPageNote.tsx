import { css } from '@emotion/react';
import React, { useState } from 'react';

import type { CourseNote } from '@/types/note.interface';

import {
  MypageCourseNoteItem,
  MypageCourseNotePopup,
  EmptyPlaceholder,
  EmptyNoteBlue,
  Modal,
  MypageSubPageWrapper,
} from '@/components';
// import CourseBlock from '@/components/common/CourseBlock';
import { useCourseListWithNote } from '@/shared/hooks';
import { getCourseEnrollmentState } from '@/shared/utils/course';
import { media } from '@/styles/legacy-mixins';

const MyPageNoteStyle = css`
  .download-button {
    width: 20rem;
    margin: 1.5rem 0;
    ${media('small')} {
      width: 100%;
    }
  }

  .note-list {
    display: flex;
    flex-direction: column;
    gap: 3.6rem;
    padding: 0 1.6rem;
  }
`;

// const MypageCourseListBlock = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const MyPageNote = () => {
  const { data: courseNoteList } = useCourseListWithNote();
  // const { exportMyNote } = useExportMyNote();
  // const { isSmallViewport } = useViewport();
  const [isOpenProgressDownloadPopup, setOpenProgressDownloadPopup] = useState(false);
  const [notePopupData, setNotePopupData] = useState<CourseNote | null>(null);
  // const exportNoteExcelFile = () => {
  //   exportMyNote()
  //     .then((data) => {
  //       setTimeout(() => {
  //         saveFile(data.data.data.url);
  //         setOpenProgressDownloadPopup(false);
  //       }, 3000);
  //     })
  //     .catch(() => {
  //       alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
  //       setOpenProgressDownloadPopup(false);
  //     });
  //   setOpenProgressDownloadPopup(true);
  // };

  return (
    <MypageSubPageWrapper title="나의 노트" css={MyPageNoteStyle}>
      {courseNoteList.length > 0 ? (
        <>
          {/* {!isSmallViewport ? (
            <div className="note-list">
              {courseNoteList.map((courseNote) => (
                <MypageCourseNoteItem
                  key={courseNote.id}
                  title={courseNote.publicName}
                  thumbnailUrl={courseNote.extras.thumbnail?.url || ''}
                  productName={courseNote.product.extras.publicName}
                  noteList={courseNote.myNote.extras.note}
                  course={courseNote}
                  onClick={() => setNotePopupData(courseNote)}
                />
              ))}
            </div>
          ) : (
            <MypageCourseListBlock>
              {courseNoteList.map((courseNote) => (
                <CourseBlock
                  key={`${courseNote.product.id}-${courseNote.id}`}
                  course={courseNote}
                  type="note"
                  onThumbnailClick={() => setNotePopupData(courseNote)}
                  onDescriptionClick={() => setNotePopupData(courseNote)}
                />
              ))}
            </MypageCourseListBlock>
          )} */}
          <div className="note-list">
            {courseNoteList.map((courseNote) => (
              <MypageCourseNoteItem
                key={courseNote.id}
                title={courseNote.publicName}
                thumbnailUrl={courseNote.extras.thumbnail?.url || ''}
                productName={courseNote.product.extras.publicName}
                noteList={courseNote.myNote.extras.note}
                course={courseNote}
                onClick={() => setNotePopupData(courseNote)}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyNoteBlue />
          작성된 노트가 없습니다.
        </EmptyPlaceholder>
      )}
      {isOpenProgressDownloadPopup && (
        <Modal
          title="노트 일괄 다운로드"
          content="파일을 생성중입니다. 잠시만 기다려주세요."
          hideCancelButton
          onConfirm={() => setOpenProgressDownloadPopup(false)}
        />
      )}
      {notePopupData && (
        <Modal
          title="노트"
          hasContentHr
          hasCloseButton
          hideFooter
          size="medium"
          confirmButtonText="닫기"
          content={
            <MypageCourseNotePopup
              courseTitle={notePopupData.publicName}
              noteList={notePopupData.myNote.extras.note}
              courseId={notePopupData.id}
              productId={notePopupData.product.id}
              isShowPlayBtn={getCourseEnrollmentState(notePopupData).isOngoingCourse}
            />
          }
          onCloseModal={() => setNotePopupData(null)}
        />
      )}
    </MypageSubPageWrapper>
  );
};

export default MyPageNote;
