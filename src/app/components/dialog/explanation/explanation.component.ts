import { Component, Input } from '@angular/core';

@Component({
  selector: 'dialog-explanation',
  standalone: true,
  imports: [],
  templateUrl: './explanation.component.html',
})
export class ExplanationComponent {
  @Input({ required: true }) explanation!: string;
}
