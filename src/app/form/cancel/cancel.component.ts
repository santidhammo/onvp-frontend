import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-cancel',
  standalone: true,
  imports: [],
  templateUrl: './cancel.component.html',
})
export class CancelComponent {
  @Input() disabled: boolean | null = null;
  @Input() title: string | null = null;
  @Input() name: string = 'cancel';

  getTitle(): string {
    return this.title === null ? $localize`Cancel` : this.title;
  }
}
