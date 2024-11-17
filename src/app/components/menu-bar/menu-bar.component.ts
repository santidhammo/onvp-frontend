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

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthorizationRequestService } from '../../services/backend/request/authorization-request.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Role } from '../../generic/primitive/role';
import { BehaviorSubject, Observable } from 'rxjs';
import { SourceCodeService } from '../../services/backend/request/source-code.service';
import { SourceCodeDetails } from '../../model/responses/source-code-details';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './menu-bar.component.html',
})
export class MenuBarComponent implements OnInit {
  frontendSourceCodeUrl$ = new BehaviorSubject<string>('');
  backendSourceCodeUrl$ = new BehaviorSubject<string>('');

  constructor(
    protected authorizationRequestService: AuthorizationRequestService,
    private sourceCodeService: SourceCodeService,
  ) {}

  ngOnInit(): void {
    this.sourceCodeService.sourceCodeDetails().then((sourceCode) => {
      this.frontendSourceCodeUrl$.next(sourceCode.frontendUrl);
      this.backendSourceCodeUrl$.next(sourceCode.backendUrl);
    });
  }

  get observeFrontendSourceCodeUrl(): Observable<string> {
    return this.frontendSourceCodeUrl$.asObservable();
  }
  get observeBackendSourceCodeUrl(): Observable<string> {
    return this.backendSourceCodeUrl$.asObservable();
  }

  protected readonly Role = Role;
}
