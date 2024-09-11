import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../security/login.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './menu-bar.component.html',
})
export class MenuBarComponent {
  constructor(public loginService: LoginService) {}
}
