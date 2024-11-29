import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MusicalInstrumentResponse } from '../../../model/responses/musical-instrument-response';
import { SearchResult } from '../../../model/search/search-result';

@Injectable({
  providedIn: 'root',
})
export class MusicalInstrumentRequestService {
  constructor(private http: HttpClient) {}

  async search(
    query: string,
    pageOffset: number,
  ): Promise<SearchResult<MusicalInstrumentResponse>> {
    const baseParams = new HttpParams().set('q', query).set('p', pageOffset);
    return await firstValueFrom(
      this.http.get<SearchResult<MusicalInstrumentResponse>>(
        '/api/musical-instruments/v1/search',
        {
          params: baseParams,
        },
      ),
    );
  }

  async find(id: number): Promise<MusicalInstrumentResponse> {
    return await firstValueFrom(
      this.http.get<MusicalInstrumentResponse>(
        `/api/musical-instruments/v1/instrument/${id}`,
      ),
    );
  }
}
