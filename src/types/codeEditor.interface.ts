export type CodeEditorLanguage = 'cpp' | 'go' | 'java' | 'javascript' | 'python' | 'swift';
export type CodeEditorCompileLanguage = 'cpp' | 'java' | 'go' | 'swift';

export interface CreateCodeExcutorResponse {
  data: {
    processId: string;
  };
}

export interface RunCodeExcutorResponse {
  data: {
    resultOutput: string[];
  };
}
