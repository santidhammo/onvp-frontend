import { Component, Input } from '@angular/core';

@Component({
  selector: 'dialog-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
}
