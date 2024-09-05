import { Component } from '@angular/core';

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css',
})
export class ActivationComponent {
  constructor() {
    console.log(window.localStorage.getItem('activation_string'));
  }
}
