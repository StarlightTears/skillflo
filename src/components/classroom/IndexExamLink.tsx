import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ProgressStatus } from '@/types/common.interface';
import type { ExamTaskMeta } from '@/types/exam.interface';

import { ClassroomIndexLink, Modal } from '@/components';
import { useViewport } from '@/shared/hooks';
import { useClassroomNavigate, useClassroomParams } from '@/shared/hooks/classroom';
interface ClassroomIndexExamLinkProps {
  exam: ExamTaskMeta;
}

const statusTextMap = {
  COMPLETE: '제출',
  EXPIRED: '만료됨',
  READY: '미제출',
} as Record<ProgressStatus, string>;

const ClassroomIndexExamLink = ({ exam }: ClassroomIndexExamLinkProps) => {
  const { productId, courseId, examId } = useClassroomParams();
  const navigate = useNavigate();
  const classroomNavigate = useClassroomNavigate();
  const [isOpenRequireDesktopPopup, setOpenRequireDesktopPopup] = useState(false);
  const { isLargeViewport } = useViewport();
  const progressStatus = exam.extras.progressStatus as ProgressStatus;
  // TODO: 복수 응시가 가능하게 될 경우에 수정될 코드입니다. (isEndedExam)
  const isEndedExam = ['COMPLETE', 'EXPIRED'].includes(progressStatus);
  const statusText = statusTextMap[progressStatus] || '미제출';

  return (
    <>
      <ClassroomIndexLink
        title={exam.name}
        type="EXAM"
        isCompleted={isEndedExam}
        isSelected={examId === exam.id}
        dataText={statusText}
        onClickLink={() => {
          if (isEndedExam) {
            if (isLargeViewport) {
              navigate(`/exam-result/${productId}/${courseId}/${exam.id}`);
            } else {
              setOpenRequireDesktopPopup(true);
            }
          } else {
            classroomNavigate({ examId: exam.id });
          }
        }}
      />
      {isOpenRequireDesktopPopup && (
        <Modal
          title="알림"
          content="시험 및 과제결과는 PC환경에서 확인해주세요."
          onConfirm={() => setOpenRequireDesktopPopup(false)}
          onCloseModal={() => setOpenRequireDesktopPopup(false)}
        />
      )}
    </>
  );
};

export default ClassroomIndexExamLink;
