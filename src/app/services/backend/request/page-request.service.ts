import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResult } from '../../../model/search/search-result';
import { firstValueFrom } from 'rxjs';
import { PageResponse } from '../../../model/responses/page-response';
import { ExtendedPageResponse } from '../../../model/responses/extended-page-response';

@Injectable({
  providedIn: 'root',
})
export class PageRequestService {
  constructor(private http: HttpClient) {}

  async search(
    query: string,
    pageOffset: number,
  ): Promise<SearchResult<PageResponse>> {
    const baseParams = new HttpParams().set('q', query).set('p', pageOffset);
    return await firstValueFrom(
      this.http.get<SearchResult<PageResponse>>('/api/pages/v1/search', {
        params: baseParams,
      }),
    );
  }

  async mainMenu(): Promise<PageResponse[]> {
    return await firstValueFrom(
      this.http.get<PageResponse[]>(`/api/pages/v1/main-menu`),
    );
  }

  async find(id: number): Promise<ExtendedPageResponse> {
    return await firstValueFrom(
      this.http.get<ExtendedPageResponse>(`/api/pages/v1/page/${id}`),
    );
  }

  async content(id: number): Promise<string> {
    return await firstValueFrom(
      this.http.get<string>(`/api/pages/v1/page/${id}/content`, {
        headers: { responseType: 'text' },
      }),
    );
  }
}
