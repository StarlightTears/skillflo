import styled from '@emotion/styled';
import React from 'react';

import { FileUploader as FCFileUploader, FileUploaderProps as FCFileUploaderProps } from '@fastcampus/fastcomponents';

import { File, CloseMedium } from '@/components';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface FileUploaderProps extends FCFileUploaderProps {
  files: File[];
  acceptFileExtList?: string[];
}

const defaultAcceptFileExtList = [
  '.jpg',
  '.jpeg',
  '.gif',
  '.png',
  '.pdf',
  '.hwp',
  '.txt',
  '.doc',
  '.docs',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.zip',
  '.alz',
  '.7z',
  '.rar',
  '.egg',
  '.mp3',
];

const FileUploaderBlock = styled.div`
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
        ${legacyTypographyMixin('body2')}
      }

      svg {
        cursor: pointer;
      }
    }
  }

  .file-accept {
    margin: 1.2rem 0 0;
    padding: 1.2rem 0 0;
    border-top: 0.1rem solid var(--legacy-color-gray-100);

    ${legacyTypographyMixin('caption')}
    color: var(--legacy-color-gray-300);
  }
`;

const FileUploader = ({
  files,
  setFiles,
  acceptFileExtList = defaultAcceptFileExtList,
  ...restProps
}: FileUploaderProps) => {
  const removeFile = (fileToRemove: File) => {
    const filteredFileList = files.filter((file) => file !== fileToRemove);
    const newFileList = new DataTransfer();
    filteredFileList.forEach((file) => newFileList.items.add(file));

    (document.getElementById(restProps.id) as HTMLInputElement).files = newFileList.files;
    setFiles(filteredFileList);
  };

  const setFilesOnFastcomponents = (newFiles: File[]) => {
    if (restProps.multiple) {
      setFiles([...files, ...newFiles]);
    } else {
      setFiles(newFiles);
    }
  };

  return (
    <FileUploaderBlock>
      <FCFileUploader setFiles={setFilesOnFastcomponents} accept={acceptFileExtList.join(',')} {...restProps} />
      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, fileIndex) => (
            <div key={fileIndex} className="file-list-item">
              <span>
                <File />
                {file.name}
              </span>
              <CloseMedium onClick={() => removeFile(file)} />
            </div>
          ))}
        </div>
      )}
      <div className="file-accept">업로드 가능 확장자: {acceptFileExtList.join(', ')}</div>
    </FileUploaderBlock>
  );
};

export default FileUploader;
