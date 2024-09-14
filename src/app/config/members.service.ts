import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MemberWithDetail } from '../interfaces/member-with-detail';
import { SearchResult } from '../interfaces/search-result';
import { RequestErrorHandlerService } from '../generic/request-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(
    private http: HttpClient,
    private requestErrorHandlerService: RequestErrorHandlerService,
  ) {}

  async searchMemberDetails(
    query: string,
    pageOffset: number,
  ): Promise<SearchResult<MemberWithDetail>> {
    {
      try {
        const baseParams = new HttpParams()
          .set('q', query)
          .set('p', pageOffset);
        return await firstValueFrom(
          this.http.get<SearchResult<MemberWithDetail>>(
            '/api/members/search_member_details',
            {
              params: baseParams,
            },
          ),
        );
      } catch (error) {
        this.requestErrorHandlerService.handle(error as HttpErrorResponse);
        throw error;
      }
    }
  }
}
