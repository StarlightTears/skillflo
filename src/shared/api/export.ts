import type { ApiData } from '@/types/api.interface';

import { CrudClientInstance } from '@/shared/api/index';

interface MyNoteResponse {
  url: string;
}

interface ExportCertificationResponse {
  data: string;
}

export const exportMyNote = async () => {
  return CrudClientInstance.get<ApiData<MyNoteResponse>>(`/export/my-note`);
};

export const exportCertificateCompletion = (productId: number, courseId: number) => {
  return CrudClientInstance.get<ExportCertificationResponse>(`/export/certification/${productId}/${courseId}`);
};
