import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import type { SolveQuestionPayload } from '@/types/task.interface';

import { AttachedList, Input, ImageList, TextArea, FileUploader } from '@/components';
import { useModal, useToast } from '@/shared/hooks';
import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { useTaskData } from '@/shared/hooks/useTask';
import { useSolveTaskQuestion } from '@/shared/hooks/useTask';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';
import { invisibleScrollBar } from '@/styles/mixins';

interface TaskContentProps {
  taskId: number;
  productId: number;
  courseId: number;
  courseContentId: number;
  queryKeyToReload: unknown[];
}

const TaskContentBlock = styled.section`
  overflow-y: auto;
  height: calc(100vh - 27rem);
  padding: 2rem 0 4rem;
  ${invisibleScrollBar}

  .title {
    margin-bottom: 0.4rem;
    font-weight: 700;
  }

  .description {
    margin-bottom: 2rem;
    ${legacyTypographyMixin('body2')}
    color: var(--legacy-color-gray-700);
  }

  .task-form {
    margin-top: 4rem;
    padding: 2rem 0.1rem 0;
    border-top: 0.1rem solid var(--legacy-color-gray-100);

    .title {
      margin-bottom: 2rem;
      color: var(--color-blue-600);
    }

    &-input {
      margin-bottom: 2rem;
    }

    &-textarea {
      height: 12.8rem;
      margin-bottom: 2rem;
      resize: none;
    }

    &-file {
      ${legacyTypographyMixin('caption')}
      .file-label {
        margin-bottom: 1.2rem;
        font-weight: 700;
        color: var(--legacy-color-gray-400);
      }

      .file-input {
        label {
          display: inline-block;
          padding: 0.8rem 1.4rem;
          ${legacyTypographyMixin('caption')}
          border-radius: 0.4rem;
          background-color: var(--color-blue-600);
          font-weight: 700;
          color: var(--color-white);
          cursor: pointer;
        }
      }

      .file-list {
        margin-top: 1.2rem;

        &-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 3.6rem;

          span {
            display: flex;
            align-items: center;
          }

          svg {
            cursor: pointer;
          }
        }
      }

      .file-accept {
        margin-top: 1.2rem;
        padding-top: 1.2rem;
        border-top: 0.1rem solid var(--legacy-color-gray-100);
        color: var(--legacy-color-gray-300);
      }
    }
  }
`;

const TaskContent = ({ taskId, productId, courseId, courseContentId, queryKeyToReload }: TaskContentProps) => {
  const { modifyModalOption, closeModal } = useModal();
  const solveTask = useSolveTaskQuestion(taskId, productId, courseId, courseContentId);
  const { uploadFileIntoGcs } = useFileUpload();
  const { data: taskInfo } = useTaskData(taskId, productId, courseId, courseContentId);

  const [titleAnswer, setTitleAnswer] = useState('');
  const [descriptionAnswer, setDescriptionAnswer] = useState('');
  const [attachedFileList, setAttachedFileList] = useState<File[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<string[]>([]);
  const [linkList, setLinkList] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { openToast } = useToast();

  useEffect(() => {
    modifyModalOption({
      onConfirm: async () => {
        if (!descriptionAnswer) return alert('입력된 정보를 한번 더 확인해 주세요.');

        try {
          const solveQuestionPayload: SolveQuestionPayload = {
            type: taskInfo?.questions[0].type as string,
            submitAnswer: descriptionAnswer,
            attachedTitle: titleAnswer,
          };
          if (attachedFileList.length > 0) {
            solveQuestionPayload.attachedFiles = await uploadFileIntoGcs(attachedFileList);
          }
          await solveTask(taskInfo?.questions[0].id as number, solveQuestionPayload);
          // ?: 나중에 별도의 onConfirm로 처리하는 것이 좋을까?????
          queryClient.invalidateQueries(queryKeyToReload);
          openToast({ content: '과제 제출이 완료되었습니다.' });
        } catch (error) {
          alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
          closeModal();
        }
      },
    });
  }, [taskInfo, attachedFileList, titleAnswer, descriptionAnswer]);

  useEffect(() => {
    if (taskInfo) {
      setTitle(taskInfo.exam.name);
      setDescription(taskInfo.questions[0].extras.question);
      setImageList(taskInfo.questions[0].extras.attachedImages?.map((image) => image.url) || []);
      setFileList(taskInfo.questions[0].extras.attachedFiles?.map((file) => file.url) || []);
      setLinkList(taskInfo.questions[0].extras.url ? [taskInfo.questions[0].extras.url] : []);
    }
  }, [taskInfo]);

  return (
    <TaskContentBlock>
      <div className="title">{title}</div>
      {description && <div className="description">{description}</div>}
      {imageList.length > 0 && <ImageList imageList={imageList} />}
      {(linkList.length > 0 || fileList.length > 0) && <AttachedList fileList={fileList} linkList={linkList} />}
      <div className="task-form">
        <div className="title">과제 제출</div>
        <Input
          label="제목"
          className="task-form-input"
          value={titleAnswer}
          onChange={(event) => {
            setTitleAnswer(event.target.value);
          }}
        />
        <TextArea
          label="내용"
          className="task-form-textarea"
          value={descriptionAnswer}
          maxLength={1000}
          onChange={(event) => {
            setDescriptionAnswer(event.target.value);
          }}
        />
        <div className="task-form-file">
          <div className="file-label">파일 첨부</div>
          <FileUploader
            id="task-content"
            className="file-input"
            fileUploadText="파일 선택"
            input
            multiple
            files={attachedFileList}
            setFiles={setAttachedFileList}
          />
        </div>
      </div>
    </TaskContentBlock>
  );
};

export default TaskContent;
