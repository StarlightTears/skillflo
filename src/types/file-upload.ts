export interface GetUrlPayload {
  code: string;
  mimeType: string;
  type: string;
}

export interface GetUrlResponse {
  directPutUrl: string;
  url: string;
}

export interface UploadFilePayload {
  directPutUrl: string;
  file: File;
}
