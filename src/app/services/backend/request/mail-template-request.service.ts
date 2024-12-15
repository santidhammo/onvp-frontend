import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResult } from '../../../model/search/search-result';
import { MusicalInstrumentResponse } from '../../../model/responses/musical-instrument-response';
import { firstValueFrom } from 'rxjs';
import { MailTemplateNameResponse } from '../../../model/responses/mail-template-name-response';
import { MailTemplateResponse } from '../../../model/responses/mail-template-response';

@Injectable({
  providedIn: 'root',
})
export class MailTemplateRequestService {
  constructor(private http: HttpClient) {}

  async list(): Promise<MailTemplateNameResponse[]> {
    return await firstValueFrom(
      this.http.get<MusicalInstrumentResponse[]>('/api/mail-templates/v1/list'),
    );
  }

  async find(id: number): Promise<MailTemplateResponse> {
    return await firstValueFrom(
      this.http.get<MailTemplateResponse>(
        `/api/mail-templates/v1/template/${id}`,
      ),
    );
  }
}
