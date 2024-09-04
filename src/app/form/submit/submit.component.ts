import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-submit',
  standalone: true,
  imports: [],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.css',
})
export class SubmitComponent {
  @Input() disabled: boolean | null = null;
}
