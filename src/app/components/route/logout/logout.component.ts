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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationRequestService } from '../../../services/backend/request/authorization-request.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private loginService: AuthorizationRequestService,
  ) {
    loginService.logout().then(() => {
      router.navigate(['']).then((_) => {});
    });
  }
}
