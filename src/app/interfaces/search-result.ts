export interface SearchResult<T> {
  totalCount: number;
  pageOffset: number;
  pageCount: number;
  rows: T[];
}
