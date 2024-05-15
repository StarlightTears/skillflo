import styled from '@emotion/styled';
import React, { useRef, KeyboardEvent } from 'react';

import { Plus, ClassroomPrev, ClassroomNext, CloseMedium } from '@/components';
import { CodeEditorListItem } from '@/shared/policy';
import { legacyTypographyMixin } from '@/styles/legacy-mixins';

interface CodeEditorToolbarProps {
  className: string;
  list: CodeEditorListItem[];
  setTabList: (list: CodeEditorListItem[]) => void;
  selectedTabIndex: number;
  setSelectedTabIndex: (index: number) => void;
}

const CodeEditorToolbarBlock = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border: 0.1rem solid var(--legacy-color-gray-700);
  border-radius: 0.6rem;
`;

const ToolbarAddItem = styled.div`
  width: 3.2rem;
  padding: 0.8rem;
  border-right: 0.1rem solid var(--legacy-color-gray-600);
  cursor: pointer;
`;

const ToolbarItemList = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ToolbarItem = styled.div<{ isSelectedTab: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 3rem;
  padding: 0.8rem 1rem;
  border-right: 0.1rem solid var(--legacy-color-gray-600);
  background-color: ${({ isSelectedTab }) => (isSelectedTab ? 'var(--legacy-color-gray-800)' : 'inherit')};
  ${legacyTypographyMixin('caption')}
  font-weight: 700;

  [contenteditable] {
    padding: 0.2rem;
    white-space: nowrap;
  }

  [contenteditable]:focus {
    outline: 0.1rem solid var(--color-blue-600);
  }

  input {
    width: auto;
  }

  svg {
    margin-left: 0.8rem;
    cursor: pointer;
  }
`;

const ToolbarController = styled.div`
  display: flex;
  align-items: center;
  width: 5.7rem;
  padding: 0.8rem;
  border-left: 0.1rem solid var(--legacy-color-gray-600);

  svg {
    cursor: pointer;
  }

  .vertical-line {
    height: 1.2rem;
    margin: 0 0.4rem;
    border: 0.05rem solid var(--legacy-color-gray-700);
    border-radius: 0.2rem;
  }
`;

const CodeEditorToolbar = ({
  className,
  list,
  setTabList,
  selectedTabIndex,
  setSelectedTabIndex,
}: CodeEditorToolbarProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <CodeEditorToolbarBlock className={className}>
      <ToolbarAddItem
        onClick={() => {
          const id = list[list.length - 1].id + 1;
          setTabList([...list, { id, name: `main(${id})`, value: '' }]);
        }}
      >
        <Plus />
      </ToolbarAddItem>
      <ToolbarItemList ref={listRef}>
        {list.map((item, index) => (
          <ToolbarItem
            key={item.id}
            isSelectedTab={item.id === list[selectedTabIndex].id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
              setSelectedTabIndex(index);
            }}
          >
            <span
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              id={`tab-id-${item.id}`}
              onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && e.preventDefault()}
            >
              {item.name}
            </span>
            {list.length > 1 && (
              <CloseMedium
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTabIndex(selectedTabIndex > 0 ? selectedTabIndex - 1 : 0);
                  setTabList(list.filter((listItem) => listItem !== item));
                }}
              />
            )}
          </ToolbarItem>
        ))}
      </ToolbarItemList>
      <ToolbarController>
        <ClassroomPrev
          onClick={() => {
            if (selectedTabIndex !== 0) {
              const index = selectedTabIndex - 1;
              listRef.current?.children[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
              });
              setSelectedTabIndex(selectedTabIndex - 1);
            }
          }}
        />
        <span className="vertical-line"></span>
        <ClassroomNext
          onClick={() => {
            if (selectedTabIndex !== list.length - 1) {
              const index = selectedTabIndex + 1;
              listRef.current?.children[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
              });
              setSelectedTabIndex(index);
            }
          }}
        />
      </ToolbarController>
    </CodeEditorToolbarBlock>
  );
};

export default CodeEditorToolbar;
