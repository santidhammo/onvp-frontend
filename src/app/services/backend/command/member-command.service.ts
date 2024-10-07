/*
 *  ONVP Backend - Backend API provider for the ONVP website
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
import { MemberUpdateCommand } from '../../../model/commands/member-update-command';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MemberRegistrationCommand } from '../../../model/commands/member-registration-command';
import { MemberUpdateAddressCommand } from '../../../model/commands/member-update-address-command';

@Injectable({
  providedIn: 'root',
})
export class MemberCommandService {
  constructor(private http: HttpClient) {}

  async update(id: number, command: MemberUpdateCommand): Promise<void> {
    await firstValueFrom(this.http.post(`/api/members/${id}`, command));
  }

  async updateAddress(
    id: number,
    command: MemberUpdateAddressCommand,
  ): Promise<void> {
    await firstValueFrom(this.http.post(`/api/members/${id}/address`, command));
  }

  async register(model: MemberRegistrationCommand) {
    await firstValueFrom(this.http.post('/api/members/', model));
  }

  async savePictureAsset(file: File, id: number) {
    await firstValueFrom(
      this.http.post<null>(`/api/members/${id}/picture.png`, file),
    );
  }
}
