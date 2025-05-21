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

import { Component, Input, input, Optional, Self } from '@angular/core';
import { EventDate } from '../../../generic/primitive/event-date';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { ErrorsService } from '../errors.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'form-event-date-entry',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './event-date-entry.component.html',
  styles: ``,
})
export class EventDateEntryComponent implements ControlValueAccessor {
  @Input({ required: true }) name!: string;
  @Input() title!: string;

  protected displayInvalid: boolean = false;
  protected value: EventDate = EventDate.today();
  protected isSet: boolean = false;

  onChange = (_: EventDate) => {};
  onTouched = () => {};

  get nameDay(): string {
    return this.name + '.day';
  }

  get nameMonth(): string {
    return this.name + '.month';
  }

  get nameYear(): string {
    return this.name + '.year';
  }

  constructor(
    @Self() @Optional() protected ngControl: NgControl,
    protected errorsService: ErrorsService,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      if (obj == null) {
        this.isSet = false;
      } else {
        this.isSet = true;
        this.value = obj;
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  filteredOnChange(value: EventDate) {
    if (value.month > 12) {
      value.month = 12;
    }

    if (value.month < 1) {
      value.month = 1;
    }

    if (value.year < 2000) {
      value.year = 2000;
    }

    if (value.day < 1) {
      value.day = 1;
    } else {
      if (value.month in [1, 3, 5, 7, 8, 10, 12] && value.day > 31) {
        value.day = 31;
      } else if (value.month in [4, 6, 9, 11] && value.day > 30) {
        value.day = 30;
      } else {
        if (value.year % 4 == 0 && value.year % 400 != 0) {
          if (value.day > 29) {
            value.day = 29;
          }
        } else {
          if (value.day > 28) {
            value.day = 28;
          }
        }
      }
    }

    this.onChange(value);
  }
}
