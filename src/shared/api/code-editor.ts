import type { CreateCodeExcutorResponse, RunCodeExcutorResponse } from '@/types/codeEditor.interface';

import { CrudClientInstance } from '@/shared/api/index';

export const createCodeExecutor = (data: unknown) => {
  return CrudClientInstance.post<CreateCodeExcutorResponse>('/code-executor/create', {}, data);
};

export const runCodeExecutor = (data: unknown) => {
  return CrudClientInstance.post<RunCodeExcutorResponse>('/code-executor/run', {}, data);
};

export const runCompileLanguageCodeExecutor = (data: unknown) => {
  return CrudClientInstance.post<RunCodeExcutorResponse>('/code-executor/compile/run', {}, data);
};

export const finishCodeExecutor = (data: unknown) => {
  return CrudClientInstance.post('/code-executor/finish', {}, data);
};
