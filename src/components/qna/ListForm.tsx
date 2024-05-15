import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Input, Button } from '@/components';

const QnaListFormBlock = styled.form`
  display: flex;
  gap: 1rem;
  height: 3.2rem;
  margin: 0 0 2rem;

  .input {
    flex: 1 1 auto;
  }

  .button {
    flex: 0 1 15rem;
  }
`;

const QnaListForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get('title') || '');

  const searchQnaByForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams(title ? { title } : {});
  };

  return (
    <QnaListFormBlock onSubmit={searchQnaByForm}>
      <Input
        placeholder="찾고자 하는 키워드를 입력해 주세요"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="input"
      />
      <Button theme="primary" className="button">
        검색
      </Button>
    </QnaListFormBlock>
  );
};

export default QnaListForm;
