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
import { NgControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  getAllErrors(title: string, ngControl: NgControl): Array<String> {
    let result: Array<String> = new Array<String>();
    if (ngControl.errors !== null) {
      const errorKeys = Object.keys(ngControl.errors);
      for (let errorKey of errorKeys) {
        const error = ngControl.errors[errorKey];
        let message;
        switch (errorKey) {
          case 'required':
            message = $localize`${title} is required`;
            break;

          case 'pattern':
            message = $localize`${title} has wrong pattern`;
            break;
          case 'email':
            message = $localize`${title} has wrong email format`;
            break;
          case 'minlength':
            message = $localize`${title} has wrong length! Required length: ${error.requiredLength}`;
            break;
          case 'maxlength':
            message = $localize`${title} has wrong length! Required length: ${error.requiredLength}`;
            break;
          case 'areEqual':
            message = $localize`${title} must be equal!`;
            break;

          default:
            message = $localize`Error: ${title}`;
        }
        result.push(message);
      }
    }
    return result;
  }
}
