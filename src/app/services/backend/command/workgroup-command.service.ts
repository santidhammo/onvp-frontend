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
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WorkgroupUpdateCommand } from '../../../model/commands/workgroup-update-command';
import { WorkgroupRegisterCommand } from '../../../model/commands/workgroup-register-command';
import { AssociateMemberToWorkgroupCommand } from '../../../model/commands/associate-member-to-workgroup-command';
import { DissociateMemberFromWorkgroupCommand } from '../../../model/commands/dissociate-member-from-workgroup-command';

@Injectable({
  providedIn: 'root',
})
export class WorkgroupCommandService {
  constructor(private http: HttpClient) {}

  async update(id: number, command: WorkgroupUpdateCommand): Promise<void> {
    await firstValueFrom(this.http.post(`/api/workgroups/v1/${id}`, command));
  }

  async register(model: WorkgroupRegisterCommand) {
    await firstValueFrom(this.http.post('/api/workgroups/v1/', model));
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`/api/workgroups/v1/${id}`));
  }

  async associate(command: AssociateMemberToWorkgroupCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(`/api/workgroups/v1/associate`, command),
    );
  }

  async dissociate(
    command: DissociateMemberFromWorkgroupCommand,
  ): Promise<void> {
    await firstValueFrom(
      this.http.post(`/api/workgroups/v1/dissociate`, command),
    );
  }
}
