/*
 *  ONVP Frontend - Frontend of the ONVP website
 *
 * Copyright (c) 2024.  Sjoerd van Leent
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorHandlerService } from '../../handlers/error-handler.service';
import { SearchResult } from '../../../model/search/search-result';
import { firstValueFrom } from 'rxjs';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { MemberResponse } from '../../../model/responses/member-response';

@Injectable({
  providedIn: 'root',
})
export class WorkgroupRequestService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) {}

  async search(
    query: string,
    pageOffset: number,
  ): Promise<SearchResult<WorkgroupResponse>> {
    const baseParams = new HttpParams().set('q', query).set('p', pageOffset);
    return await firstValueFrom(
      this.http.get<SearchResult<WorkgroupResponse>>('/api/workgroups/search', {
        params: baseParams,
      }),
    );
  }

  async find(id: number): Promise<WorkgroupResponse> {
    return await firstValueFrom(
      this.http.get<WorkgroupResponse>(`/api/workgroups/${id}`),
    );
  }
}
