import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import React, { FormEvent, useRef, useState } from 'react';

import { Option } from '@fastcampus/fastcomponents';

import { useQnaParam, useQnaNavigate, useQnaCourse } from './hooks';

import type { CourseContent } from '@/types/course.interface';
import type { Question, QuestionFilePayload } from '@/types/qna.interface';

import {
  QnaQuestionFormField,
  Select,
  Input,
  MarkdownEditor,
  ButtonGroup,
  FileUploader,
  Badge,
  Modal,
} from '@/components';
import { createQnaQuestion, editQnaQuestion } from '@/shared/api/qna';
import { useToggleList } from '@/shared/hooks';
import { useCourseQnaSummary } from '@/shared/hooks/course-detail';
import { media, legacyTypographyMixin } from '@/styles/legacy-mixins';

interface QnaQuestionFormProps {
  initialQuestion?: Question;
}

const QnaQuestionFormBlock = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin: 0 0 9rem;

  .select-caption {
    margin: 0.8rem 0 0;
    padding: 0 0.4rem;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-200);
  }

  .file-input {
    margin: 1.2rem 0 0;
  }

  .tags-wrapper {
    display: flex;
    gap: 0.8rem;
  }

  .tag-wrapper {
    cursor: pointer;
  }

  .caution-text {
    position: relative;
    padding: 0 0 0 2rem;

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-300);

    &::before {
      content: '';
      position: absolute;
      top: 0.7rem;
      left: 0.7rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 0.1rem;

      background-color: currentcolor;
    }
  }

  .button-wrapper {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
  }

  .button {
    width: 5.7rem;
    height: 4rem;

    ${legacyTypographyMixin('button')}
  }

  ${media('large')} {
    gap: 2.4rem;
  }
`;

const NOT_SELECTED_CONTENT_OPTION: Option<number> = {
  value: undefined as unknown as number,
  label: '선택 안함',
};

const QnaQuestionForm = ({ initialQuestion }: QnaQuestionFormProps) => {
  const { data: course } = useQnaCourse();

  const contentSelectList: Option[] =
    course?.extras.contents
      .map((coursePart) => {
        const getPartSelectList = (contentList: CourseContent[]) => {
          return contentList.map((content) => ({
            value: content.courseContentId,
            label: content.courseContentName,
          }));
        };

        if (coursePart.CONTENT?.length) {
          return getPartSelectList(coursePart.CONTENT);
        }

        if (coursePart.CHAPTER?.length) {
          return coursePart.CHAPTER.map((chapter) => getPartSelectList(chapter.CONTENT));
        }

        return [];
      })
      .flat(2) || [];
  const [courseContentId, setCourseContentId] = useState(initialQuestion?.qna.extras.courseContentId);

  const [title, setTitle] = useState(initialQuestion?.qna.name ?? '');
  const [content, setContent] = useState(initialQuestion?.qna.extras.content ?? '');

  const { courseId, productId } = useQnaParam();
  const { data: courseQnaSummary } = useCourseQnaSummary(courseId);
  const [keywords, toggleKeyword] = useToggleList(initialQuestion?.qna.extras.keywords || []);

  const { current: uploadedGcpFileMap } = useRef(
    new Map<File, string>(
      initialQuestion?.qna.extras.file?.map((attachedFile) => [new File([], attachedFile.name), attachedFile.url]) || []
    )
  );
  const [fileList, setFileList] = useState<File[]>([...uploadedGcpFileMap.keys()]);

  const navigate = useQnaNavigate();
  const { mutateAsync } = useMutation(() => {
    const payload = {
      name: title,
      content,
      courseId,
      productId,
      courseContentId,
      keywords,
      filePayloadList: fileList.map((file) => ({
        gcpUrl: uploadedGcpFileMap.get(file) || '',
        file,
      })) as QuestionFilePayload[],
    };

    if (initialQuestion) {
      return editQnaQuestion({ questionId: initialQuestion.qna.id, ...payload });
    }

    return createQnaQuestion(payload);
  });

  const disabledSubmit = title === '' || content === '';

  const [isOpenConfirmPopup, setOpenConfirmPopup] = useState(false);
  const cancelQuestionForm = () => {
    if (initialQuestion) {
      navigate(`/${initialQuestion.qna.id}`);
      setOpenConfirmPopup(false);
      return;
    }
    navigate('/');
    setOpenConfirmPopup(false);
  };

  const submitQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (disabledSubmit) return;

    const result = await mutateAsync();

    if (initialQuestion) {
      navigate(`/${initialQuestion.qna.id}`);
    } else {
      navigate(`/${result.id}`);
    }
  };

  return (
    <QnaQuestionFormBlock onSubmit={submitQuestion}>
      <QnaQuestionFormField label="차시선택">
        <Select
          options={[NOT_SELECTED_CONTENT_OPTION, ...contentSelectList]}
          initialSelectedValue={courseContentId}
          setValue={([courseContentId]) => setCourseContentId(courseContentId as number)}
          placeholder="선택 안함"
        />
        <div className="select-caption">‘선택 안함’ 선택 시 강의의 전 과정을 포함합니다.</div>
      </QnaQuestionFormField>
      <QnaQuestionFormField label="질문">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="질문을 입력해주세요"
          maxLength={255}
        />
      </QnaQuestionFormField>
      <QnaQuestionFormField label="내용">
        <MarkdownEditor value={content} onChange={(event) => setContent(event.target.value)} />
      </QnaQuestionFormField>
      <QnaQuestionFormField label="파일 첨부">
        <FileUploader
          id="question-files"
          files={fileList}
          className="file-input"
          fileUploadText="파일 선택"
          input
          multiple
          setFiles={setFileList}
        />
      </QnaQuestionFormField>
      <QnaQuestionFormField label="태그 선택" className="tag-field">
        <div className="tags-wrapper">
          {courseQnaSummary?.isExist &&
            courseQnaSummary?.tags?.map((qnaTag) => {
              const isActiveKeyword = keywords.includes(qnaTag);
              return (
                <span key={qnaTag} className="tag-wrapper" onClick={() => toggleKeyword(qnaTag)}>
                  <Badge theme={isActiveKeyword ? 'lightblue' : 'gray'} colorScale={isActiveKeyword ? undefined : 400}>
                    {qnaTag}
                  </Badge>
                </span>
              );
            })}
        </div>
      </QnaQuestionFormField>
      <ul className="caution">
        <li className="caution-text">답변이 달린 질문은 수정/삭제할 수 없습니다.</li>
        <li className="caution-text">
          강의 질의응답과 관계없는 글, 광고성, 비방, 도배, 욕설 등의 글은 예고 없이 삭제됩니다.
        </li>
      </ul>
      <ButtonGroup disabledSubmit={disabledSubmit} onClickCancel={() => setOpenConfirmPopup(true)} />
      {isOpenConfirmPopup && (
        <Modal
          title="질문등록 취소"
          content="질문 등록을 취소합니다."
          onConfirm={cancelQuestionForm}
          onCloseModal={() => setOpenConfirmPopup(false)}
        />
      )}
    </QnaQuestionFormBlock>
  );
};

export default QnaQuestionForm;
