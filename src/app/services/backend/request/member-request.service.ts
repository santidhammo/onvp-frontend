import { Injectable, output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MemberResponse } from '../../../model/responses/member-response';
import { SearchResult } from '../../../model/search/search-result';
import { ErrorHandlerService } from '../../handlers/error-handler.service';
import { MemberRegistrationCommand } from '../../../model/commands/member-registration-command';
import { MemberUpdateCommand } from '../../../model/commands/member-update-command';
import { MemberActivationCommand } from '../../../model/commands/member-activation-command';
import { ImageAssetIdResponse } from '../../../model/responses/image-asset-id-response';

@Injectable({
  providedIn: 'root',
})
export class MemberRequestService {
  constructor(
    private http: HttpClient,
    private requestErrorHandlerService: ErrorHandlerService,
  ) {}

  async search(
    query: string,
    pageOffset: number,
  ): Promise<SearchResult<MemberResponse>> {
    const baseParams = new HttpParams().set('q', query).set('p', pageOffset);
    return await firstValueFrom(
      this.http.get<SearchResult<MemberResponse>>('/api/members/search', {
        params: baseParams,
      }),
    );
  }

  async find(id: number): Promise<MemberResponse> {
    try {
      return await firstValueFrom(
        this.http.get<MemberResponse>(`/api/members/${id}`),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }

  async picture(id: number): Promise<ImageAssetIdResponse> {
    try {
      return await firstValueFrom(
        this.http.get<ImageAssetIdResponse>(`/api/members/${id}/picture`),
      );
    } catch (error) {
      this.requestErrorHandlerService.handle(error as HttpErrorResponse);
      throw error;
    }
  }

  async activate(command: MemberActivationCommand): Promise<void> {
    await firstValueFrom(
      this.http.post('/api/members/activation/activate', command),
    );
  }

  async activation_code(activationString: string): Promise<string> {
    const data = await firstValueFrom(
      this.http.get<string>(`/api/members/activation/code/${activationString}`),
    );

    return 'data:image/png;base64, ' + data;
  }
}
