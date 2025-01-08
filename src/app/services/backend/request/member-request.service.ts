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
import { firstValueFrom } from 'rxjs';
import { MemberResponse } from '../../../model/responses/member-response';
import { SearchResult } from '../../../model/search/search-result';
import { MemberActivationCommand } from '../../../model/commands/member-activation-command';
import { ImageAssetIdResponse } from '../../../model/responses/image-asset-id-response';
import { MemberAddressResponse } from '../../../model/responses/member-address-response';
import { WorkgroupResponse } from '../../../model/responses/workgroup-response';
import { MemberPrivacyInfoSharingResponse } from '../../../model/responses/member-privacy-info-sharing-response';

@Injectable({
  providedIn: 'root',
})
export class MemberRequestService {
  constructor(private http: HttpClient) {}

  async search(
    query: string,
    pageOffset: number,
  ): Promise<SearchResult<MemberResponse>> {
    const baseParams = new HttpParams().set('q', query).set('p', pageOffset);
    return await firstValueFrom(
      this.http.get<SearchResult<MemberResponse>>('/api/members/v1/search', {
        params: baseParams,
      }),
    );
  }

  async find(id: number): Promise<MemberResponse> {
    return await firstValueFrom(
      this.http.get<MemberResponse>(`/api/members/v1/${id}`),
    );
  }

  async findAddress(id: number): Promise<MemberAddressResponse> {
    return await firstValueFrom(
      this.http.get<MemberAddressResponse>(`/api/members/v1/${id}/address`),
    );
  }

  async findPrivacyInfoSharing(
    id: number,
  ): Promise<MemberPrivacyInfoSharingResponse> {
    return await firstValueFrom(
      this.http.get<MemberPrivacyInfoSharingResponse>(
        `/api/members/v1/${id}/privacy`,
      ),
    );
  }

  async findWorkgroups(id: number): Promise<WorkgroupResponse[]> {
    return await firstValueFrom(
      this.http.get<WorkgroupResponse[]>(`/api/members/v1/${id}/workgroups`),
    );
  }

  async picture(id: number): Promise<ImageAssetIdResponse> {
    return await firstValueFrom(
      this.http.get<ImageAssetIdResponse>(`/api/members/v1/${id}/picture`),
    );
  }

  async activate(command: MemberActivationCommand): Promise<void> {
    await firstValueFrom(
      this.http.post('/api/members/v1/activation/activate', command),
    );
  }

  async activationCode(activationString: string): Promise<string> {
    const data = await firstValueFrom(
      this.http.get<string>(
        `/api/members/v1/activation/code/${activationString}`,
      ),
    );

    return 'data:image/png;base64, ' + data;
  }
}
