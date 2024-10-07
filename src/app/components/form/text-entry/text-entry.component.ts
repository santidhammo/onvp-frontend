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

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorsService } from '../errors.service';

@Component({
  selector: 'form-text-entry',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule, NgForOf, NgClass],
  templateUrl: './text-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ErrorsService],
})
export class TextEntryComponent implements ControlValueAccessor {
  @Input({ required: true }) name!: string;
  @Input() title!: string;
  @Input() disabled: boolean = false;
  @Input() labelLeft: boolean = false;

  protected displayInvalid: boolean = false;
  protected value: any = null;
  @Input() inputType: string = 'text';

  onChange = (_: any) => {};
  onTouched = () => {};

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
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
