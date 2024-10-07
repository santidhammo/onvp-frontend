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
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  errorsSource = new BehaviorSubject<string | null>(null);

  handle(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error !== null) {
        let errorObject = error.error;
        if (errorObject.kind === 'BAD_REQUEST') {
          this.errorsSource.next(
            $localize`Error requesting the server for data`,
          );
        } else if (error.message !== null && error.message !== '') {
          this.errorsSource.next(
            $localize`Server returned error: ${error.message}`,
          );
        } else if (errorObject.message !== null && errorObject.message !== '') {
          this.errorsSource.next(
            $localize`Server returned error: ${errorObject.message}`,
          );
        } else {
          this.errorsSource.next($localize`Unknown error occurred`);
        }
      } else {
        this.errorsSource.next(
          $localize`Server returned error: ${error.message}`,
        );
      }
    } else {
      this.errorsSource.next($localize`Server returned error: ${error}`);
    }
  }

  clearError(): void {
    this.errorsSource.next(null);
  }

  observeErrors(): Observable<string | null> {
    return this.errorsSource.asObservable();
  }
}
