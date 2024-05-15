import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

import { CodeEditor } from '@fastcampus/fastcomponents';
import type { SelectableLanguageType } from '@fastcampus/fastcomponents';

import type { CodeEditorLanguage, CodeEditorCompileLanguage } from '@/types/codeEditor.interface';
import type { LabelValue } from '@/types/common.interface';

import { Button, ClassroomOptionButton, ClassroomFileSave, ClassroomFileLoad, ClassroomRun } from '@/components';
import {
  createCodeExecutor,
  runCodeExecutor,
  finishCodeExecutor,
  runCompileLanguageCodeExecutor,
} from '@/shared/api/code-editor';
import { CodeEditor as CodeEditorConstant, CodeEditorListItem } from '@/shared/policy';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface CodeEditorContentProps {
  isSelected: boolean;
  tabId: number;
  content: string;
  setCodeEditorList: React.Dispatch<React.SetStateAction<CodeEditorListItem[]>>;
}

const CodeEditorContentBlock = styled.div`
  .language-list {
    width: 9.6rem;
    margin-bottom: 1.2rem;
  }

  .cm-editor {
    font-size: 1.5rem;
  }

  .output-title {
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
    ${legacyTypographyMixin('body2')};
    font-weight: 700;
    color: var(--legacy-color-gray-400);
  }
`;

const CodeEditorControllerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.8rem;
  padding: 0.8rem 0.8rem 0.8rem 0;

  .execute-btn {
    display: flex;
    align-items: center;
    width: 6.1rem;
    padding: 0.4rem 0.4rem 0.4rem 1.2rem;
    ${legacyTypographyMixin('caption')}
  }

  .file {
    display: flex;
    align-items: center;

    .btn {
      display: inherit;
      align-items: inherit;
      padding: 0.4rem 0.8rem;
      ${legacyTypographyMixin('caption')}
      font-weight: 700;
      cursor: pointer;

      svg {
        margin-right: 0.2rem;
      }
    }

    input {
      display: none;
    }
  }
`;

interface CodeEditorPayload {
  code: [
    {
      name: string;
      content: string;
    },
  ];
  language: CodeEditorLanguage;
}

const CodeEditorContent = ({ isSelected, tabId, content, setCodeEditorList }: CodeEditorContentProps) => {
  const [value, setValue] = useState(content);
  const [resultValue, setResultValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<LabelValue>(CodeEditorConstant.LANGUAGE_OPTIONS[0]);

  const executeCompileLanguageCode = async (payload: CodeEditorPayload) => {
    const {
      data: {
        data: { resultOutput },
      },
    } = await runCompileLanguageCodeExecutor(payload);
    return resultOutput;
  };

  const executeInterpreterLanguageCode = async (payload: CodeEditorPayload) => {
    const {
      data: {
        data: { processId },
      },
    } = await createCodeExecutor(payload);
    const runPayload: { language: CodeEditorLanguage; name: string; processId: string; version?: number } = {
      language: selectedLanguage.value as CodeEditorLanguage,
      name: CodeEditorConstant.EXECUTE_FILE_NAME[selectedLanguage.value as CodeEditorLanguage],
      processId,
    };
    if (selectedLanguage.value === 'python') {
      runPayload.version = CodeEditorConstant.PYTHON_MAJOR_VERSION;
    }
    const {
      data: {
        data: { resultOutput },
      },
    } = await runCodeExecutor(runPayload);
    await finishCodeExecutor({ language: selectedLanguage.value, processId });
    return resultOutput;
  };

  const executeCode = async () => {
    const payload: CodeEditorPayload = {
      code: [
        { name: CodeEditorConstant.EXECUTE_FILE_NAME[selectedLanguage.value as CodeEditorLanguage], content: value },
      ],
      language: selectedLanguage.value as CodeEditorLanguage,
    };
    try {
      const resultOutput = CodeEditorConstant.COMPILED_LANGUAGES.includes(selectedLanguage.value as CodeEditorLanguage)
        ? await executeCompileLanguageCode(payload)
        : await executeInterpreterLanguageCode(payload);
      setResultValue(resultOutput.join('\n'));
    } catch (e) {
      setResultValue('처리과정에 오류가 발생했습니다.');
    }
  };

  const saveAsTextFile = () => {
    const tabName = document.getElementById('tab-id-' + tabId)?.innerText;
    const el = document.createElement('a');
    const blob = new Blob([value], { type: 'text/plain' });
    el.href = window.URL.createObjectURL(blob);
    el.download = `${tabName ? tabName : 'main'}.txt`;
    el.click();
  };

  const readTextFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject('파일 읽기에 실패했습니다.');
      };
      fileReader.readAsText(file);
    });
  };

  const loadTextFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 0) {
        Promise.all([...e.target.files].map((file: File) => readTextFile(file)))
          .then((fileContents) => {
            setCodeEditorList((currentCodeEditorList) => {
              return [
                ...currentCodeEditorList,
                ...(fileContents as string[]).map((content: string, index) => {
                  const splitFileName = e.target?.files?.[index].name.split('.') || ['main'];
                  const fileNameExceptExtension =
                    splitFileName.length > 2 ? splitFileName?.slice(0, -1).join('.') : splitFileName[0];
                  return {
                    id: currentCodeEditorList[currentCodeEditorList.length - 1].id + index + 1,
                    name: fileNameExceptExtension,
                    value: content,
                  };
                }),
              ];
            });
          })
          .catch(() => {
            alert('파일 읽기에 실패했습니다.');
          });
      }
    }
  };

  useEffect(() => {
    if (!value) {
      setValue(CodeEditorConstant.COMPILED_LANGUAGES_DEFAULT_CODE[selectedLanguage.value as CodeEditorCompileLanguage]);
    }
  }, [selectedLanguage]);

  return (
    <CodeEditorContentBlock style={{ display: isSelected ? 'block' : 'none' }}>
      <ClassroomOptionButton
        direction="down"
        className="language-list"
        list={CodeEditorConstant.LANGUAGE_OPTIONS}
        selectedItem={selectedLanguage}
        setListItem={setSelectedLanguage}
      ></ClassroomOptionButton>
      <CodeEditor
        value={value}
        height="calc((100vh - 29.6rem) / 2)"
        width="100%"
        onChange={(value) => {
          setValue(value);
        }}
        language={selectedLanguage.value as SelectableLanguageType}
        theme="dark"
      />
      <CodeEditorControllerBlock>
        <Button className="execute-btn" theme="primary" size="small" onClick={executeCode}>
          실행
          <ClassroomRun />
        </Button>
        <div className="file">
          <div className="btn" onClick={() => document.getElementById('input-file')?.click()}>
            <ClassroomFileLoad />
            불러오기
            <input
              type="file"
              id="input-file"
              multiple
              accept=".java,.cpp,.swift,.py,.js,.go,.txt"
              onChange={loadTextFile}
            />
          </div>
          <div className="btn" onClick={saveAsTextFile}>
            <ClassroomFileSave />
            저장하기
          </div>
        </div>
      </CodeEditorControllerBlock>
      <div className="output-title">Output</div>
      <CodeEditor value={resultValue} height="calc((100vh - 29.6rem) / 2)" width="100%" theme="dark" readOnly />
    </CodeEditorContentBlock>
  );
};

export default CodeEditorContent;
