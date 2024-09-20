import { Injectable, output } from '@angular/core';
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

  async getMemberWithDetailByIdAsync(id: number): Promise<MemberWithDetail> {
    try {
      return await firstValueFrom(
        this.http.get<MemberWithDetail>(
          `/api/members/member_with_detail/${id}`,
        ),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }

  async saveMember(data: MemberWithDetail): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post<MemberWithDetail>(
          `/api/members/member_with_detail`,
          data,
        ),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }
}
