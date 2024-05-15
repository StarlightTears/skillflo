import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import type { HttpClientError } from '@/types/api.interface';
import type { Question, Comment } from '@/types/qna.interface';

import {
  createQnaQuestionComment,
  deleteQnaQuestion,
  deleteQnaQuestionComment,
  editQnaQuestionComment,
  getQnaBoardQuestion,
  getQnaBoardQuestionCommentList,
  getQnaQuestionList,
  setQnaContentLike,
} from '@/shared/api/qna';
import { useCourse } from '@/shared/hooks';
import { usePrevNextPagination } from '@/shared/hooks/usePrevNextPagination';
import { PAGINATAION_COUNT_LIMIT_PER_PAGE, QUERY_KEYS } from '@/shared/policy';

interface QnaQuestionListPayload {
  showOnlyMyQuestions: boolean;
}

export const useQnaParam = () => {
  const params = useParams();
  const courseId = Number(params.courseId);
  const productId = Number(params.productId);

  return { courseId, productId };
};

export const useQuestionParams = () => {
  const params = useParams();
  return {
    productId: Number(params.productId),
    courseId: Number(params.courseId),
    questionId: Number(params.questionId),
  };
};

export const useQnaCourse = () => {
  const { courseId } = useQnaParam();

  return useCourse(courseId);
};

export const useQnaQuestionList = ({ showOnlyMyQuestions }: QnaQuestionListPayload) => {
  const navigate = useNavigate();
  const { courseId, productId } = useQnaParam();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') || '';
  const mode = searchParams.get('mode') || 'next';
  const lastId = Number(searchParams.get('lastId')) || undefined;

  const { data } = useQuery(
    QUERY_KEYS.QNA_BOARD_QUESTION_LIST(productId, courseId, title, showOnlyMyQuestions, mode, lastId),
    () =>
      getQnaQuestionList({
        productId,
        courseId,
        title,
        showOnlyMyQuestions,
        limit: PAGINATAION_COUNT_LIMIT_PER_PAGE + 1,
        mode,
        lastId,
      }),
    {
      cacheTime: 0,
      onError(error: HttpClientError) {
        if (error.response?.data?.message) {
          if (error.response.data.message === 'enrollment is not exist!!') {
            alert('수강신청 이후 게시판을 이용 해주세요');
            navigate(`/course/${courseId}`);
          }
          if (error.response.data.message === 'This product does not have access to the qna board') {
            alert('게시판 이용이 불가능한 상품입니다.');
            // navigate('/');
          }
        }
      },
    }
  );

  const { isShowPagination, isFirstPage, isLastPage, sortedList } = usePrevNextPagination<Question>(
    data,
    PAGINATAION_COUNT_LIMIT_PER_PAGE,
    [productId, courseId, title, showOnlyMyQuestions]
  );

  return {
    data: sortedList,
    mode,
    lastId,
    isShowPagination,
    isFirstPage,
    isLastPage,
  };
};

export const useQnaQuestion = () => {
  const { productId, courseId, questionId } = useQuestionParams();

  return useQuery(QUERY_KEYS.QNA_BOARD_QUESTION(questionId), () =>
    getQnaBoardQuestion(productId, courseId, questionId)
  );
};

export const useQnaQuestionCommentList = () => {
  const { questionId } = useQuestionParams();

  return useQuery(QUERY_KEYS.QNA_BOARD_QUESTION_COMMENT(questionId), () => getQnaBoardQuestionCommentList(questionId));
};

export const useQnaNavigate = () => {
  const { courseId, productId } = useQnaParam();
  const navigate = useNavigate();

  return (subUrl = '') => {
    navigate(`/qna/${productId}/${courseId}${subUrl}`);
  };
};

export const useQuestionLikeApi = (contentId: number) => {
  const contentLikeMutation = useMutation((like: boolean) => setQnaContentLike(contentId, like));

  const setContentLike = async (like: boolean) => {
    await contentLikeMutation.mutateAsync(like);
  };

  return { setContentLike };
};

export const useQuestionViewApis = () => {
  const navigate = useQnaNavigate();
  const { questionId } = useQuestionParams();
  const { data: commentData } = useQnaQuestionCommentList();
  const commentList = commentData?.qnaComments;
  const deleteQuestionMutation = useMutation(() => deleteQnaQuestion(questionId));

  const queryClient = useQueryClient();
  const { setContentLike } = useQuestionLikeApi(questionId);

  const setQuestionLike = async (like: boolean) => {
    await setContentLike(like);

    queryClient.setQueryData(QUERY_KEYS.QNA_BOARD_QUESTION(questionId), (data?: Question) => {
      if (!data) return;

      data.qna.extras.likeCount += like ? 1 : -1;
      data.qna.extras.isLiked = like;

      return { ...data };
    });
  };

  const editQuestion = () => {
    navigate(`/${questionId}/edit`);
  };

  const deleteQuestion = async () => {
    if (commentList?.length) {
      alert('댓글이 있는 질문은 삭제할 수 없습니다.');
      return;
    }

    const shouldDeleteQuestion = confirm('글을 삭제하시곘습니까? 삭제하면 되돌릴 수 없습니다.');

    if (!shouldDeleteQuestion) return;
    await deleteQuestionMutation.mutateAsync();
    navigate();
  };

  return { setQuestionLike, editQuestion, deleteQuestion };
};

export const useQuestionCommentForm = () => {
  const { questionId } = useQuestionParams();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation((content: string) => {
    return createQnaQuestionComment({ questionId, content });
  });

  return {
    createComment: async (comment: string) => {
      await mutateAsync(comment);
      queryClient.invalidateQueries(QUERY_KEYS.QNA_BOARD_QUESTION_COMMENT(questionId));
    },
  };
};

export const useQuestionCommentApis = (commentId: number) => {
  const { questionId } = useQuestionParams();
  const queryClient = useQueryClient();

  const resetCommentList = () => {
    queryClient.invalidateQueries(QUERY_KEYS.QNA_BOARD_QUESTION_COMMENT(questionId));
  };

  const { mutateAsync: editMutateAsync } = useMutation((content: string) => {
    return editQnaQuestionComment({ questionId, commentId, content });
  });
  const editComment = async (content: string) => {
    await editMutateAsync(content);
    resetCommentList();
  };

  const { mutateAsync: deleteMutateAsync } = useMutation(() => {
    return deleteQnaQuestionComment(questionId, commentId);
  });
  const deleteComment = async () => {
    await deleteMutateAsync();
    resetCommentList();
  };

  const { setContentLike } = useQuestionLikeApi(commentId);
  const setCommentLike = async (like: boolean) => {
    await setContentLike(like);
    queryClient.setQueryData(QUERY_KEYS.QNA_BOARD_QUESTION_COMMENT(questionId), (data?: { qnaComments: Comment[] }) => {
      if (!data) return;

      return {
        qnaComments: data.qnaComments.map((comment) => {
          if (comment.comment.id === commentId) {
            comment.comment.extras.likeCount += like ? 1 : -1;
            comment.comment.extras.isLiked = like;
          }

          return comment;
        }),
      };
    });
  };

  return {
    editComment,
    deleteComment,
    setCommentLike,
  };
};
