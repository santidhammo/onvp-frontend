import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-submit',
  standalone: true,
  imports: [],
  templateUrl: './submit.component.html',
})
export class SubmitComponent {
  @Input() disabled: boolean | null = null;
  @Input() title: string | null = null;

  getTitle(): string {
    return this.title === null ? $localize`Submit` : this.title;
  }
}
