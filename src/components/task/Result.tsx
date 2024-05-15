import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AttachedList, Badge, Button, ImageList, InfoList } from '@/components';
import { useTaskData } from '@/shared/hooks/useTask';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const TaskResultBlock = styled.section`
  padding-top: 2rem;
  padding-bottom: 9.6rem;

  .title {
    ${legacyTypographyMixin('headline2')}
  }

  .wrapper {
    margin-top: 4rem;
    padding-bottom: 4rem;
    border-bottom: 0.1rem solid var(--legacy-color-gray-100);

    &-title {
      margin-top: 2rem;
      margin-bottom: 0.4rem;
      ${legacyTypographyMixin('body1')}
      font-weight: 700;
    }

    &-description {
      margin-bottom: 2rem;
      ${legacyTypographyMixin('body2')}
      color: var(--legacy-color-gray-700);
    }
  }

  .footer {
    display: flex;
    justify-content: right;
    margin-top: 2rem;

    .fc-button {
      width: fit-content;
    }
  }
`;

const TaskResult = () => {
  const navigate = useNavigate();

  const params = useParams();
  const taskId = parseInt(params.taskId as string);
  const productId = parseInt(params.productId as string);
  const courseId = parseInt(params.courseId as string);
  const courseContentId = parseInt(params.courseContentId as string);

  const { data: taskInfo } = useTaskData(taskId, productId, courseId, courseContentId);

  const questionExtras = taskInfo?.questions[0].extras;
  const name = taskInfo?.exam.name;
  const description = questionExtras?.question;
  const attachedImageList = questionExtras?.attachedImages
    ? questionExtras.attachedImages.map((image) => image.url)
    : [];
  const attachedFileList = questionExtras?.attachedFiles ? questionExtras.attachedFiles.map((file) => file.url) : [];
  const attachedLinkList = questionExtras?.url ? [questionExtras.url] : [];
  const submittedName = questionExtras?.submittedAttachedTitle;
  const submittedDescription = questionExtras?.submittedAnswer;
  const submittedAttachedFileList = questionExtras?.submittedAttachedFiles
    ? questionExtras.submittedAttachedFiles.map((file) => file.url)
    : [];
  const feedbackComment = questionExtras?.comment || '';
  const submittedAttachedFeedbackFiles = questionExtras?.submittedAttachedFeedbackFiles || [];

  const taskEvaluationResult = useMemo(() => {
    if (!questionExtras) return { evaluateStateLabel: '', point: '-', convertPoint: '-' };

    const isEvaluated = questionExtras.evaluateState === 'UNEVALUATED';
    return {
      evaluateStateLabel: isEvaluated ? '평가중' : '평가완료',
      point: isEvaluated ? '-' : questionExtras.earnedScore.toFixed(1),
      convertPoint: isEvaluated
        ? '-'
        : questionExtras?.earnedScore !== 0
          ? ((questionExtras.earnedScore / questionExtras.maxScore) * 100).toFixed(1)
          : '0',
    };
  }, [questionExtras]);

  return (
    <TaskResultBlock>
      <h2 className="title">과제 결과</h2>
      <div className="wrapper">
        <InfoList
          list={[
            { title: '상태', content: taskEvaluationResult.evaluateStateLabel },
            {
              title: '평가점수',
              content: `${taskEvaluationResult.point}점`,
              subContent: { useDivider: true, value: `환산 : ${taskEvaluationResult.convertPoint}점` },
            },
          ]}
        />
      </div>
      <div className="wrapper">
        <Badge theme="gray" size="medium" bgColorScale={600}>
          과제내용
        </Badge>
        <div className="wrapper-title">{name}</div>
        <div className="wrapper-description">{description}</div>
        <ImageList imageList={attachedImageList} />
        <AttachedList fileList={attachedFileList} linkList={attachedLinkList} />
      </div>
      <div className="wrapper">
        <Badge size="medium">제출내용</Badge>
        <div className="wrapper-title">{submittedName}</div>
        <div className="wrapper-description">{submittedDescription}</div>
        <AttachedList fileList={submittedAttachedFileList} linkList={[]} />
      </div>
      {(feedbackComment || submittedAttachedFeedbackFiles.length > 0) && (
        <div className="wrapper">
          <Badge size="medium">피드백</Badge>
          {feedbackComment && <div className="wrapper-title">{feedbackComment}</div>}
          <AttachedList fileList={submittedAttachedFeedbackFiles.map((item) => item.url)} linkList={[]} />
        </div>
      )}
      <footer className="footer">
        <Button
          theme="primary"
          size="medium"
          onClick={() => {
            navigate(`/course-detail/${productId}/${courseId}?tab=exam`);
          }}
        >
          목록으로
        </Button>
      </footer>
    </TaskResultBlock>
  );
};

export default TaskResult;
