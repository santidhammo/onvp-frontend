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
import { MemberRegistrationDataModel } from './member-registration-data-model';

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

  async getMemberPictureAssetIdAsync(id: number): Promise<string | null> {
    try {
      return await firstValueFrom(
        this.http.get<string | null>(`/api/members/member_picture/${id}`),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }

  async savePictureAsset(file: File, id: number) {
    try {
      await firstValueFrom(
        this.http.post<null>(`/api/members/member_picture/${id}`, file),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }

  async registerMember(model: MemberRegistrationDataModel) {
    try {
      const data = await firstValueFrom(
        this.http.put('/api/members/member', model),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }
}
