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
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MembersComponent } from '../../config/members/members.component';
import { WorkgroupsComponent } from '../../config/workgroups/workgroups.component';
import { RolesComponent } from '../../config/roles/roles.component';
import { ConfigMode } from '../../../generic/primitive/config-mode';

@Component({
  selector: 'route-config',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    MembersComponent,
    WorkgroupsComponent,
    RolesComponent,
    NgForOf,
    NgClass,
  ],
  templateUrl: './config.component.html',
})
export class ConfigComponent {
  protected readonly ConfigMode = ConfigMode;

  private mode$ = new BehaviorSubject<ConfigMode>(ConfigMode.MEMBERS);

  observe(): Observable<ConfigMode> {
    return this.mode$.asObservable();
  }

  switchMode(configMode: ConfigMode) {
    this.mode$.next(configMode);
  }
}
