import { useMutation } from '@tanstack/react-query';

import { DateUtil } from '@day1co/pebbles';

import { getFileUploadUrl as getFileUploadUrlApi, uploadFileIntoGcs as uploadFileIntoGcsApi } from '../api/file-upload';

import type { GetUrlPayload, UploadFilePayload } from '@/types/file-upload';

export const useFileUpload = () => {
  const getFileUploadUrlMutation = useMutation((payload: GetUrlPayload) => getFileUploadUrlApi(payload));

  const uploadFileIntoGcsMutation = useMutation((payload: UploadFilePayload) => uploadFileIntoGcsApi(payload));

  const uploadFileIntoGcs = (fileList: File[]) => {
    return Promise.all(
      fileList.map(async (file) => {
        const code = `${DateUtil.format(new Date(), { format: 'YYYYMMDDHHmmss' })}/${file.name}`;
        const {
          data: { directPutUrl, url },
        } = await getFileUploadUrlMutation.mutateAsync({
          type: 'GCS',
          code,
          mimeType: 'application/octet-stream',
        });

        await uploadFileIntoGcsMutation.mutateAsync({ directPutUrl, file });

        return {
          url,
          name: file.name,
        };
      })
    );
  };

  return { uploadFileIntoGcs };
};
