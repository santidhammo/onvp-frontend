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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AuthorizationRequest } from '../../../model/requests/authorization-request';
import { AuthorizationResponse } from '../../../model/responses/authorization-response';
import { Role } from '../../../generic/primitive/role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationRequestService {
  private authorized$ = new BehaviorSubject<AuthorizationResponse | null>(null);

  constructor(private http: HttpClient) {}

  /// Returns an observable to determine if a user is logged in, of true, the observable will emit true, otherwise
  /// it will emit false.
  observeAuthorized(): Observable<AuthorizationResponse | null> {
    return this.authorized$.asObservable();
  }

  /// Returns an observable to determine if the authorized user (if any) is of the given role
  observeHasRole(role: Role): Observable<boolean> {
    return this.authorized$.pipe(
      map((response) => {
        if (response !== null) {
          return response.compositeRoles.includes(role);
        } else {
          return false;
        }
      }),
    );
  }

  async login(loginData: AuthorizationRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<AuthorizationResponse>(
        '/api/authorization/login',
        loginData,
      ),
    );
    this.authorized$.next(response);
  }

  async refresh(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<AuthorizationResponse>('/api/authorization/refresh'),
      );
      if (this.authorized$.getValue() !== response) {
        this.authorized$.next(response);
      }
    } catch (error: any) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Remove authorization as a precaution for the user, something went severely wrong
        this.authorized$.next(null);
      } else {
        throw error;
      }
    }
  }

  async logout() {
    await firstValueFrom(this.http.get('/api/authorization/logout'));
    this.authorized$.next(null);
  }
}
