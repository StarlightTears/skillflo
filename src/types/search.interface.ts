export interface RecentKeyword {
  keyword: string;
  createdAt: string;
}

export interface SearchParams {
  [keyword: string]: string;
}
