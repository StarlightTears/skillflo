export interface VideoInfoPayload {
  productId: number;
  courseId: number;
  courseContentId?: number;
  deviceType?: string;
}
export interface VideoInfo {
  state: string;
  jwt: string;
  position: number;
  courseContentId: number;
}
