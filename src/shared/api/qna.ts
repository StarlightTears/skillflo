import { DateUtil } from '@day1co/pebbles';

import { getFileUploadUrl, uploadFileIntoGcs } from './file-upload';

import type { ApiData } from '@/types/api.interface';
import type { Comment, Question, QuestionFilePayload, QuestionPayload } from '@/types/qna.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const getQnaQuestionList = async ({
  productId,
  courseId,
  showOnlyMyQuestions,
  title,
  limit,
  lastId,
  mode,
}: {
  productId: number;
  courseId: number;
  showOnlyMyQuestions: boolean;
  title?: string;
  limit?: number;
  lastId?: number;
  mode: string;
}) => {
  const response = await CrudClientInstance.get<ApiData<Question[]>>('/qna', {
    productId,
    courseId,
    title,
    isMyArticle: showOnlyMyQuestions + '',
    limit,
    lastId,
    mode,
  });

  return response.data.data;
};

export const getQnaBoardQuestion = async (productId: number, courseId: number, questionId: number) => {
  const response = await CrudClientInstance.get<ApiData<Question>>(`/qna/${questionId}`, { courseId, productId });

  return response.data.data;
};

export const getQnaBoardQuestionCommentList = async (questionId: number) => {
  const response = await CrudClientInstance.get<ApiData<{ qnaComments: Comment[] }>>(`/qna/${questionId}/comment`);

  return response.data.data;
};

const uploadQuestionFile = async (filePayloadList: QuestionFilePayload[]) => {
  return Promise.all(
    filePayloadList.map(async (filePayload) => {
      const file = filePayload.file;

      if (filePayload.gcpUrl) {
        return {
          url: filePayload.gcpUrl,
          name: file.name,
        };
      }

      const uploadCode = `${DateUtil.format(new Date(), { format: 'YYYYMMDDHHmmss' })}/${file.name}`;

      const {
        data: { directPutUrl, url },
      } = await getFileUploadUrl({
        type: 'GCS',
        code: uploadCode,
        mimeType: 'application/octet-stream',
      });
      await uploadFileIntoGcs({ directPutUrl, file });

      return {
        url,
        name: file.name,
      };
    })
  );
};

const createQnaQuestionBodyData = async ({
  name,
  courseId,
  courseContentId,
  content,
  keywords,
  filePayloadList,
}: QuestionPayload) => {
  const fileDataList = await uploadQuestionFile(filePayloadList);

  return {
    name,
    extras: {
      courseId,
      courseContentId,
      content,
      keywords,
      file: fileDataList,
    },
  };
};

export const createQnaQuestion = async (payload: QuestionPayload) => {
  const qnaBody = await createQnaQuestionBodyData(payload);
  const response = await CrudClientInstance.post<ApiData<{ id: number }>>('/qna', {}, qnaBody);

  return response.data.data;
};

export const setQnaContentLike = (questionId: number, like: boolean) => {
  const method = like ? 'put' : 'delete';

  return CrudClientInstance[method](`/qna/${questionId}/like`, {}, {});
};

export const editQnaQuestion = async ({ questionId, ...payload }: QuestionPayload & { questionId: number }) => {
  const qnaBody = await createQnaQuestionBodyData(payload);
  const response = await CrudClientInstance.put<ApiData<{ id: number }>>(`/qna/${questionId}`, {}, qnaBody);

  return response.data.data;
};

export const deleteQnaQuestion = (questionId: number) => {
  return CrudClientInstance.delete(`/qna/${questionId}`);
};

interface QuestionCommentPayload {
  questionId: number;
  content: string;
}

export const createQnaQuestionComment = ({ questionId, content }: QuestionCommentPayload) => {
  return CrudClientInstance.post(`/qna/${questionId}/comment`, {}, { content });
};

export const editQnaQuestionComment = ({
  questionId,
  content,
  commentId,
}: QuestionCommentPayload & { commentId: number }) => {
  return CrudClientInstance.put(`/qna/${questionId}/comment/${commentId}`, {}, { content });
};

export const deleteQnaQuestionComment = (questionId: number, commentId: number) => {
  return CrudClientInstance.delete(`/qna/${questionId}/comment/${commentId}`);
};
