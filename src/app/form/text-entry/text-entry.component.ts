import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
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
  imports: [NgIf, ReactiveFormsModule, FormsModule, NgForOf],
  templateUrl: './text-entry.component.html',
  styleUrl: './text-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ErrorsService],
})
export class TextEntryComponent implements ControlValueAccessor {
  @Input({ required: true }) name!: string;
  @Input() title!: string;
  @Input() disabled: boolean = false;

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
