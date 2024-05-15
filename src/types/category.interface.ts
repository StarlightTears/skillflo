export interface Category {
  id: number;
  type: string;
  state: string;
  flags?: number;
  code?: string;
  name?: string;
  description?: string;
  extras?: CategoryExtras;
}

export interface CategoryExtras {
  siteId: number;
  siteName: string;
  depth: number;
  order: number;
  code: string;
  isLast: boolean; //최종 카테고리 여부
  parentId?: number; //상위 카테고리 아이디
}

export interface BookmarkCategory {
  id: number;
  depth: number;
  name: string;
  order: number;
}
