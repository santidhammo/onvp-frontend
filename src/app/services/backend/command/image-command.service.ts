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
import { PublishImageCommand } from '../../../model/commands/publish-image-command';

@Injectable({
  providedIn: 'root',
})
export class ImageCommandService {
  constructor(private http: HttpClient) {}

  async upload(file: File, title: string): Promise<void> {
    await firstValueFrom(
      this.http.post<null>(
        `/api/images/v1/image/?title=${encodeURIComponent(title)}`,
        file,
      ),
    );
  }

  async publish(id: number, command: PublishImageCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(`/api/images/v1/image/${id}/publication`, command),
    );
  }

  async unpublish(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete(`/api/images/v1/image/${id}/publication`),
    );
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`/api/images/v1/image/${id}`));
  }
}
