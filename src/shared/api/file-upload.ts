import type { GetUrlPayload, GetUrlResponse, UploadFilePayload } from '@/types/file-upload';

import { CrudClientInstance } from '@/shared/api/index';

export const getFileUploadUrl = async (payload: GetUrlPayload) => {
  return CrudClientInstance.post<GetUrlResponse>(`/uploads`, {}, payload);
};

export const uploadFileIntoGcs = async (payload: UploadFilePayload) => {
  return CrudClientInstance.uploadFile(payload);
};
