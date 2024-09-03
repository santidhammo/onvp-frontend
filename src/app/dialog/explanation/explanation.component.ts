import { Component, Input } from '@angular/core';

@Component({
  selector: 'dialog-explanation',
  standalone: true,
  imports: [],
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.css',
})
export class ExplanationComponent {
  @Input({ required: true }) explanation!: string;
}
