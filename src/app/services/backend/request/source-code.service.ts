import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourceCodeDetails } from '../../../model/responses/source-code-details';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SourceCodeService {
  constructor(public http: HttpClient) {}

  async sourceCodeDetails(): Promise<SourceCodeDetails> {
    return await firstValueFrom(
      this.http.get<SourceCodeDetails>('/api/source_code_details/v1/'),
    );
  }
}
