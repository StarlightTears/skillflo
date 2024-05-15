import styled from '@emotion/styled';
import React, { useState } from 'react';

import { CodeEditorToolbar, CodeEditorContent } from '@/components';
import { CodeEditorListItem } from '@/shared/policy';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

const CodeEditorLayoutBlock = styled.section`
  padding: 0 1.6rem;

  .toolbar {
    margin-bottom: 1.6rem;
  }
`;

const CodeEditorTitle = styled.div`
  margin-bottom: 1.2rem;
  ${legacyTypographyMixin('body1')}
  font-weight: 700;
  color: var(--legacy-color-gray-400);
`;

const initialCodeEditorList = [{ id: 0, name: 'main', value: '' }];

const CodeEditorLayout = () => {
  const [codeEditorList, setCodeEditorList] = useState<CodeEditorListItem[]>(initialCodeEditorList);
  const [selectedCodeEditorIndex, setSelectedCodeEditorIndex] = useState(0);

  return (
    <CodeEditorLayoutBlock>
      <CodeEditorTitle>Code Editor</CodeEditorTitle>
      <CodeEditorToolbar
        className="toolbar"
        list={codeEditorList}
        setTabList={(list) => setCodeEditorList(list)}
        selectedTabIndex={selectedCodeEditorIndex}
        setSelectedTabIndex={(index) => setSelectedCodeEditorIndex(index)}
      />
      {codeEditorList.map((item, index) => {
        return (
          <CodeEditorContent
            key={item.id}
            isSelected={item.id === codeEditorList[selectedCodeEditorIndex].id}
            tabId={codeEditorList[index].id}
            content={codeEditorList[index].value as string}
            setCodeEditorList={setCodeEditorList}
          />
        );
      })}
    </CodeEditorLayoutBlock>
  );
};

export default CodeEditorLayout;
