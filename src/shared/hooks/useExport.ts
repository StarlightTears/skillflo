import { useMutation } from '@tanstack/react-query';
import { jsPDF } from 'jspdf';

import { exportMyNote as exportMyNoteApi } from '../api/export';

import { useModal } from './useModal';

import type { OriginCourse, CourseScore } from '@/types/course.interface';

import { exportCertificateCompletion } from '@/shared/api/export';

interface ExportCertificateProps {
  course: OriginCourse;
  courseScore?: CourseScore;
  requiredCourseScore?: CourseScore;
}

export const useExportMyNote = () => {
  const exportMyNoteMutation = useMutation(() => exportMyNoteApi());

  const exportMyNote = () => {
    return exportMyNoteMutation.mutateAsync();
  };

  return { exportMyNote };
};

export const useExportCertificate = ({ course, courseScore, requiredCourseScore }: ExportCertificateProps) => {
  const isCompletionCertification = course.requiredCourse
    ? requiredCourseScore?.courseCompletion
    : courseScore?.courseCompletion;

  const { openModal, closeModal } = useModal();
  const putNotificationMutation = useMutation(() => exportCertificateCompletion(course.product.id, course.id));

  const exportCertificate = () => {
    openModal({
      title: '수료증 다운로드',
      content: '수료증을 다운로드 하는 중입니다.',
      hideCancelButton: true,
      onConfirm: () => closeModal(),
    });
    Promise.all([putNotificationMutation.mutateAsync(), import('@/shared/utils/pdf')]).then(
      ([
        {
          data: { data: pdfTemplate },
        },
        { pretendardByBase64 },
      ]) => {
        const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
        doc.addFileToVFS('PretendardVariable', pretendardByBase64);
        doc.addFont('PretendardVariable', 'Pretendard Variable', 'normal');
        doc.setFont('Pretendard Variable');
        doc.html(pdfTemplate, {
          callback: function (doc) {
            doc.deletePage(2);
            doc.save('수료증명서.pdf');
            closeModal();
          },
        });
      }
    );
  };

  return { isCompletionCertification, exportCertificate };
};
