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
import { FirstOperatorRegisterCommand } from '../../../model/commands/first-operator-register-command';

@Injectable({
  providedIn: 'root',
})
export class SetupCommandService {
  constructor(private http: HttpClient) {}

  /// Set up the first operator
  async setupFirstOperator(
    command: FirstOperatorRegisterCommand,
  ): Promise<string> {
    const data = await firstValueFrom(
      this.http.post('/api/setup/v1/setup_first_operator', command),
    );
    return data.toString();
  }
}
